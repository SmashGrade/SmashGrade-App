import { Route } from '../../../routes/module/copy.$id.tsx';

function NewModule() {
    const { id } = Route.useParams();
    return (
        <div>
            <h2>New Module</h2>
            <div>Copy items from module: {id}</div>
        </div>
    );
}

export default NewModule;
