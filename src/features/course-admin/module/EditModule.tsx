import { Route } from '@routes/module/$id.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { updateModule } from './moduleApi';
import { ModuleForm } from './ModuleForm';

export function EditModule() {
  const module = Route.useLoaderData();

  const queryClient = useQueryClient();

  const updateModuleMutation = useMutation({
    mutationFn: updateModule,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['modules', module.id],
      });
      void queryClient.invalidateQueries({ queryKey: ['modules'] });
      void message.success('Modul erfolgreich aktualisiert');
    },
  });

  return <ModuleForm moduleData={module} mutation={updateModuleMutation} />;
}
