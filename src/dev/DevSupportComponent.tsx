import { DevSupport } from '@react-buddy/ide-toolbox';
import { PropsWithChildren } from 'react';

const environment = process.env.NODE_ENV;

export default function DevSupportComponent({ children }: PropsWithChildren) {
    if (environment === 'development') {
        import('./index.ts')
            .then((result) => {
                const { ComponentPreviews, useInitial } = result;
                return (
                    <DevSupport
                        ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
                        devmode={environment === 'development'}
                    >
                        {/*@ts-expect-error is fine*/}
                        {children}
                    </DevSupport>
                );
            })
            .catch(() => console.error('Error importing component previews'));
    }
    return null;
}
