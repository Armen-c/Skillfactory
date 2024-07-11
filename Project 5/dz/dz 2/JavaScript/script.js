const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
  let width = document.documentElement.clientWidth;
  let height = document.documentElement.clientHeight;
  alert(`Ширина ${width} 
Высота ${height}`);
});