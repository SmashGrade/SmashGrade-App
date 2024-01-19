import { Result } from 'antd';

export function PermissionDenied() {
    return (
        <Result
            status={'403'}
            title={'Permission Denied'}
            subTitle={'Sorry, you are not authorized to access this page.'}
        />
    );
}
