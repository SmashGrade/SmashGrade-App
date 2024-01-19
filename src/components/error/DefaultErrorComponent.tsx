import { NoSignedInAccount } from '@components/error/NoSignedInAccount.tsx';
import { PermissionDenied } from '@components/error/PermissionDenied.tsx';
import { Result } from 'antd';
import { PermissionDeniedError } from '../../exceptions/PermissionDeniedError.ts';

interface DefaultErrorComponentProps {
    error: Error;
}

export function DefaultErrorComponent({ error }: Readonly<DefaultErrorComponentProps>) {
    console.error('Error:', error);
    if (error instanceof PermissionDeniedError) {
        return <PermissionDenied />;
    }
    if (error instanceof NoSignedInAccount) {
        return <NoSignedInAccount />;
    }

    return <Result status={'500'} title={'Error'} subTitle={error.message} />;
}
