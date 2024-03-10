import { Curriculum } from '@features/teacher/interfaces/TeacherCourseData.ts';
import axios from 'axios';

export async function getCurriculums(): Promise<Curriculum[]> {
    const { data } = await axios.get<Curriculum[]>('/teacherCurriculum');
    console.info('Data before mapping');
    console.info(data);
    return data.map((curriculum) => ({
        id: curriculum.id,
        description: curriculum.description,
        startDate: curriculum.startDate,
        courses: curriculum.courses,
    }));
}
