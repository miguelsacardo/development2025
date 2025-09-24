export type Id = string | number;

export type Column = {
    id: Id; // esse Id é um type customizado, que pode ser string ou null, muito util (mais flexibilidade)
    title: string;
    order?: number;
}

export type Task = {
    id: Id;
    columnId: Id;
    content: string;
    order?: number;
}