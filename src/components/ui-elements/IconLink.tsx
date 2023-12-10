import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { Link, MakeLinkOptions } from '@tanstack/react-router';
import { FormattedMessage } from 'react-intl';
import { LocaleKey } from '../../i18n/ReactIntlProvider.tsx';
import styles from './IconLink.module.scss';

interface IconLinkProps {
    to?: MakeLinkOptions['to'];
    icon?: string;
    messageProps: {
        messageId?: LocaleKey;
        defaultMessage?: string;
        description?: string;
    };
}

export function IconLink({ to, icon, messageProps }: Readonly<IconLinkProps>) {
    return (
        <Link to={to}>
            <div className={styles.menuItemIconAbove}>
                {icon ? <MaterialIcon icon={icon} size={'large'} /> : null}
                <FormattedMessage {...messageProps} />
            </div>
        </Link>
    );
}
