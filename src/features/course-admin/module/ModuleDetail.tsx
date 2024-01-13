import { moduleDetailRoute } from '@pages/routes/moduleRoutes.ts';
import { useParams } from '@tanstack/react-router';

function ModuleDetail() {
    const { id } = useParams({ from: moduleDetailRoute.id });
    return <div>Rendering detail for module {id}</div>;
}

export default ModuleDetail;
