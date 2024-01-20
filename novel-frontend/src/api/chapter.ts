import request from './request.ts';

export function addChapter(data : object) {
  return request({
    url: '/chapter/addChapter',
    method: 'POST',
    data
  });
}

export function getChapter(data : object) {
  return request({
    url: '/chapter/getChapter',
    method: 'POST',
    data
  });
}
