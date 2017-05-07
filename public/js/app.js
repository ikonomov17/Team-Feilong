import { startUpdatingTime } from 'time';
import { homeController } from 'homeController';
import { tableController } from 'tableController';
import { listController } from 'listController';
import { usersController } from 'usersController';
import { sideBarContent } from './controllers/homepage/right-side-bar.js';
import 'jquery';
import 'tablesorter';

var root = null;
var useHash = true;
var hash = '#!';

var router = new Navigo(root, useHash, hash);

startUpdatingTime();

// Set sign in/out buttons appropriately
// Checks if a user is logged in on inial page load
usersController.getCurrentUser();
// Listens for changes in logged in user
firebase.auth().onAuthStateChanged(user => usersController.toggleButtons(user))


router.on({
    '/': () => { router.navigate('home'); },
    '/#': () => { router.navigate('home'); },
    '/home': homeController.get,
    '/home/:sideBarMenu': (params) => sideBarContent.get(params),
    '/table': tableController.get,
    '/list': listController.get,
    '/user/:id/:action': (params) => usersController.get(params),
    '/login': usersController.login,
    '/logout': usersController.logout,
    '/register': usersController.register,
    '/auth': usersController.authenticate,
    '/create': usersController.create,
}).notFound(query => {
    // called when there is path specified but
    // there is no route matching
    toastr.info(`Router couldn't find the path: ${query}`);
}).resolve();