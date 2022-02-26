import { defHttp } from '/@/utils/http/axios';

enum Api {
  getIspeak = '/ispeak/getByPage',
  getAllTag = '/ispeak/tag',
  getIspeakTagByPage = '/ispeak/tag/getByPage',
  addIspeak = '/ispeak/add',
  updateIspeak = '/ispeak/update',
  deleteSpeak = '/ispeak/',
  getOneSpeak = '/ispeak/get/',
  updateIspeakStatus = '/ispeak/status/',
  addIspeakTag = '/ispeak/tag/add',
  updateIspeakTag = '/ispeak/tag/update',

  getIspeakCircleByPage = '/ispeak/circle/getByPage',
  addIspeakCircleLink = '/ispeak/circle/add',
  updateIspeakCircleStatus = '/ispeak/circle/status/update',
  updateIspeakCircle = '/ispeak/circle/update',
  deleteIspeakCircle = '/ispeak/circle/delete',
}

export const getIspeakListByPage = (params?) => defHttp.get({ url: Api.getIspeak, params });

export const getAllTagList = (params) => defHttp.get({ url: Api.getAllTag, params });

export const addIspeak = (params) => defHttp.post({ url: Api.addIspeak, params });

export const updateIspeak = (params) =>
  defHttp.request({ method: 'patch', url: Api.updateIspeak, params });

export const updateIspeakStatus = (params) =>
  defHttp.request({ method: 'patch', url: Api.updateIspeakStatus, params });

export const deleteIspeakById = (params) =>
  defHttp.request({ method: 'delete', url: Api.deleteSpeak + params });

export const getIspeakTagByPage = (params?) => defHttp.get({ url: Api.getIspeakTagByPage, params });

export const addIspeakTag = (params) => defHttp.post({ url: Api.addIspeakTag, params });
export const updateIspeakTag = (params) => defHttp.post({ url: Api.updateIspeakTag, params });

export const getIspeakById = (params) => defHttp.get({ url: Api.getOneSpeak + params });

export const getIspeakCircleByPage = (params) =>
  defHttp.get({ url: Api.getIspeakCircleByPage, params });
export const addIspeakCircleLink = (params) =>
  defHttp.post({ url: Api.addIspeakCircleLink, params });
export const updateIspeakCircleStatus = (params) =>
  defHttp.post({ url: Api.updateIspeakCircleStatus, params });
export const updateIspeakCircle = (params) => defHttp.post({ url: Api.updateIspeakCircle, params });
export const deleteIspeakCircle = (params) => defHttp.post({ url: Api.deleteIspeakCircle, params });
