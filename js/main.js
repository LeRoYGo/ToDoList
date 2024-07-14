const parentList = document.querySelectorAll('.issues-card');
const carousel = document.getElementById('carousel');
const arrowNext = document.getElementById('arrow-next').addEventListener('click', () => CarouselShift('+'));
const arrowPrev = document.getElementById('arrow-prev').addEventListener('click', () => CarouselShift('-'));

const headerNav = document.getElementById('header__nav');
const burgerMenuButton = document.getElementById('burger-menu_button');

let shift = 0;
let count = 200;

parentList.forEach((el) => {
	el.addEventListener('click', accordion);
});

burgerMenuButton.addEventListener('click', () => {
	headerNav.classList.toggle('burger-menu_button--open');
	burgerMenuButton.classList.toggle('burger-menu_button--open');
});

function accordion() {
	this.classList.toggle('issues-card-open');
}

function CarouselShift(operator) {
	switch (operator) {
		case '-':
			if (shift >= 200) {
				shift = 400;
				return;
			}
			shift += count;
			carousel.style.transform = `translateX(${shift + count}px)`;
			break;

		default:
			if (shift <= -1200) {
				shift = -1000;
				return;
			}
			shift -= count;
			carousel.style.transform = `translateX(${shift - count}px)`;
			break;
	}
}
