import { notification } from 'antd';
import { isAxiosError } from 'axios';

export const onApiError = (error: Error) => {
  if (isAxiosError(error)) {
    notification.error({
      duration: 6,
      message: 'API Error',
      description: error.message,
    });
  }
};
