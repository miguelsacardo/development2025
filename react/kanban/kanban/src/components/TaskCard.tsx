import { useState } from "react";
import { TrashIcon } from "../icons/TrashIcon";
import type { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckIcon } from "../icons/CheckIcon";
import { PencilIcon } from "../icons/PencilIcon";
import { PointerSensor, useSensor, useSensors } from "@dnd-kit/core";

interface Props {
    task: Task;
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
}

export function TaskCard({ task, deleteTask, updateTask }: Props) {

    const [mouseIsOver, setMouseIsOver] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [taskText, setTaskText] = useState(task.content);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable(
        {
            id: task.id,
            data: {
                type: "Task",
                task,
            },
            disabled: editMode
        }
    );


    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    const toggleEditMode = () => {
        setEditMode((prev) => !prev)
        setMouseIsOver(false);

        if(!mouseIsOver) updateTask(task.id, taskText)
    }

    if(isDragging){
        return(
            <div 
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="
            opacity-30
            bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-rose-500 cursor-grab relative"
            >
                
            </div>
        )
    }

    if (editMode) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                {...listeners}
                className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 'hover:ring-inset' hover:ring-rose-500 cursor-grab relative"
            >
                <textarea
                    className="h-[90%] w-full resize-none rounded bg-transparent text-white focus:outline-none"
                    value={taskText}
                    autoFocus
                    placeholder="Conteúdo da task"
                    onBlur={toggleEditMode}
                    onKeyDown={e => {
                        if (e.key === "Enter" && e.shiftKey) toggleEditMode();
                    }}
                    onChange={e => setTaskText(e.target.value)}
                    name=""
                    id="" />

                {/* colocar icon aqui */}
                <button 
                aria-label="Salvar task editada"
                onClick={() => toggleEditMode()} className="hover:cursor-pointer">
                    <CheckIcon />
                </button>
            </div>
        )
    }


    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-rose-500 cursor-grab relative task"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <p className="my-auto h-[90%] w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap">
                {task.content}
            </p>

            {mouseIsOver && (
                <div className="flex">
                    <button
                    aria-label="Editar card de task"
                    onClick={() => toggleEditMode()} 
                    className="stroke-white right-4 top-1/2-translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100 hover:cursor-pointer">
                        <PencilIcon/>
                    </button>
                    <button
                        aria-label="Excluir task"
                        onClick={() => deleteTask(task.id)}
                        className="stroke-white right-4 top-1/2-translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100 hover:cursor-pointer">
                        <TrashIcon />
                    </button>
                </div>
            )}

        </div>
    )
}