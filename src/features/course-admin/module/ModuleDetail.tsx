import { Route } from '../../../routes/module/$id.tsx';

function ModuleDetail() {
    const { id } = Route.useParams();
    return <div>Rendering detail for module {id}</div>;
}

export default ModuleDetail;
