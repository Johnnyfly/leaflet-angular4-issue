// This adds index.html if in debug mode so when you edit it, livereload is triggered by webpack.
if (process.env.NODE_ENV !== 'development') {
    var sNew = document.createElement("script");
    sNew.async = true;
    sNew.src = `http://${(location.host || 'localhost').split(':')[0]}:35729/livereload.js?snipver=1`;
    var s0 = document.getElementsByTagName('script')[0];
    s0.parentNode.insertBefore(sNew, s0);
    require('../index.html');
}
