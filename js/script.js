

const aboutWrap = document.querySelector(".tile-wrap-about");
const aboutTile = document.querySelector(".tile-about");
const aboutCloseButton = document.querySelector(".tile-about .tile-close");
const aboutEvacuationTiles = document.querySelectorAll(".about-evacuation");
const blogWrap = document.querySelector(".tile-wrap-blog");

aboutTile.addEventListener("click", () => {
    aboutWrap.classList.add("is-expanded");

    blogWrap.classList.add("is-shifted");

    aboutEvacuationTiles.forEach((tile) => {
        tile.classList.add("is-muted");
    });
});

aboutCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();
    aboutWrap.classList.remove("is-expanded");
    blogWrap.classList.remove("is-shifted");

    aboutEvacuationTiles.forEach((tile) => {
        tile.classList.remove("is-muted");
    });
});

