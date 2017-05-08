import { startUpdatingTime } from 'time';
import { homeController } from 'homeController';
import { chartController } from 'chartController';
import { tableController } from 'tableController';
// import { listController } from 'listController';
import { usersController } from 'usersController';
import { sideBarContent } from './controllers/homepage/sidebar-router.js';
import 'jquery';
import 'tablesorter';

var root = null;
var useHash = true;
var hash = '#!';

var router = new Navigo(root, useHash, hash);

startUpdatingTime();

router.on({
    '/': () => { router.navigate('home'); },
    '/#': () => { router.navigate('home'); },
    'home': homeController.get,
    'home/:sideBarContent': (params) => sideBarContent.get(params),
    'chart/:sideBarContent': (params) => sideBarContent.get(params),
    'table/:sideBarContent': (params) => sideBarContent.get(params),
    'chart': chartController.get,
    'table': tableController.get,
    // 'list': listController.get,
    'user': usersController.get,
    'user/:id/:action': (params) => usersController.get(params),
    'login': usersController.login,
    'logout': usersController.logout,
    'register': usersController.register,
    'auth': usersController.authenticate,
    'create': usersController.create,
}).notFound(query => {
    // called when there is path specified but
    // there is no route matching
    toastr.info(`Router couldn't find the path: ${query}`);
}).resolve();