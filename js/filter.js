import 'jquery';

function searchFilterList(){
    let input, inputValue, ul, li, label;

    input = $("#filter-input");
    inputValue = input.val().toUpperCase();
    ul = $("#currency-cont");
    li = $("#currency-cont li");

    li.each(function(i,obj){
        let currentLabel = $(this).find('.label-text').text();

        if(currentLabel.toUpperCase().indexOf(inputValue) == -1){
            $(this).hide();
        } else {
            $(this).show();
        }
    })
}

export function attachFilterToInput() {
    $('#filter-input').keyup(searchFilterList);
}