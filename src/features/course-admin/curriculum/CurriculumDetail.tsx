import { Route } from '../../../routes/curriculum/$id.tsx';

function CurriculumDetail() {
    const { id } = Route.useParams();
    return <div>Rendering detail for curriculum {id}</div>;
}

export default CurriculumDetail;
