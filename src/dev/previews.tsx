import SelectWithTitle from '@components/ui-elements/SelectWithTitle.tsx';
import Onboarding from '@features/overview/Onboarding';
import StudentCourseDetailPage from '@pages/StudentCourseDetailPage.tsx';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree />}>
            <ComponentPreview path={'/Onboarding'}>
                <Onboarding isReadonly={false} />
            </ComponentPreview>
            <ComponentPreview path={'/SelectWithTitle'}>
                <SelectWithTitle title={'Sample Title'} />
            </ComponentPreview>
            <ComponentPreview path={'/StudentCourseDetailPage'}>
                <StudentCourseDetailPage />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
