import { MaterialIcon } from '@components/MaterialIcon.tsx';
import { Link } from '@tanstack/react-router';
import { FormattedMessage } from 'react-intl';
import { LocaleKey } from '../i18n/ReactIntlProvider.tsx';
import styles from './IconLink.module.scss';

interface IconLinkProps {
    to?: string;
    icon?: string;
    messageId?: LocaleKey;
    defaultMessage?: string;
    description?: string;
}

export function IconLink({ to, icon, messageId, defaultMessage, description }: Readonly<IconLinkProps>) {
    return (
        // @ts-expect-error params required but works without
        <Link to={to}>
            <div className={styles.menuItemIconAbove}>
                {icon ? <MaterialIcon icon={icon} size={'large'} /> : null}
                <FormattedMessage id={messageId} defaultMessage={defaultMessage} description={description} />
            </div>
        </Link>
    );
}
