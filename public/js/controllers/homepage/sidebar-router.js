import * as data from '../../data/data.js';
import { template } from '../../template.js';
import { Index } from '../../data/indexClass.js';
import { SideBar } from '../../data/sidebarClass.js';
// import { listController } from 'listController';
import $ from 'jquery';

//Mockup data array:
const arr = [5, 5, 6, 6, 8, 4, 3, 1, 4, 4, 4, 5, 3, 5, 6, 4, 3, 1, 3,
    6, 7, 3, 5, 5, 6, 6, 8, 4, 3, 1, 4, 4, 4, 5, 3, 5, 6, 4, 3, 8, 3,
    6, 7, 3, 5, 5, 6, 6, 8, 4, 3, 1, 4, 4, 4, 5, 3, 5, 6, 4, 3, 12, 3,
    6, 7, 3, 5, 5, 6, 6, 8, 4, 3, 1, 4, 4, 4, 5, 3, 5, 6, 4, 3, 5, 3,
]

//Mockup input data. To be extracted from Yahoo
let index1 = new Index('Aple', 50, 'AAPL', data.scoreAnalytics(arr).totalPoints),
    index2 = new Index('Google', 60, 'GOOG', data.scoreAnalytics(arr).totalPoints),
    index3 = new Index('Yahoo', 70, 'YHOO', data.scoreAnalytics(arr).totalPoints),
    index4 = new Index('IBM', 20, 'IBM', data.scoreAnalytics(arr).totalPoints);
let favoritesList = [index1, index2, index3, index4];

const sideBar = new SideBar();

const sideBarContent = {
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
                    sideBar.callTopTen()
                    break;
                case ':bottom-ten':
                    sideBar.callBottomTen()
                    break;
                case ':news':
                    sideBar.callNews()
                    break;
                default:
                    sideBar.callFavorites(favoritesList);
            }
        }
    }
}


export { sideBarContent };