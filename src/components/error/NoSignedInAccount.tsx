import { Result } from 'antd';

export function NoSignedInAccount() {
    return <Result status={'403'} title={'Not Signed In'} subTitle={'You must be signed in to access this page.'} />;
}
