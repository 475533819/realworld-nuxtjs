import { request } from '@/plugins/request'

// 获取公共文章列表
export const getArticles = (params) => {
  return request({
    method: 'GET',
    url: "/api/articles",
    params
  })
}
// 获取关注文章列表
export const getFeedArticles = (params) => {
  return request({
    method: 'GET',
    url: "/api/articles/feed",
    params
  })
}
// 添加点赞
export const addFavorite = (slug) => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 取消点赞
export const deleteFavorite = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`,
  })
}
// 获取文章详情
export const getArticle = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`,
  })
}
// 获取文章评论
export const getComments = (slug) => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`,
  })
}
// 创建新的文章
export const createArticles = (data) => {
  return request({
    method: 'POST',
    url: "/api/articles",
    data
  })
}
// 更新文章
export const updateArticles = (data) => {
  return request({
    method: 'PUT',
    url: `/api/articles/${data.slug}`,
    data: data.article
  })
}
// 删除文章
export const deleteArticles = (slug) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}`,
  })
}
// 关注作者
export const followUser = (username) => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}
// 取消关注作者
export const deleteFollowUser = (username) => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}
// 添加文章评论
export const addComments = (data) => {
  console.log(data)
  return request({
    method: 'POST',
    url: `/api/articles/${data.slug}/comments`,
    data: data.comment
  })
}
// 删除文章评论
export const deleteComments = (data) => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${data.slug}/comments/${data.id}`,
  })
}
