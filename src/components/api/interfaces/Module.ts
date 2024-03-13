import { Curriculum } from '@components/api/interfaces/Curriculum.ts';
import { CourseObject } from '@components/api/interfaces/Course.ts';
import { DeletedAt, MetaBase, State } from '@components/api/interfaces/MetaInfo.ts';

export interface Module extends MetaBase {
    description: string;
    number: string;
    state: State;
    studyStage: StudyStage;
    evaluationType: EvaluationType;
    curriculums: Curriculum[] | null;
    courses: CourseObject[] | null;
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