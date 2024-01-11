import { Dropdown, Button, MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

// Define a generic type for the data
interface DropdownCellRendererProps<T> {
    data: T;
    handleDelete: (id: number) => void;
    menuItems: (id: number, handleDelete: (id: number) => void) => MenuProps['items'];
}

// Make ActionsCellRenderer generic
const DropdownCellRenderer = <T extends { routingId: number }>({
    data,
    handleDelete,
    menuItems,
}: DropdownCellRendererProps<T>) => {
    return (
        <Dropdown menu={{ items: menuItems(data.routingId, handleDelete) }}>
            <Button type={'link'} icon={<MoreOutlined />} />
        </Dropdown>
    );
};

export default DropdownCellRenderer;
