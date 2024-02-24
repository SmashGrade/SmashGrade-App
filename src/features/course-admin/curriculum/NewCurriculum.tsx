import { createCurriculum } from '@features/course-admin/curriculum/curriculumApi.ts';
import { CurriculumForm } from '@features/course-admin/curriculum/CurriculumForm.tsx';
import { CurriculumResponseNew } from '@features/course-admin/interfaces/CurriculumData.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { message } from 'antd';
import { Route as CurriculumIdRoute } from '@routes/curriculum/index.route.tsx';

function NewCurriculum() {
    const newCurriculum: CurriculumResponseNew = {
        id: 55,
        number: '',
        description: '',
        isActive: true,
        modules: [],
        version: 1,
        focusOption: {
            id: '',
            description: '',
        },
    };

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const createCurriculumMutation = useMutation({
        mutationFn: createCurriculum,
        onSuccess: () => {
            void queryClient.invalidateQueries({ queryKey: ['curriculums'] });
            void navigate({ to: CurriculumIdRoute.to });
            void message.success('Erfolgreich gespeichert');
        },
    });

    return <CurriculumForm newCurriculum={true} mutation={createCurriculumMutation} curriculumData={newCurriculum} />;
}

export default NewCurriculum;
