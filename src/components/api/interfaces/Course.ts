import { Exam, ExamType } from '@components/api/interfaces/Exam.ts';
import { MetaBase } from '@components/api/interfaces/MetaInfo.ts';
import { Module } from '@components/api/interfaces/Module.ts';
import { User } from '@components/api/interfaces/User.ts';

export interface SelectedCourse {
    userId: number;
    courseId: number;
    courseVersion: number;
    classStartYear: string;
    dispensed: boolean;
}

export interface CourseObject extends MetaBase {
    description: string;
    number: string;
    modules: Module[];
    teachedBy: User[];
    selectedCourses: SelectedCourse[] | null;
    exams: Exam[];
}

export interface CourseMetaInfo {
    examtypes: ExamType[];
    modules: Module[];
    teachers: User[];
}

export interface CourseUpdateRequest {
    id: number;
    version: number;
    versions: number[];
    description: string;
    number: string;
    modules: Module[];
    teachedBy: User[];
    exams: ExamCreateData[];
}

export type CourseCreationRequest = Omit<CourseUpdateRequest, 'id'>;

export interface ExamCreateData {
    id: number;
    description: string;
    weighting: number;
    examtype: ExamType;
}