import { Curriculum } from '@components/api/interfaces/Curriculum.ts';
import { DeletedAt, State } from '@components/api/interfaces/MetaInfo.ts';
import { Course } from '@features/course-admin/interfaces/ModuleData.ts';

export interface Module {
    id: number;
    version: number;
    created: string;
    updated: string;
    deleted: DeletedAt | null;
    description: string;
    number: string;
    state: State;
    studyStage: StudyStage;
    evaluationType: EvaluationType;
    curriculums: Curriculum[] | null;
    courses: Course[] | null;
}
interface EvaluationType {
    id: number;
    created: string;
    updated: string;
    deleted: DeletedAt | null;
    description: string;
    code: string;
}

interface StudyStage {
    id: number;
    created: string;
    updated: string;
    deleted: DeletedAt | null;
    description: string;
    moduleID: number;
}