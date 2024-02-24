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

/*export interface CurriculumResponse {
    id: number;
    version: number;
    description: string;
    number: string;
    isActive: boolean;
    studyStage: {
        id: number;
        description: string;
    };
    valuationCategory: {
        description: string;
        code: string;
    };
    courses: Course[];
}*/

export interface CurriculumResponseNew {
    id: number;
    version: number;
    description: string;
    number: string;
    isActive: boolean;
    focusOption: {
        id: string;
        description: string;
    };
    /*valuationCategory: {
        description: string;
        code: string;
    };*/
    modules: {
        id: number;
        version: number;
        description: string;
        number: string;
        versions: number[];
    }[];
}

export type CurriculumCreateRequest = Omit<CurriculumResponseNew, 'id'>;
