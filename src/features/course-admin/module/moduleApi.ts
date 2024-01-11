import axios from 'axios';
import { Curriculum, ModuleObject } from '@features/course-admin/interfaces/ModuleData.ts';

export async function getModules(): Promise<ModuleObject[]> {
    const { data: curriculumData } = await axios.get<Curriculum[]>(
        `${import.meta.env.VITE_BACKEND_API_URL}/curriculum`
    );

    // Flatten the array of curriculum with modules and create an array of module objects
    const moduleObjects: ModuleObject[] = curriculumData.flatMap((curriculum) =>
        curriculum.modules.flatMap((module) =>
            module.courses.flatMap((course) =>
                course.modules.map((courseModule) => ({
                    routingId: courseModule.id,
                    curriculumId: curriculum.id,
                    curriculumDescription: curriculum.description,
                    moduleId: courseModule.id,
                    moduleDescription: courseModule.description,
                    moduleIsActive: courseModule.isActive,
                    studyStage: module.studyStage.description,
                }))
            )
        )
    );
    console.debug(moduleObjects);
    return moduleObjects;
}

export async function deleteModuleById(id: number): Promise<void> {
    await axios.delete(`${import.meta.env.VITE_BACKEND_API_URL}/modules/${id}`);
}
