import { defHttp } from '/@/utils/http/axios';

enum Api {
  getFriend = '/friend/getByPage',
  getAllTag = '/friend/tag',
  getFriendTagByPage = '/friend/tag/getByPage',
  addFriend = '/friend/add',
  updateFriend = '/friend/update',
  updateFriendStatus = '/friend/status/',
  addFriendTag = '/friend/tag/add',
  updateFriendTag = '/friend/tag/update',

  getFriendCircleByPage = '/friend/circle/getByPage',
  addFriendCircleLink = '/friend/circle/add',
  updateFriendCircleStatus = '/friend/circle/status/update',
  updateFriendCircle = '/friend/circle/update',
  deleteFriendCircle = '/friend/circle/delete',

  getFriendSpiderByPage = '/friend/spider/getByPage',
  addFriendSpiderLink = '/friend/spider/add',
  updateFriendSpiderStatus = '/friend/spider/status/update',
  updateFriendSpider = '/friend/spider/update',
  deleteFriendSpider = '/friend/spider/delete',
}

export const getFriendListByPage = (params?) => defHttp.get({ url: Api.getFriend, params });

export const getAllTagList = (params) => defHttp.get({ url: Api.getAllTag, params });

export const addFriend = (params) => defHttp.post({ url: Api.addFriend, params });

export const updateFriend = (params) =>
  defHttp.request({ method: 'patch', url: Api.updateFriend, params });

export const updateFriendStatus = (params) =>
  defHttp.request({ method: 'patch', url: Api.updateFriendStatus + params });

export const getFriendTagByPage = (params?) => defHttp.get({ url: Api.getFriendTagByPage, params });

export const addFriendTag = (params) => defHttp.post({ url: Api.addFriendTag, params });
export const updateFriendTag = (params) => defHttp.post({ url: Api.updateFriendTag, params });

export const getFriendCircleByPage = (params) =>
  defHttp.get({ url: Api.getFriendCircleByPage, params });
export const addFriendCircleLink = (params) =>
  defHttp.post({ url: Api.addFriendCircleLink, params });
export const updateFriendCircleStatus = (params) =>
  defHttp.post({ url: Api.updateFriendCircleStatus, params });
export const updateFriendCircle = (params) => defHttp.post({ url: Api.updateFriendCircle, params });
export const deleteFriendCircle = (params) => defHttp.post({ url: Api.deleteFriendCircle, params });

export const getFriendSpiderByPage = (params) =>
  defHttp.get({ url: Api.getFriendSpiderByPage, params });
export const addFriendSpiderLink = (params) =>
  defHttp.post({ url: Api.addFriendSpiderLink, params });
export const updateFriendSpiderStatus = (params) =>
  defHttp.post({ url: Api.updateFriendSpiderStatus, params });
export const updateFriendSpider = (params) => defHttp.post({ url: Api.updateFriendSpider, params });
export const deleteFriendSpider = (params) => defHttp.post({ url: Api.deleteFriendSpider, params });
