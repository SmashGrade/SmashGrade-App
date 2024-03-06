import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { Button } from 'antd';
import { ButtonProps } from 'antd/es/button/button';

interface MaterialIconButtonProps extends ButtonProps {
    icon: string;
}
export function MaterialIconButton(props: MaterialIconButtonProps) {
    const { icon, ...antdButtonProps } = props;
    return <Button icon={<MaterialIcon icon={icon} isButton={true} />} title={icon} {...antdButtonProps} />;
}
