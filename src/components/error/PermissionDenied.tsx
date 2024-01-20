import { useRouter } from '@tanstack/react-router';
import { Button, Result } from 'antd';

export function PermissionDenied() {
    const history = useRouter().history;
    return (
        <Result
            status={'403'}
            title={'Permission Denied'}
            subTitle={'Sorry, you are not authorized to access this page.'}
            extra={
                <Button type={'primary'} onClick={history.back}>
                    Go Back to previous Page
                </Button>
            }
        />
    );
}
