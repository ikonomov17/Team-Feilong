import Navigo from 'navigo';
import { homeController } from 'homeController';
import { chartController } from 'chartController';
import { tableController } from 'tableController';
import { usersController } from 'usersController';
import { sideBarController } from './controllers/sidebar.js';

var root = null;
var useHash = true;
var hash = '#!';

var router = new Navigo(root, useHash, hash);

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
    'logout': usersController.logout,
    'signup': usersController.signup,
    'signin': usersController.signin,
}).notFound(query => {
    // called when there is path specified but
    // there is no route matching
    toastr.info(`Router couldn't find the path: ${query}`);
}).resolve();