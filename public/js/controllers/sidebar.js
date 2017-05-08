import $ from 'jquery';
import * as data from '../data/data.js';
import { template } from '../template.js';
import { Index } from '../data/indexClass.js';
import { SideBar } from '../data/sidebarClass.js';
// import { listController } from 'listController';

//Mockup data array:
function randomArray(length, max) {
    return Array.apply(null, Array(length)).map(function() {
        let num1 = Math.round(Math.random() * max);
        let num2 = Math.round(Math.random() * max);
        let low = 0;
        let high = 0;

        if (num1 > num2) {
            low = num2;
            high = num1;

        } else {
            low = num1;
            high = num2;
        }
        return {
            low,
            high
        }
    });
}
const arrList1 = randomArray(200, 100);
const arrList2 = randomArray(200, 100);
const arrList3 = randomArray(200, 100);
const arrList4 = randomArray(200, 100);

//Mockup input data. To be extracted from Yahoo and Firebase
let index1 = new Index('Aple', 50, 'AAPL', data.scoreAnalytics(arrList1).totalPoints),
    index2 = new Index('Google', 60, 'GOOG', data.scoreAnalytics(arrList2).totalPoints),
    index3 = new Index('Yahoo', 70, 'YHOO', data.scoreAnalytics(arrList3).totalPoints),
    index4 = new Index('IBM', 20, 'IBM', data.scoreAnalytics(arrList4).totalPoints);
let favoritesList = [index1, index2, index3, index4];

const sideBar = new SideBar();

const sideBarController = {
    get(params) {
        if (params) {
            switch (params.sideBarContent) {
                case ':favorites':
                    sideBar.callFavorites(favoritesList);
                    break;
                case ':search':
                    sideBar.callSearch();
                    break;
                case ':top-ten':
                    sideBar.callTopTen(favoritesList)
                    break;
                case ':bottom-ten':
                    sideBar.callBottomTen(favoritesList)
                    break;
                case ':news':
                    sideBar.callNews()
                    break;
                default:
                    sideBar.callFavorites(favoritesList);
            }
        }
    },

    getSideContent() {
        Promise.all([
                template.get('sidebar-favorites'),
                template.get('side-menu')
            ])
            .then(([sideBarT, sideMenuT]) => {
                $('#side-bar-top').html(sideBarT());
                $('#side-menu').html(sideMenuT());
            })
            .then(() => {
                sideBarController.get({ sideBarContent: ':favorites' });
            })
            .then(() => {
                $('.sidebar-nav').on('click', (event) => {
                    const $selectedEl = $(event.target).parent();
                    $('.active').removeClass('active')
                    $selectedEl.addClass('active');

                    // hash changing:
                    let hash = location.hash.split(':');
                    location.hash = hash[0].split('/')[0] + '/:' + $selectedEl.attr('id');
                });
            })
    }
}


export { sideBarController };