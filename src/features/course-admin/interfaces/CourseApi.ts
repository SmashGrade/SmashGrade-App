import { CourseObject } from '@components/api/interfaces/Course.ts';

export interface CoursesResponse {
    data: CourseObject[];
}

export interface CourseResponse {
    data: CourseObject;
}
