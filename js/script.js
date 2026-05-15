const tiles = document.querySelectorAll('.tile','sub-tile');

tiles.forEach((tile) => {
  tile.addEventListener('click',() =>{tile.classList.remove('is-bouncing');
  void tile.offsetWidth;
  tile.classList.add('is-bouncing');
});

tile.addEventListener('animationend',()=>{tile.classList.remove('is-bouncing');                                 });
});