import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
// const Router = require('koa-router');
// const postsCtrl = require('./posts.ctrl');
import checkLoggedIn from '../../lib/checkLoggedIn'
import { check } from '../auth/auth.ctrl';

const posts = new Router();

// const printInfo = ctx => {
//     ctx.body = {
//         method : ctx.method,
//         path : ctx.path,
//         params : ctx.params,
//     };
// };

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);
// ObjectId 검증 (read, remove, update)
const post = new Router();
post.get('/', postsCtrl.read);
post.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
//posts.put('/:id', postsCtrl.replace);
post.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.use('/:id', postsCtrl.getPostById, post.routes());

export default posts;
// module.exports = posts;
