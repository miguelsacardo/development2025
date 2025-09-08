import { useMemo, useState } from "react";
import { PlusIcon } from "../icons/PlusIcon";
import type { Column, Id, Task } from "../types";
import { ColumnContainer } from "./ColumnContainer";
import { DndContext, DragOverlay, PointerSensor, useSensor, useSensors, type DragEndEvent, type DragStartEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";


export function KanbanBoard() {

    const [columns, setColumns] = useState<Column[]>([]);
    const columnsId = useMemo(() => columns.map((col) => col.id),[columns]);

    const [tasks, setTasks] = useState<Task[]>([]);
    
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);

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

    const deleteColumn = (id: Id) =>{
        const filteredColumns = columns.filter(col => col.id !== id);
        setColumns(filteredColumns);
    }

    const updateColumn = (id: Id, title: string) => {
        const newColumns = columns.map(col => {
            if(col.id !== id) return col;
            return {...col, title}
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

    const generateId = () => {
        return Math.floor(Math.random() * 10001);
    }

    const onDragStart = (event: DragStartEvent) => {
        console.log("DRAGSTART", event)

        if(event.active.data.current?.type === "Column"){
            setActiveColumn(event.active.data.current.column);
        }
    }

    const onDragEnd = (evt: DragEndEvent) => {
        const { active, over } = evt;
        if(!over) return;

        const activeColumnId = active.id;
        const overColumnId = over.id;

        if(activeColumnId === overColumnId) return;

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

    return (
        <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
            <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
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
                        {activeColumn && <ColumnContainer column={activeColumn} deleteColumn={deleteColumn} updateColumn={updateColumn} createTask={createTask}/>}
                    </DragOverlay>, document.body
                )}
            </DndContext>
        </div>
    )
}