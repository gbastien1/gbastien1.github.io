$(document).ready(function () {
    var deviceContainers = $('.device-container');
    var pcContainer = $('.device-container.pc-device-ctn');
    var tabletContainer = $('.device-container.tablet-device-ctn');
    var phoneContainer = $('.device-container.phone-device-ctn');

    var init = function() {
        deviceContainers.addClass('show');
    };

    init();
});