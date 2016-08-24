(function() {
	$(document).on("scroll", function (e) {
		if (horizontal = e.currentTarget.scrollLeft) {
			e.preventDefault();
			var tree = $(".tree");
			var currLeft = tree.css("left");
			$(".tree").css("left", currLeft + 300);
        }
	});
});
