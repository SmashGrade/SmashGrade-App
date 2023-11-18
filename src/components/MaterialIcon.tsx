interface MaterialIconProps {
    icon?: string;
    size?: 'small' | 'medium' | 'large' | 'extra-large';
    mode?: 'dark';
}
export function MaterialIcon({ icon, size, mode }: Readonly<MaterialIconProps>) {
    return <span className={`material-symbols-rounded ${size} ${mode}`}>{icon}</span>;
}
