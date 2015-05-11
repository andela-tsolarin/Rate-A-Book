var globalFuncs = new Object();
globalFuncs.requestObject = function (uri, type, data, mime, success, error) {
    $.ajax({
        url: uri,
        type: type,
        data: data,
        contentType: mime,
        success: success,
        error: error
    });
}

globalFuncs.Say = function (message) {
    alert(message);
}

globalFuncs.getCookie = function (name) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == name) {
            return unescape(y);
        }
    }
}

globalFuncs.authenticate = function (cookie_name, success, failure) {
    var cookie = this.getCookie(cookie_name);
    if (cookie != null)
        success(cookie);
    else
        failure();
}