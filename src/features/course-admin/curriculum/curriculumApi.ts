import { CurriculumObject, CurriculumResponse } from '@features/course-admin/interfaces/CurriculumData.ts';
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
    await axios.delete('/curriculums/${id}');
}
