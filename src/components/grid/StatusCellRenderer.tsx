// Renders the active/inactive Values
import React from 'react';
import { FormattedMessage } from 'react-intl';

import styles from './StatusCellRenderer.module.scss';
const StatusCellRenderer: React.FC<{ value: boolean }> = ({ value }) => {
    return (
        <div className={value ? styles.isActive : styles.isInactive}>
            {value ? (
                <FormattedMessage
                    id={'moduleList.activeModule'}
                    defaultMessage={'Aktiv'}
                    description={'Displays the module status'}
                />
            ) : (
                <FormattedMessage
                    id={'moduleList.inactiveModule'}
                    defaultMessage={'Inaktiv'}
                    description={'Displays the module status'}
                />
            )}
        </div>
    );
};

export default StatusCellRenderer;
