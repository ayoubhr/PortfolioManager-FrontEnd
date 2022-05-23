export interface Publication {
    id: number;
    author: number;
    date: string;
    text: string;
}

export interface SavePublication {
    id?: number;
    author: string | null;
    text: string | undefined;
}
