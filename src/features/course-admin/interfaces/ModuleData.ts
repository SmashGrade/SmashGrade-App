export interface ModuleResponse {
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
}

export interface ModuleResponseNew {
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
    courses: {
        id: number;
        version: number;
        description: string;
        number: string;
    }[];
}

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
    modules: ModuleResponse[];
}

export interface Course {
    id: number;
    version: number;
    description: string;
    number: string;
    versions: number[];
    modules: ModuleResponse[];
    exams: Exam[];
    teachers: Teacher[];
}

export interface Exam {
    id: number;
    description: string;
    weight: number;
    type: string;
}

export interface Teacher {
    id: number;
    name: string;
}

export interface ModuleObject {
    routingId: number;
    curriculumId: number;
    curriculumDescription: string;
    moduleId: number;
    description: string;
    moduleIsActive: boolean;
    studyStage: string;
}

export type ModuleCreateRequest = Omit<ModuleResponseNew, 'id'>;
