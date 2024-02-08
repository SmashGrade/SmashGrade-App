import { ModuleForm } from '@features/course-admin/module/ModuleForm.tsx';
import { Route } from '@routes/module/copy.$id.tsx';

function NewModule() {
  const { id } = Route.useParams();
  return <ModuleForm />;
}

export default NewModule;
