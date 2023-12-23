import {
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
    const { data } = await axios.get<CourseResponse>(
        `${import.meta.env.VITE_BACKEND_API_URL}/getCourseByID/${courseId}`
    );
    return {
        description: data.description,
        version: data.version,
        number: data.number,
        versions: data.versions,
        modules: data.modules,
        exams: data.exams,
        teachers: data.teachers,
    };
}

export async function getCourseFormFilters(): Promise<FormFilters> {
    const { data } = await axios.get<CourseFilter>(`${import.meta.env.VITE_BACKEND_API_URL}/coursefilter`);

    return {
        modules: data.modules.map((module: ModuleResponse) => ({
            label: module.description,
            value: module.id,
        })),
        teachers: data.teachers.map((teacher: TeacherResponse) => ({
            label: teacher.name,
            value: teacher.id,
        })),
    };
}

export async function updateCourse(course: CourseUpdateRequest): Promise<void> {
    await axios.put(`${import.meta.env.VITE_BACKEND_API_URL}/course/${course.id}`, course);
}
