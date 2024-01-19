import request from './request.ts';

export function login(data : object) {
  return request({
    url: '/login',
    method: 'POST',
    data
  });
}