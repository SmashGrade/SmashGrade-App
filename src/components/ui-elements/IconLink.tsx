import { MaterialIcon } from '@components/ui-elements/MaterialIcon.tsx';
import { AnyRoute, Link, LinkProps, RegisteredRouter, RoutePaths } from '@tanstack/react-router';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { LocaleKey } from '../../i18n/ReactIntlProvider.tsx';
import styles from './IconLink.module.scss';

interface IconLinkProps<TRouteTree extends AnyRoute, TFrom, TTo, TMaskFrom, TMaskTo> {
    // @ts-expect-error error of the router cannot be fixed on our side
    linkProps: LinkProps<TRouteTree, TFrom, TTo, TMaskFrom, TMaskTo> & React.RefAttributes<HTMLAnchorElement>;
    icon?: string;
    messageProps: {
        messageId?: LocaleKey;
        defaultMessage?: string;
        description?: string;
    };
}

export function IconLink<
    TRouteTree extends AnyRoute = RegisteredRouter['routeTree'],
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    TFrom extends RoutePaths<TRouteTree> | string = string,
    TTo extends string = '',
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    TMaskFrom extends RoutePaths<TRouteTree> | string = TFrom,
    TMaskTo extends string = '',
>({ linkProps, icon, messageProps }: Readonly<IconLinkProps<TRouteTree, TFrom, TTo, TMaskFrom, TMaskTo>>) {
    return (
        <Link {...linkProps}>
            <div className={styles.menuItemIconAbove}>
                {icon ? <MaterialIcon icon={icon} size={'large'} /> : null}
                <FormattedMessage {...messageProps} />
            </div>
        </Link>
    );
}
