const iconOne = document.querySelector('.icon-one')
const iconTwo = document.querySelector('.icon-two');
const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  iconOne.classList.toggle('icon-one-magic');
  iconTwo.classList.toggle('icon-two-magic');
});