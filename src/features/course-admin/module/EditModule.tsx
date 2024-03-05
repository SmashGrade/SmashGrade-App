import { Route } from '@routes/module/$id.tsx';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { getModule, updateModule } from './moduleApi';
import { ModuleForm } from './ModuleForm';

export function EditModule() {
    const { courses } = Route.useLoaderData();
    const params = Route.useParams();
    const module = useSuspenseQuery({ queryKey: ['module', params.id], queryFn: () => getModule(params.id) }).data;

    const queryClient = useQueryClient();

    const updateModuleMutation = useMutation({
        mutationFn: updateModule,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ['module', module.id],
            });
            void queryClient.invalidateQueries({ queryKey: ['modules'] });
            void message.success('Modul erfolgreich aktualisiert');
        },
    });

    return <ModuleForm moduleData={module} mutation={updateModuleMutation} allCourses={courses} />;
}
