import { Spinner } from '@components/ui-elements/Spinner.tsx';
import { ModuleResponseNew } from '@features/course-admin/interfaces/ModuleData.ts';
import { Route } from '@routes/module/$id.tsx';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { getModule, updateModule } from './moduleApi';
import { ModuleForm } from './ModuleForm';

export function EditModule() {
  const { id } = Route.useParams();
  const moduleId = id ?? 1;

  const queryClient = useQueryClient();

  const {
    isPending: isModuleLoading,
    error: isModuleError,
    data: moduleData,
  } = useQuery<ModuleResponseNew>({
    queryKey: ['module', moduleId],
    queryFn: () => getModule(moduleId),
  });

  const updateModuleMutation = useMutation({
    mutationFn: updateModule,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: ['modules', moduleData?.id],
      });
      void queryClient.invalidateQueries({ queryKey: ['modules'] });
      void message.success('Modul erfolgreich aktualisiert');
    },
  });

  // Display loading and error states
  if (isModuleError) return <div>Error when loading courses</div>;
  if (isModuleLoading) return <Spinner />;

  return <ModuleForm moduleData={moduleData} mutation={updateModuleMutation} />;
}
