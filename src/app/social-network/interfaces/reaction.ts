export interface Reaction {
    id?: number;
    user: number;
    publication: number;
    name: string;
}

export interface SaveReaction {
    user: string | null;
    publication: string | null;
    name: string;
}


