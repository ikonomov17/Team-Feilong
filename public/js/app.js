import { startUpdatingTime } from 'time';
import { homeController } from 'homeController';
import { chartController } from 'chartController';
import { tableController } from 'tableController';
import { usersController } from 'usersController';
import { sideBarController } from './controllers/sidebar.js';
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
    'home/:sideBarContent': (params) => sideBarController.get(params),
    'chart/:sideBarContent': (params) => sideBarController.get(params),
    'table/:sideBarContent': (params) => sideBarController.get(params),
    'chart': chartController.get,
    'table': tableController.get,
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