interface MaterialIconProps {
    icon?: string;
    size?: 'small' | 'medium' | 'large' | 'extra-large';
    mode?: 'dark';
    isButton?: boolean;
}
export function MaterialIcon({ icon, size, mode, isButton }: Readonly<MaterialIconProps>) {
    return <span className={`material-symbols-rounded ${size} ${mode} ${isButton ? 'anticon' : ''}`}>{icon}</span>;
}
