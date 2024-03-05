import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData';
import { createModule } from '@features/course-admin/module/moduleApi';
import { ModuleForm } from '@features/course-admin/module/ModuleForm';
import { Route as ModuleIndexRoute } from '@routes/module/index.route';
import { Route as ModuleNewRoute } from '@routes/module/new';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { message } from 'antd';

function NewModule() {
    const courses = ModuleNewRoute.useLoaderData();

    const newModule: ModuleResponseNew = {
        id: 55,
        number: '',
        description: '',
        isActive: true,
        valuationCategory: {
            code: 'D',
            description: 'Modul bestanden, wenn der Durchschnitt der Kruse genügend ist (mehr als 60%)',
        },
        courses: [],
        version: 1,
        studyStage: {
            id: 1,
            description: 'Grundstudium',
        },
    };

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createModuleMutation = useMutation({
        mutationFn: createModule,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['modules'] });
            void navigate({ to: ModuleIndexRoute.to });
            void message.success('Erfolgreich gespeichert');
        },
    });

    return <ModuleForm newModule={true} mutation={createModuleMutation} moduleData={newModule} allCourses={courses} />;
}

export default NewModule;
