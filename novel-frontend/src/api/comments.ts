import request from './request.ts';

export function addComment(data : object) {
  return request({
    url: '/comment/addComment',
    method: 'POST',
    data
  });
}

export function getComment(data : object) {
  return request({
    url: '/comment/getComment',
    method: 'POST',
    data
  });
}
