import { Curriculum, CurriculumResponse } from '@features/teacher/interfaces/TeacherCourseData.ts';
import axios from 'axios';

export async function getCurriculums(): Promise<Curriculum[]> {
    const { data } = await axios.get<CurriculumResponse[]>('/teacherCurriculum');
    return data.map((curriculum) => ({
        id: curriculum.id,
        description: curriculum.description,
        startDate: curriculum.startDate,
        courses: curriculum.courses,
    }));
}
