import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/getAccountList',
  addAccount = '/system/addAccount',
  updateAccount = '/system/updateAccount',
  deleteAccount = '/system/deleteAccount',
  IsAccountExist = '/system/accountExist',
  setUserStatus = '/system/setUserStatus',
  getAccountInfo = '/system/account',
  deletePermCode = '/system/deletePermCode',
  addPermCode = '/system/addPermCode',

  DeptList = '/system/getDeptList',
  addDept = '/system/addDept',
  updateDept = '/system/updateDept',
  setDeptDefault = '/system/setDeptDefault',
  deleteDept = '/system/deleteDept',

  MenuList = '/system/getMenuList',
  addMenu = '/system/addMenu',
  updateMenu = '/system/updateMenu',
  deleteMenu = '/system/deleteMenu',

  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/getAllRoleList',
  addRole = '/system/addRole',
  updateRole = '/system/updateRole',
  setRoleStatus = '/system/setRoleStatus',
  setRoleDefault = '/system/setRoleDefault',
  deleteRole = '/system/deleteRole',
}

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });
export const addDept = (params) => defHttp.post({ url: Api.addDept, params });
export const updateDept = (updateObjectId, params) =>
  defHttp.post<any>({ url: Api.updateDept, params: { updateId: updateObjectId, ...params } });
export const setDeptDefault = (id: number, status: string) =>
  defHttp.post({ url: Api.setDeptDefault, params: { id, status } });
export const deleteDept = (params) =>
  defHttp.post<any>({ url: Api.deleteDept, params: { _id: params } });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });
export const addMenu = (params) => defHttp.post({ url: Api.addMenu, params });
export const updateMenu = (updateObjectId, params) =>
  defHttp.post<any>({ url: Api.updateMenu, params: { updateId: updateObjectId, ...params } });
export const deleteMenu = (params) =>
  defHttp.post<any>({ url: Api.deleteMenu, params: { _id: params } });

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });
export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });
export const addRole = (params) => defHttp.post({ url: Api.addRole, params });
export const updateRole = (updateObjectId, params) =>
  defHttp.post<any>({ url: Api.updateRole, params: { updateId: updateObjectId, ...params } });
export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });
export const setRoleDefault = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleDefault, params: { id, status } });

export const deleteRole = (params) =>
  defHttp.post<any>({ url: Api.deleteRole, params: { _id: params } });
export const getAccountInfo = (params) =>
  defHttp.get<any>({ url: Api.getAccountInfo + '/' + params });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
export const getAccountList = (params: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });
export const addAccount = (params) => defHttp.post({ url: Api.addAccount, params });
export const updateAccount = (updateObjectId, params) =>
  defHttp.post<any>({ url: Api.updateAccount, params: { updateId: updateObjectId, ...params } });
export const deleteAccount = (params) =>
  defHttp.post<any>({ url: Api.deleteAccount, params: { _id: params } });
export const setUserStatus = (id: string, status: string) =>
  defHttp.post({ url: Api.setUserStatus, params: { id, status } });
export const deletePermCode = (id: string, code: string) =>
  defHttp.post({ url: Api.deletePermCode, params: { id, code } });
export const addPermCode = (id: string, code: string) =>
  defHttp.post({ url: Api.addPermCode, params: { id, code } });
