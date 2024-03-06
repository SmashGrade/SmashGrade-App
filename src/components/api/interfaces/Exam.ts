import { DeletedAt } from '@components/api/interfaces/MetaInfo.ts';

export interface Exam {
    id: number;
    created: string;
    updated: string;
    deleted: DeletedAt | null;
    courseId: number;
    courseVersion: number;
    description: string;
    examtype: ExamType;
    weighting: number;
}

interface ExamType {
    id: number;
    created: string;
    updated: string;
    deleted: DeletedAt | null;
    description: string;
}