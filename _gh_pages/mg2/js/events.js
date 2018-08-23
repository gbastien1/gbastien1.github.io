var animationTime = 500;

/* Bug fix where on mobile the menu is hidden and viewport goes back to desktop width*/
$(window).resize(function() {
	if ($(window).width() > 600) {
		$('nav>ul').show();
	}
});

/* Responsive hamburger menu - open or close menu on mobile */
$('.menu-mobile').on('click', function(e) {
	$('nav>ul').slideToggle(animationTime, function() {
		$('nav ul').css('overflow', 'visible'); //jQuery animation bugs if this is set before the slide animation ends
	});
	return false;
});

/** submenu toggle 
	When clicking on menu item of any level,
	detect if has a submenu or is a submenu or sub-submenu.
	Close menus accordingly. Allows closing submenus by clicking
	on other menu items.
**/
$('.menu li').on('click', function() {

	if (isSubmenu($(this))) {
		if(!hasSubmenu($(this)) && !isSubSubmenu($(this))) {
			$('#sub-submenu').slideUp(animationTime);
		}
	}
	else {
		if(!hasSubmenu($(this))) {
			$('.submenu').slideUp(animationTime);
		}
	}

	$(this).children('ul').slideToggle(animationTime, function() {
		$('nav ul').css('overflow', 'visible');
	});
	return false;
});

/* hide submenu when clicking anywhere on document */
$(document).on('click', function(e) {
	// if on smaller screens, remove the entire menu, 
	// else remove only submenus
	if ($(window).width() < 600) {
		$('.submenu').slideUp(animationTime);
		$('nav>ul').slideUp(animationTime);
	} else {
		$('.submenu').slideUp(animationTime);
	}
});

function hasSubmenu(element) {
	// Can click on either the 'a' element or the 'li' element, need to check this
	if(element.nodeName == "A") {
		return element.parent('li').children('ul').attr('class') == "submenu";
	}
	else {
		return element.children('ul').attr('class') == "submenu";
	}
}
function isSubmenu(element) {
	return element.parent('ul').attr('class') == "submenu";
}
function isSubSubmenu(element) {
	return element.parent('ul').attr('id') == "sub-submenu";
}