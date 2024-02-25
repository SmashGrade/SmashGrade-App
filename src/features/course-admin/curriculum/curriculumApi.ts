import {
    CurriculumCreateRequest,
    CurriculumObject,
    CurriculumResponse,
    CurriculumResponseNew,
} from '@features/course-admin/interfaces/CurriculumData.ts';
import axios from 'axios';

export async function getCurriculums(): Promise<CurriculumObject[]> {
    const { data } = await axios.get<CurriculumResponse[]>('/curriculum');
    return data.map((data) => ({
        routingId: data.id,
        id: data.id,
        focus: data.focus,
        field: data.field,
        curriculumType: data.field,
        isActive: data.isActive,
        startDate: data.startDate,
        endDate: data.endDate,
        description: data.description,
        fieldmanagers: data.fieldmanagers,
    }));
}

export async function deleteCurriculumById(id: number): Promise<void> {
    console.debug('Curriculum to delete: ' + id);
    await axios.delete('/curriculum/${id}');
}

export async function createCurriculum(curriculum: CurriculumCreateRequest): Promise<void> {
    console.debug('Curriculum to create:', curriculum);
    await axios.post('/curriculum', curriculum);
}

export async function getCurriculum(id: number): Promise<CurriculumResponseNew> {
    const { data: curriculum } = await axios.get<CurriculumResponseNew>(`/curriculum/${id}`);
    return curriculum;
}
