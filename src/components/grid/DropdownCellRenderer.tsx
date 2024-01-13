import { Dropdown, Button, MenuProps } from 'antd';
import { MoreOutlined } from '@ant-design/icons';

// Define a generic type for the data
interface DropdownCellRendererProps<T> {
    data: T;
    menuItems: (id: number) => MenuProps['items'];
}

// Make ActionsCellRenderer generic
const DropdownCellRenderer = <T extends { routingId: number }>({ data, menuItems }: DropdownCellRendererProps<T>) => {
    return (
        <Dropdown menu={{ items: menuItems(data.routingId) }}>
            <Button type={'link'} icon={<MoreOutlined />} />
        </Dropdown>
    );
};

export default DropdownCellRenderer;
