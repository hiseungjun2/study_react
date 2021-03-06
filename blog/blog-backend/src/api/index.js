// 라우터를 여러 파일로 분리
import Router from 'koa-router'
// const Router = require('koa-router');
// posts 가져오기
import posts from './posts';
// const posts = require('./posts');
import auth from './auth';

const api = new Router();

// api.get('/test', ctx => {
//     ctx.body = 'test 성공';
// });
api.use('/posts', posts.routes());
api.use('/auth', auth.routes());

// 라우터를 내보낸다.
// module.exports = api;
export default api;
