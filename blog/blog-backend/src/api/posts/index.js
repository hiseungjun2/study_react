import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
// const Router = require('koa-router');
// const postsCtrl = require('./posts.ctrl');

const posts = new Router();

// const printInfo = ctx => {
//     ctx.body = {
//         method : ctx.method,
//         path : ctx.path,
//         params : ctx.params,
//     };
// };

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);
// ObjectId 검증 (read, remove, update)
const post = new Router();
post.get('/', postsCtrl.read);
post.delete('/', postsCtrl.remove);
//posts.put('/:id', postsCtrl.replace);
post.patch('/', postsCtrl.update);

posts.use('/:id', postsCtrl.checkObjectId, post.routes());

export default posts;
// module.exports = posts;