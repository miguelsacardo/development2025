import { useMemo, useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import type { Column, Id, Task } from "../types";
import { ColumnContainer } from "./ColumnContainer";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragOverEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import { TaskCard } from "./TaskCard";


export function KanbanBoard() {

    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    const [tasks, setTasks] = useState<Task[]>([]);

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 3 px
            }
        })
    )

    const createNewColumn = () => {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Coluna ${columns.length + 1}`,
        };

        setColumns([...columns, columnToAdd]);
    }

    const deleteColumn = (id: Id) => {
        const filteredColumns = columns.filter(col => col.id !== id);
        setColumns(filteredColumns);
    }

    const updateColumn = (id: Id, title: string) => {
        const newColumns = columns.map(col => {
            if (col.id !== id) return col;
            return { ...col, title }
        })

        setColumns(newColumns);
    }

    const createTask = (columnId: Id) => {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`
        }

        setTasks([...tasks, newTask])
    }

    const deleteTask = (id: Id) => {
        const newTasks = tasks.filter(task => task.id !== id);
        setTasks(newTasks)
    }

    const updateTask = (id: Id, content: string) => {
        const newTasks = tasks.map(task => {
            if (task.id !== id) return task;
            return { ...task, content };
        })

        setTasks(newTasks)
    }

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
                return arrayMove(columns, activeColumnIndex, overColumnIndex);
            })
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

                return arrayMove(tasks, activeIndex, overIndex)
            })
        }

        const isOverAColumn = over.data.current?.type === "Column";

        // dropando uma task em cima de uma coluna
        if (isActiveTask && isOverAColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(task => task.id === activeId)

                tasks[activeIndex].columnId = overId;

                // 
                return arrayMove(tasks, activeIndex, activeIndex)
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
                                    tasks={tasks.filter(task => task.columnId === column.id)}
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