import { Route } from '@routes/curriculum/$id.tsx';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { updateCurriculum } from './curriculumApi';
import { CurriculumForm } from './CurriculumForm';

export function CurriculumEdit() {
    const curriculum = Route.useLoaderData();

    const queryClient = useQueryClient();

    const updateCurriculumMutation = useMutation({
        mutationFn: updateCurriculum,
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ['curriculums', curriculum.id],
            });
            void queryClient.invalidateQueries({ queryKey: ['curriculums'] });
            void message.success('Studiengang erfolgreich aktualisiert');
        },
    });

    return <CurriculumForm curriculumData={curriculum} mutation={updateCurriculumMutation} />;
}
