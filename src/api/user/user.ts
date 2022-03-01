import { defHttp } from '/@/utils/http/axios';
import { GetAccountInfoModel } from './model/accountModel';

enum Api {
  ACCOUNT_INFO = '/user/getUserInfo',
  UPDATE_INFO = '/user/update',
  GET_USER_TOKEN = '/user/token',
  ADD_USER_TOKEN = '/user/token/add',
  UPDATE_USER_TOKEN = '/user/token/update',
  DELETE_USER_TOKEN = '/user/token/delete/',
  CHANGE_USER_PASSWORD = '/user/password',
}

// Get personal center-basic settings

export const userInfoApi = () => defHttp.get<GetAccountInfoModel>({ url: Api.ACCOUNT_INFO });
export const updateUserInfoApi = (data) =>
  defHttp.request({ url: Api.UPDATE_INFO, method: 'patch', data });
export const getUserTokenApi = () => defHttp.get({ url: Api.GET_USER_TOKEN });
export const addUserTokenApi = (data) => defHttp.post({ url: Api.ADD_USER_TOKEN, data });
export const updateUserTokenApi = (data) =>
  defHttp.request({ url: Api.UPDATE_USER_TOKEN, method: 'patch', data });
export const deleteUserTokenApi = (id) =>
  defHttp.request({ url: Api.DELETE_USER_TOKEN + id, method: 'delete' });
export const changeUserPasswordApi = (data) =>
  defHttp.request({ method: 'patch', url: Api.CHANGE_USER_PASSWORD, data });
