export function toUpperHb(){
  Handlebars.registerHelper('firstUpper', function(str) {
  return str[0].toUpperCase() + str.substr(1);
  });
}
