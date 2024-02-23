import { BaseResp, BaseRespWithDesc } from '@features/teacher/interfaces/Generic.tsx';

export interface User extends BaseResp {
    classStartYear: string;
    email: string;
    fields: Field[];
    name: string;
    roles: Role[];
    selectedCourses: SelectedCourse[];
    teachesCourses: TeachesCourse[];
}

export interface Field extends BaseRespWithDesc {
    users: string[];
}
export interface Role extends BaseRespWithDesc {
    users: string[];
}

export interface SelectedCourse {
    classStartYear: string;
    courseId: number;
    courseVersion: number;
    dispensed: boolean;
    userId: number;
}

export interface TeachesCourse extends BaseRespWithDesc {
    modules: Module[];
    number: string;
    selectedCourses: SelectedCourse[];
    teachedBy: string[];
    version: number;
}

export interface Module extends BaseRespWithDesc {
    courses: string[];
    curriculums: Curriculum[];
    evaluationType: EvaluationType;
    number: string;
    state: State;
    studyStage: StudyStage;
    version: number;
}

export interface Curriculum extends BaseRespWithDesc {
    curriculumType: CurriculumType;
    endValidity: string;
    focus: Focus;
    modules: string[];
    startvalidity: string;
    state: State;
}

export interface CurriculumType extends BaseRespWithDesc {
    durationYears: number;
}

export interface Focus extends BaseRespWithDesc {
    field: Field;
}

export interface State extends BaseRespWithDesc {
    moduleID: number;
}

export interface EvaluationType extends BaseRespWithDesc {
    code: string;
}

export interface StudyStage extends BaseRespWithDesc {
    moduleID: number;
}
