import { ExamType } from '@components/api/interfaces/Exam.ts';

export interface CourseResponse {
    id: number;
    description: string;
    version: number;
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
    isActive: boolean;
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
/*
export interface CourseUpdateRequest {
    id: number;
    version: number;
    versions: number[];
    description: string;
    number: string;
    modules: ModuleResponse[];
    teachers: TeacherResponse[];
    exams: ExamCreateData[];
}

export type CourseCreationRequest = Omit<CourseUpdateRequest, 'id'>;


export interface ExamCreateData {
    id: number;
    description: string;
    weighting: number;
    examtype: ExamType;
}

 */
export interface CourseFilterResponse {
    modules: ModuleResponse[];
    teachers: TeacherResponse[];
}
