import { TeacherCourseResponse, TeacherExam } from '@features/teacher/interfaces/TeacherCourseData.ts';
import axios from 'axios';

export async function getExams(courseId: number): Promise<TeacherExam[]> {
    const { data } = await axios.get<TeacherCourseResponse>(`/courseTeacher/${courseId}`);
    return data.exams;
}
