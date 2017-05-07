import * as data from '../../data/data.js';
import { toUpperHb } from '../../handlebars_helpers.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../../filter.js';
import { template } from '../../template.js';
import { Index } from '../../data/indexClass.js';
import $ from 'jquery';

//Export to individual module!


//Mockup input data. To be extracted from Yahoo
let index1 = new Index('Aple', 50, 'AAPL', 1000),
    index2 = new Index('Google', 60, 'GOOG', 20000),
    index3 = new Index('Yahoo', 70, 'YHOO', 3000),
    index4 = new Index('IBM', 20, 'IBM', 150);
let favoritesList = [index1, index2, index3, index4];

// console.log(favoritesList);
const sideBarMenu = {
    get(params) {

        template.get('sidebar-favorites').then(template => {
            favoritesList.forEach(index =>
                console.log(index.name)
            );
            $('#side-bar').html(template(favoritesList));

            $('.sidebar-nav').on('click', (event) => {
                const $selectedEl = $(event.target).parent();
                $('.active').removeClass('active')
                $selectedEl.addClass('active');

                // hash changing:
                console.log(location.hash);
                let hash = location.hash.split(':');
                location.hash = hash[0] + ':' + $selectedEl.attr('id');
            })
        })
    }
}
const sideBarContent = {
    get(params) {
        //some code goes here...
    }
}

export { sideBarMenu, sideBarContent };