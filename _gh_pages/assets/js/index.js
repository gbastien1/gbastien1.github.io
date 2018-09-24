$(document).ready(function() {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    if ($('#particles-container').length > 0) {
        particlesJS.load('particles-container', '/assets/particles.json');
    }
});