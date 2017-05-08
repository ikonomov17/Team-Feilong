import * as data from '../../data/data.js';
import { template } from '../../template.js';
import { Index } from '../../data/indexClass.js';
import { SideBar } from './sidebarClass.js';
import $ from 'jquery';

//Export to individual module!


//Mockup input data. To be extracted from Yahoo
let index1 = new Index('Aple', 50, 'AAPL', 1000),
    index2 = new Index('Google', 60, 'GOOG', 20000),
    index3 = new Index('Yahoo', 70, 'YHOO', 3000),
    index4 = new Index('IBM', 20, 'IBM', 150);
let favoritesList = [index1, index2, index3, index4];

const sideBar = new SideBar();

const sideBarContent = {
    get(params) {
        if (params) {
            switch (params.sideBarContent) {
                case ':favorites':
                    sideBar.callFavorites()
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
                    sideBar.callFavorites();
            }
        } else {
            sideBar.callFavorites();
        }
    }
}


export { sideBarContent };