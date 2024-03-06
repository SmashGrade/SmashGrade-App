import { CourseMetaInfo } from '@components/api/interfaces/Course.ts';
import { CourseResponse, CoursesResponse } from '@features/course-admin/interfaces/CourseApi.ts';
import { CourseCreationRequest, CourseUpdateRequest } from '@features/course-admin/interfaces/CourseData.ts';
import axios from 'axios';
import { BACKEND_API_URL } from '../../../config/apiConfig.ts';

export async function getCourse(courseId: number, version: number) {
    const { data } = await axios.get<CourseResponse>(`/courses/${courseId}/${version}`, { baseURL: BACKEND_API_URL });
    return data.data;
}

export async function getCourseMetadata() {
    const { data } = await axios.get<CourseMetaInfo>('coursesMeta');
    return data;
}

export async function getCourses() {
    const { data } = await axios.get<CoursesResponse>('/courses', { baseURL: BACKEND_API_URL });
    return data.data;
}

export async function updateCourse(course: CourseUpdateRequest): Promise<void> {
    await axios.put(`/course/${course.id}`, course);
}

export async function createCourse(course: CourseCreationRequest): Promise<void> {
    await axios.post('/course', course);
}
