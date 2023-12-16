import SelectWithTitle from '@components/ui-elements/SelectWithTitle.tsx';
import Onboarding from '@features/overview/Onboarding';
import { ComponentPreview, Previews } from '@react-buddy/ide-toolbox';
import { PaletteTree } from './palette';

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree />}>
            <ComponentPreview path={'/Onboarding'}>
                <Onboarding />
            </ComponentPreview>
            <ComponentPreview path={'/SelectWithTitle'}>
                <SelectWithTitle title={'Sample Title'} />
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;
