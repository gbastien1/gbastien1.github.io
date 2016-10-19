$(document).ready(function() {
	var currentSlide = 0;
	var previousSlide = 3;
	var slides = $('.slider .slides div');
	var bullets = $('.slider .bullets label');
	var slideCount = slides.length;
	var transitionTime = 600;
	var timeout = 3000;
	var intervalID;

	//start slider on loaded document
	autoSlide();

	//click handlers for slider
	$('#left-arrow').on('click', slideLeftHandler);
	$('#right-arrow').on('click', slideRightHandler);
	$('.slider .bullets label').on('click', function() {
		setSlideHandler($(this).index());
	});

	function autoSlide() {
		intervalID = setInterval(sliderRight, timeout);
	}

	//Change from previous to new slide. 
	//Keep track of only last slide instead of hiding all the slides every time.
	//Also change active bullet.
	function changeSlide() {
		var slide = slides.eq(currentSlide);
		var prevSlide = slides.eq(previousSlide);
		var bullet = bullets.eq(currentSlide);

		prevSlide.fadeOut(transitionTime);
		showSlide(slide);
		setActiveBullet(bullet);
	}
	
	//Set slide according to clicked bullet
	function setSlide(slideIndex) {
		previousSlide = currentSlide;
		currentSlide = slideIndex;
		changeSlide();
	}

	//change slide to right
	function sliderRight() {
		previousSlide = currentSlide;
		currentSlide = (currentSlide + 1) % slideCount;
		changeSlide();
	}

	//change slide to left
	function sliderLeft() {
		previousSlide = currentSlide;
		currentSlide = (currentSlide - 1) < 0 ? slideCount - 1 : currentSlide - 1;
		changeSlide();
	}

	//Handlers are used to reset the interval timer on clicking arrows and bullets
	function setSlideHandler(slideIndex) {
		clearInterval(intervalID);
		autoSlide();
		setSlide(slideIndex);
	}

	function slideRightHandler() {
		clearInterval(intervalID);
		autoSlide();
		sliderRight();
	}
	function slideLeftHandler() {
		clearInterval(intervalID);
		autoSlide();
		sliderLeft();
	}

	function showSlide(slide) {
		slide.fadeIn(transitionTime);
	}
	function setActiveBullet(bullet) {
		bullets.css('background-color', '#fff');
		bullet.css('background-color', '#f26122');
	}
});

