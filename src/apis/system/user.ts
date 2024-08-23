import { request } from '@/service/request';
import type * as System from './type';

const BASE_URL = '/system/user';

/** 查询用户列表 */
export function listUser(query: Api.Common.EPaginatingSearchParams<System.UserQuery>) {
  return request<Api.Common.PaginatingQueryRecord<System.UserResp[]>>({
    url: `${BASE_URL}`,
    method: 'get',
    params: query
  });
}

/** 查询用户详情 */
export function getUser(id: string) {
  return request<System.UserDetailResp>({
    url: `${BASE_URL}/${id}`,
    method: 'get'
  });
}

/** 新增用户 */
export function addUser(data: any) {
  return request({
    url: `${BASE_URL}`,
    method: 'post',
    data
  });
}

/** 修改用户 */
export function updateUser(data: any, id: string) {
  return request({
    url: `${BASE_URL}/${id}`,
    method: 'put',
    data
  });
}

/** 删除用户 */
export function deleteUser(ids: string | Array<string>) {
  return request({
    url: `${BASE_URL}/${ids}`,
    method: 'delete'
  });
}

/** 导出用户 */
export function exportUser(query: System.UserQuery) {
  return request<any, 'stream'>({
    url: `${BASE_URL}/export`,
    method: 'get',
    params: query
  });
}

/** 重置密码 */
export function resetUserPwd(data: any, id: string) {
  return request({
    url: `${BASE_URL}/${id}/password`,
    method: 'patch',
    data
  });
}

/** 下载用户导入模板 */
export function downloadImportUserTemplate() {
  return request<any, 'stream'>({
    url: `${BASE_URL}/downloadImportUserTemplate`,
    method: 'get'
  });
}

/** 解析用户导入数据 */
export function parseImportUser(data: FormData) {
  return request({
    url: `${BASE_URL}/parseImportUser`,
    method: 'post',
    data
  });
}

/** 导入用户 */
export function importUser(data: any) {
  return request({
    url: `${BASE_URL}/import`,
    method: 'post',
    data
  });
}
