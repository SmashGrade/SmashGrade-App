export interface Curriculum {
    id: number;
    description: string;
    startDate: number;
    courses: Course[];
}

export type CurriculumResponse = Curriculum;

export interface Course {
    id: number;
    description: string;
    exams: Exam[];
    students: Student[];
}

export interface Exam {
    id: number;
    description: string;
    weight: number;
    type: string;
    examEvaluations: ExamEvaluation[];
}

export interface ExamEvaluation {
    id: number;
    grade: number;
    student: Student;
}

export interface Student {
    id: number;
    name: string;
}
