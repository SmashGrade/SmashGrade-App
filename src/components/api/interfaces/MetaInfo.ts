export interface DeletedAt {
    time?: string;
    valid?: boolean;
}

export interface State {
    id: number;
    created: string;
    updated: string;
    deleted: DeletedAt | null;
    description: string;
    moduleID: number;
}

export interface MetaBase {
    id: number;
    version: number;
    created: string;
    updated: string;
    deleted: DeletedAt | null;
}