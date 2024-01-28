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
