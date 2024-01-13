import { Dropdown, Button, MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

// Define a generic type for the data
interface DropdownCellRendererProps<T> {
    data: T;
    menuItems: (id: number, moduleDescription: string) => MenuProps['items'];
}

// Make ActionsCellRenderer generic
const DropdownCellRenderer = <T extends { routingId: number; moduleDescription: string }>({
    data,
    menuItems,
}: DropdownCellRendererProps<T>) => {
    return (
        <Dropdown menu={{ items: menuItems(data.routingId, data.moduleDescription) }}>
            <Button type={'link'} icon={<MoreOutlined />} />
        </Dropdown>
    );
};

export default DropdownCellRenderer;
