import {
    CourseCreationRequest,
    CourseFilter,
    CourseResponse,
    CourseUpdateRequest,
    ModuleResponse,
    TeacherResponse,
} from '@features/course-admin/interfaces/CourseData.ts';
import { FormFilters } from '@features/course-admin/interfaces/FormFilters.ts';
import { SelectProps } from 'antd';
import axios from 'axios';

export async function getCourse(courseId: number): Promise<SelectProps['value']> {
    const { data } = await axios.get<CourseResponse>(`/course/${courseId}`);
    return {
        id: data.id,
        description: data.description,
        version: data.version,
        number: data.number,
        versions: data.versions,
        modules: data.modules,
        exams: data.exams,
        teachers: data.teachers,
    };
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

export async function updateCourse(course: CourseUpdateRequest): Promise<void> {
    await axios.put('/course/${course.id}', course);
}
export async function createCourse(course: CourseCreationRequest): Promise<void> {
    await axios.post('/course', course);
}
