import { useEffect, useMemo, useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import type { Column, Id, Task } from "../types";
import { ColumnContainer } from "./ColumnContainer";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { TaskCard } from "./TaskCard";
import axios from "axios";


export function KanbanBoard() {

    // hooks das colunas
    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    // hook das tasks
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    useEffect(() => {
        const getColumns = async () => {
            await axios.get(`http://127.0.0.1:8000/api/columns`)
            .then(res => setColumns(res.data))
        }

        if(!getColumns) return;

        const getTasks = async() =>{
            await axios.get(`http://127.0.0.1:8000/api/tasks`)
            .then(res => setTasks(res.data))
        }

        getColumns();
        getTasks()
    },[])

    // esse hook nativo da biblioteca DnD kit faz com que o drag da coluna
    // apenas seja ativado quando eu mover o mouse 3 pixels 
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 3 px
            }
        })
    )

    // handlers de colunas
    const createNewColumn = async () => {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Coluna ${columns.length + 1}`,
            order: columns.length + 1
        };

        // faz uma requisição no backend para adicionar uma nova coluna
        await axios.post(
            "http://127.0.0.1:8000/api/columns", columnToAdd
        )

        setColumns([...columns, columnToAdd]);
    }

    const deleteColumn = async (id: Id) => {
        if(window.confirm("Você deseja realmente excluir essa coluna?")){
            const filteredColumns = columns.filter(col => col.id !== id);

            // faz uma requisição no backend para excluir uma coluna
            await axios.delete(`http://127.0.0.1:8000/api/columns/${id}`);
            setColumns(filteredColumns);
        }
    }

    const updateColumn = async (id: Id, title: string) => {
        const newColumns = columns.map(col => {
            if (col.id !== id) return col;
            return { ...col, title }
        })

        // faz uma requisição no backend para atualizar o title de uma coluna
        await axios.patch(`http://127.0.0.1:8000/api/columns/${id}`, {
            title: title
        })

        setColumns(newColumns);
    }

    // esse handler é muito importante para as columns pois é isso que atualizará
    // a ordem no backend para quando elas serem trazidas dele, elas estarem em ordem correta
    const saveColumnOrder = async(columns: Column[]) => {

        // promisse All faz com que varios patchs sejam disparados. Pode ser menos
        // performatico do que se eu fizer um endpoint que receba um array de objetos
        await Promise.all(
            columns.map(col =>
                axios.patch(`http://127.0.0.1:8000/api/columns/${col.id}`,{
                    order: col.order
                })
            )
        )
    }

    // handlers de tasks
    const createTask = async (columnId: Id) => {

        // calcula a ordem da task com base no tanto de elementos que uma coluna tem
        const orderInColumn = tasks.filter(t => t.columnId === columnId).length;

        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`,
            order: orderInColumn
        }
        
        // faz uma requisição no backend para criar uma task
        await axios.post("http://127.0.0.1:8000/api/tasks", newTask)


        setTasks([...tasks, newTask])
    }

    const deleteTask = async (id: Id) => {
        if(window.confirm("Você deseja realmente excluir essa task?")){
            const newTasks = tasks.filter(task => task.id !== id);

            // faz uma requisição no backend para excluir uma task
            await axios.delete(`http://127.0.0.1:8000/api/tasks/${id}`);
            setTasks(newTasks)
        }
    }

    const updateTask = async (id: Id, content: string) => {
        const newTasks = tasks.map(task => {
            if (task.id !== id) return task;
            return { ...task, content };
        }) 

        // faz uma requisição no backend para atualizar o content de uma task
        await axios.patch(`http://127.0.0.1:8000/api/tasks/${id}`,{
            content: content
        })

        setTasks(newTasks)
    }

    const saveTaskOrder = async (tasks: Task[]) => {
        await Promise.all(
            tasks.map(task =>
                axios.patch(`http://127.0.0.1:8000/api/tasks/${task.id}`,{
                    columnId: task.columnId,
                    order: task.order
                })
            )
        )
    }

    // gerador de ids
    const generateId = () => {
        return Math.floor(Math.random() * 10001);
    }

    const onDragStart = (event: DragStartEvent) => {
        console.log("DRAGSTART", event)

        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    const onDragEnd = (evt: DragEndEvent) => {
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = evt;
        if (!over) return;

        // processa a ação apenas quando o active e o over são do tipo "Column"
        if (active.data.current?.type === "Column" && over.data.current?.type === "Column") {

            const activeColumnId = active.id;
            const overColumnId = over.id;

            if (activeColumnId === overColumnId) return;

            setColumns(columns => {
                const activeColumnIndex = columns.findIndex(col => col.id ===
                    activeColumnId
                )

                const overColumnIndex = columns.findIndex(col => col.id === overColumnId)

                // troca o index da coluna ativa com o index da coluna que estiver por cima
                // e retorna o novo array
                // também calcula a nova ordem da coluna
                const newState = arrayMove(columns, activeColumnIndex, overColumnIndex)
                .map((col, idx) => ({...col, order: idx}));

                // salva a nova ordem da coluna no banco de dados
                saveColumnOrder(newState)
                
                return newState;
            })

            console.log(columns)
        }
    }

    const onDragOver = (evt: DragOverEvent) => {
        const { active, over } = evt;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === "Task";
        const isOverTask = over.data.current?.type === "Task";

        if (!isActiveTask) return;

        // dropando uma task em cima de outra task
        if (isActiveTask && isOverTask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task.id === activeId)
                const overIndex = tasks.findIndex(task => task.id === overId);

                // se as tasks estão na mesma coluna, nada muda
                // mas caso eu jogue uma task para outra coluna, então
                // seu columnId será atualizado para o id da nova coluna
                tasks[activeIndex].columnId = tasks[overIndex].columnId;
                
                const movedTask = arrayMove(tasks, activeIndex, overIndex)
                .map((task, idx) => ({ ...task, order: idx }))

                saveTaskOrder(movedTask)

                return movedTask
            })
        }

        const isOverAColumn = over.data.current?.type === "Column";

        // dropando uma task em cima de uma coluna
        if (isActiveTask && isOverAColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task.id === activeId)

                tasks[activeIndex].columnId = overId;

                const movedTask =  arrayMove(tasks, activeIndex, activeIndex)
                .map((task, idx) => ({...task, order: idx}))

                saveTaskOrder(movedTask)
                
                return movedTask
            })
        }
    }

    return (
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}>
                <div className="m-auto flex gap-4">
                    <div className="flex gap-4">
                        <SortableContext items={columnsId}>
                            {columns.map(column =>
                                <ColumnContainer
                                    key={column.id}
                                    column={column}
                                    deleteColumn={deleteColumn}
                                    updateColumn={updateColumn}
                                    createTask={createTask}
                                    tasks={tasks.filter(task => task.columnId === column.id).sort((a, b) => a.order! - b.order!)}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                />)}
                        </SortableContext>
                    </div>
                    <button
                        onClick={() => createNewColumn()}
                        className="h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4 ring-rose-500 hover:ring-2 flex gap-2">
                        <PlusIcon />
                        Adicionar coluna
                    </button>
                </div>

                {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer
                                column={activeColumn}
                                deleteColumn={deleteColumn}
                                updateColumn={updateColumn}
                                createTask={createTask}
                                tasks={tasks.filter(task => task.columnId === activeColumn.id)}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                            />)}
                        {
                            activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} updateTask={updateTask} />
                        }
                    </DragOverlay>, document.body
                )}
            </DndContext>
        </div>
    )
}