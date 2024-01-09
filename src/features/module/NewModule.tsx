import { moduleDetailRoute } from '@pages/routes/moduleRoutes.ts';
import { useParams } from '@tanstack/react-router';

function NewModule() {
    const { id } = useParams({ from: moduleDetailRoute.id });
    return (
        <div>
            <h2>New Module</h2>
            <div>Copy items from module: {id}</div>
        </div>
    );
}

export default NewModule;
