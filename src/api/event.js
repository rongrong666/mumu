import request from '../utils/request';

// 发布赛事
export const createEvent = (data) => {
  return request.post('/events', data);
};

// 获取赛事列表
export const getEvents = () => {
  return request.get('/events');
};

// 删除赛事
export const deleteEvent = (id) => {
  return request.delete(`/events/${id}`);
};
