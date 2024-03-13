import { Exam, ExamResponse } from '@features/teacher/interfaces/TeacherCourseData.ts';
import axios from 'axios';

export async function getExam(examId: number): Promise<Exam> {
    const { data } = await axios.get<ExamResponse>(`/examTeacher/${examId}`);
    return data;
}
