import { MoreOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps } from 'antd';

// Define a generic type for the data
interface DropdownCellRendererProps<T> {
    data: T;
    menuItems: (id: number, description: string) => MenuProps['items'];
}

// Make ActionsCellRenderer generic
const DropdownCellRenderer = <T extends { routingId: number; description: string }>({
    data,
    menuItems,
}: DropdownCellRendererProps<T>) => {
    return (
        <Dropdown menu={{ items: menuItems(data.routingId, data.description) }}>
            <Button type={'link'} icon={<MoreOutlined />} />
        </Dropdown>
    );
};

export default DropdownCellRenderer;
