import { SelectedCourse } from '@components/api/interfaces/Course.ts';
import { Field } from '@components/api/interfaces/Curriculum.ts';
import { DeletedAt } from '@components/api/interfaces/MetaInfo.ts';
import { Course } from '@features/course-admin/interfaces/ModuleData.ts';

export interface User {
    id: number;
    created: string;
    updated: string;
    deleted: DeletedAt | null;
    classStartYear: string;
    name: string;
    email: string;
    fields: Field[] | null;
    roles: Role[] | null;
    teachesCourses: Course[] | null;
    selectedCourses: SelectedCourse[] | null;
}

export interface Role {
    claim: string;
    created: string;
    deleted: DeletedAt | null;
    description: string;
    id: number;
    updated: string;
    users: User | null;
}