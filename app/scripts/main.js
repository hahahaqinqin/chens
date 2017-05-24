// Home swiper init
var swiper = new Swiper('.swiper-container.home', {
	pagination: '.swiper-pagination',
	slidesPerView: 1,
	paginationClickable: true,
	spaceBetween: 30,
	keyboardControl: true,
	loop: true, 
	nextButton: '.swiper-button-next',
	prevButton: '.swiper-button-prev',
});