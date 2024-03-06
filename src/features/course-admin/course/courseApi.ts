import { CourseResponse, CoursesResponse } from '@features/course-admin/interfaces/CourseApi.ts';
import {
    CourseCreationRequest,
    CourseFilter,
    CourseUpdateRequest,
    ModuleResponse,
    TeacherResponse,
} from '@features/course-admin/interfaces/CourseData.ts';
import { FormFilters } from '@features/course-admin/interfaces/FormFilters.ts';
import axios from 'axios';

export async function getCourse(courseId: number, version: number) {
    const { data } = await axios.get<CourseResponse>(`/courses/${courseId}/${version}`);
    return data.data;
}

export async function getCourseFilter(): Promise<FormFilters> {
    const { data } = await axios.get<CourseFilter>('/courseFilter');

    return {
        ...data,
        moduleOptions: data.modules.map((module: ModuleResponse) => ({
            label: module.description,
            value: module.id,
        })),
        teacherOptions: data.teachers.map((teacher: TeacherResponse) => ({
            label: teacher.name,
            value: teacher.id,
        })),
    };
}

export async function getCourses() {
    const { data } = await axios.get<CoursesResponse>('/courses');
    return data.data;
}

export async function updateCourse(course: CourseUpdateRequest): Promise<void> {
    await axios.put(`/course/${course.id}`, course);
}

export async function createCourse(course: CourseCreationRequest): Promise<void> {
    await axios.post('/course', course);
}
