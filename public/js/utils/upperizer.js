const upperizer = {
    do() {
        Handlebars.registerHelper('firstUpper', function(str) {
            return str[0].toUpperCase() + str.substr(1);
        });
    }
}

export { upperizer };