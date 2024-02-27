export interface Curriculum {
    id: number;
    focus: string;
    field: string;
    curriculumType: string;
    isActive: boolean;
    startDate: string;
    endDate: string;
    description: string;
    fieldmanagers: { id: number; name: string }[];
}

export type CurriculumResponse = CurriculumObject;

export interface CurriculumObject extends Curriculum {
    routingId: number;
}

export interface CurriculumResponseNew {
    id: number;
    focus: {
        id: number;
        description: string;
    };
    field: {
        id: number;
        description: string;
    };
    curriculumType: {
        id: number;
        description: string;
    };
    isActive: boolean;
    startDate: string;
    endDate: string;
    fieldmanagers: {
        id: number;
        name: string;
    }[];
    /* modules: {
        id: number;
        version: number;
        description: string;
        number: string;
        versions: number[];
    }[]; */
}

export type CurriculumCreateRequest = Omit<CurriculumResponseNew, 'id'>;
