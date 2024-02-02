import { Route } from '../../../routes/curriculum/copy.$id.tsx';

function NewCurriculum() {
    const { id } = Route.useParams();
    return (
        <div>
            <h2>New Curriculum</h2>
            <div>Copy items from curriculum: {id}</div>
        </div>
    );
}

export default NewCurriculum;
