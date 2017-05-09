import $ from 'jquery';

export let TableFilter = (function() {
    function searchFilterList() {
        let input, inputValue, ul, li, label;

        input = $("#filter-input");
        inputValue = input.val().toUpperCase();
        ul = $("#currency-cont");
        li = $("#currency-cont li");

        li.each(function(i, obj) {
            let currentLabel = $(this).find('.label-text').text();

            if (currentLabel.toUpperCase().indexOf(inputValue) == -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    }


    function searchFilterTable() {
        let inputField, inputValue, tr;
        inputField = $('#table-input');
        inputValue = inputField.val().toUpperCase();
        tr = $('table tbody tr');

        tr.each(function(i, obj) {
            let currentName = $(this).first().html();

            if (currentName.toUpperCase().indexOf(inputValue) == -1) {
                $(this).hide();
            } else {
                $(this).show();
            }
        })
    }

    function attachListFilterToInput(input) {
        // '#filter-input'
        $(input).keyup(searchFilterList);
    }

    function attachTableFilterToInput(input) {
        // '#table-input'
        $(input).keyup(searchFilterTable);
    }


    let tableFilter = {

        attachListFilterToInput: attachListFilterToInput,

        attachTableFilterToInput: attachTableFilterToInput

    }

    return tableFilter;
})();








