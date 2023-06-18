function format(string, ...args) {
    let formatted = string;
    for (let i = 0; i < args.length; i++) {
      let regexp = new RegExp('\\{'+i+'\\}', 'gi');
      formatted = formatted.replace(regexp, arguments[i]);
    }
    return formatted;
};