import { defHttp } from '/@/utils/http/axios';

export const apiVersionApi = () => defHttp.get({ url: '/openapi/version' });
