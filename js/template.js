import 'jquery';

export function getTemplate (name){
    var cached = {};

    if(cached[name]){
        return cached[name];
    }

    return new Promise((resolve,reject) => {
        $.ajax({
            url: 'templates/' + name + '.handlebars',
            success: function (html) {
                cached[name] = html;
                resolve(html);
            },
            error: reject()
            
        });
    });
}