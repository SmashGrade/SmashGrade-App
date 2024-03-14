import { Exam, ExamResponse, ExamUpdateRequest } from '@features/teacher/interfaces/TeacherCourseData.ts';
import axios from 'axios';

export async function getExam(examId: number): Promise<Exam> {
    const { data } = await axios.get<ExamResponse>(`/examTeacher/${examId}`);
    return data;
}

export async function updateExam(exam: ExamUpdateRequest): Promise<void> {
    await axios.put(`/examTeacher/${exam.id}`, { exam });
}
