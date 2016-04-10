$(document).ready(function() {
	active_link = {};
	if (active_link) {
		$('.nav_item').removeClass("active");
    	$(this).addClass("active");
    }

    $('.nav_item').click(function() {
    	active_link = this;
      //$('.nav_item').removeClass("active");
      //$(this).addClass("active");
    });
});