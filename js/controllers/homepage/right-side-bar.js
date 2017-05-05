import * as data from '../../data.js';
import { toUpperHb } from '../../handlebars_helpers.js';
import { attachListFilterToInput, attachTableFilterToInput } from '../../filter.js';
import { template } from '../../template.js';
import $ from 'jquery';

// class Index {
//     constructor(name, price, symbol, volume) {
//         this._name = name;
//         this._price = price;
//         this._symbol = symbol;
//         this._volume = volume;
//     }

//     get name() {
//         return this._name;
//     }
//     get price() {
//         return this._price;
//     }
//     get symbol() {
//         return this._symbol;
//     }
//     get volume() {
//         return this._volume;
//     }
// }
const sideBarMenu = {
    get(params) {

        data.getData().then(function(data) {
            if (params) {
                console.log(params.sideBarMenu);
            }

            // Wrap the data in an object so that the handlebars template could work
            data = { obj: data };

            template.get('sidebar').then(function(html) {
                const rightSideBarTemplate = Handlebars.compile(html);


                $('#right-sidebar').html(rightSideBarTemplate(data));
                $('.tabs').on('click', (event) => {
                    $('.active').removeClass('active')
                    $(event.target).parent().addClass('active');
                })
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