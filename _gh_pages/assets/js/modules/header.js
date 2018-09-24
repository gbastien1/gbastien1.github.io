$(document).ready(function() {

    var headerSvg = document.getElementById('svg-header-wave');
    var svgSnap = Snap(headerSvg);
    var wavePath = Snap.select('#svg-path-wave');
    var fullPath = Snap.select('#svg-path-full');
    var wavePoints = wavePath.node.getAttribute('d');
    var fullPoints = fullPath.node.getAttribute('d');

    var toWaveHeader = function () {
        wavePath.animate({ d: wavePoints }, 750, mina.easein);
    };
    var toFullHeader = function () {
        wavePath.animate({ d: fullPoints }, 750, mina.easeout);
    };

    var toggleMenu = function () {
        

        if ($('body').hasClass('menu-open')) {
            toWaveHeader();
            $('body').removeClass('menu-open');
        }
        else {
            toFullHeader();
            $('body').addClass('menu-open');
        }
    };

    $('.header-menu-btn').on('click', toggleMenu);
});



