import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { createModule } from '@features/course-admin/module/moduleApi.ts';
import { ModuleForm } from '@features/course-admin/module/ModuleForm.tsx';
import { Route as ModuleIndexRoute } from '@routes/module/index.route.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { message } from 'antd';

function NewModule() {
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

    return <ModuleForm newModule={true} mutation={createModuleMutation} moduleData={newModule} />;
}

export default NewModule;
