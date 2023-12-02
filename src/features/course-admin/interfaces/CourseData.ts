export interface CourseResponse {
    description: string;
    activeVersion: number;
    number: string;
    versions: number[];
    modules: ModuleResponse[];
    exams: ExamResponse[];
    teachers: TeacherResponse[];
}

export interface ModuleResponse {
    id: number;
    version: string;
    description: string;
    number: string;
    isActivee: boolean;
}

export interface TeacherResponse {
    id: number;
    name: string;
}

export interface ExamResponse {
    id: number;
    description: string;
    weight: number;
    type: string;
}

export interface CourseFilter {
    modules: ModuleResponse[];
    teachers: TeacherResponse[];
}

export interface VersionResponse {
    version: number;
}

export interface FormDataPostRequest {
    description: string;
    number: string;
    moduleRef: number[]; // Array of module references
    teacherRef: number[]; // Array of teacher references
    exams: ExamCreateData[];
}

export interface ExamCreateData {
    id: number;
    description: string;
    weight: number;
    type: string;
}
