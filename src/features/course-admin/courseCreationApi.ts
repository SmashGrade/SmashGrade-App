import {
    CourseFilter,
    CourseResponse,
    ExamResponse,
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
        activeVersion: data.activeVersion,
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

export async function getExams(courseId: number): Promise<ExamResponse[]> {
    const course: CourseResponse = (await getCourse(courseId)) as CourseResponse;
    return course.exams;
}

// export async function getVersions(courseId: number): Promise<SelectProps['options']> {
//     const course: CourseResponse = (await getCourse(courseId)) as CourseResponse;
//     return course.versions.map((version: VersionResponse) => ({
//         label: version,
//         value: version,
//     }));
// }

// Todo Post Request
/* async function createCourse(courseData: CourseCreateData): Promise<void> {
    try {
        await axios.post(`${import.meta.env.VITE_BACKEND_API_URL}/courses`, courseData);
    } catch (error) {
        console.error('Error creating course:', error);
        throw error;
    }
} */
