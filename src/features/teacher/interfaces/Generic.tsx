export interface BaseResp {
    created: string;
    deleted: Deleted;
    id: number;
    updated: string;
}

export interface BaseRespWithDesc extends BaseResp {
    description: string;
}

export interface Deleted {
    time: string;
    valid: boolean;
}
