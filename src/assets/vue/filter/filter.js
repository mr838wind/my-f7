import Vue from 'vue';

Vue.filter('fTime', function (value) {
    if (!value) return '';
    const cval = value.toString();
    return cval.substr(0,4) + '/' + cval.substr(4,2) + '/' + cval.substr(6,2)
            + ' ' + cval.substr(8,2) + ':' + cval.substr(10,2) + ':' + cval.substr(12,2)
            ;
});

export default {};
