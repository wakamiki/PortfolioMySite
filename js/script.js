// about
const aboutWrap = document.querySelector(".tile-wrap-about");
const aboutTile = document.querySelector(".tile-about");
const aboutCloseButton = document.querySelector(".tile-about .tile-close");
const aboutEvacuationTiles = document.querySelectorAll(".about-evacuation");
const blogWrap = document.querySelector(".tile-wrap-blog");

aboutTile.addEventListener("click", () => {
    aboutWrap.classList.add("is-expanded");

    blogWrap.classList.add("is-shifted-about");

    aboutEvacuationTiles.forEach((tile) => {
        tile.classList.add("is-muted");
    });
});


//閉じるボタン
aboutCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();
    aboutWrap.classList.remove("is-expanded");
    blogWrap.classList.remove("is-shifted-about");

    aboutEvacuationTiles.forEach((tile) => {
        tile.classList.remove("is-muted");
    });
});

// works
const worksWrap = document.querySelector(".tile-wrap-works");
const worksTile = document.querySelector(".tile-works");
const worksCloseButton = document.querySelector(".tile-works .tile-close");
const worksEvacuationTiles = document.querySelectorAll(".works-evacuation");
const githubWrap = document.querySelector(".tile-wrap-github");
const sub6Wrap = document.querySelector(".tile-wrap-green.sub6");
const worksPagination1 = document.querySelector(".works-pagination1");

worksTile.addEventListener("click", () => {
    worksWrap.classList.add("is-expanded");
    worksPagination1.classList.add("is-expanded");
    blogWrap.classList.add("is-shifted-works");
    githubWrap.classList.add("is-shifted-works");
    sub6Wrap.classList.add("is-shifted-works");

    worksEvacuationTiles.forEach((tile) => {
        tile.classList.add("is-muted");
    });
});

//閉じるボタン
worksCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();
    worksWrap.classList.remove("is-expanded");
    worksPagination1.classList.remove("is-expanded");
    blogWrap.classList.remove("is-shifted-works");
    githubWrap.classList.remove("is-shifted-works");
    sub6Wrap.classList.remove("is-shifted-works");

    worksEvacuationTiles.forEach((tile) => {
        tile.classList.remove("is-muted");
    });
});

// worksページ切り替え
const workCard = document.querySelector(".work-card");
const worksListView = document.querySelector(".works-list-view");
const worksDetailView = document.querySelector(".works-detail-view");
const worksBackButton = document.querySelector(".works-back");

workCard.addEventListener("click", (event) => {
    event.stopPropagation();
    worksListView.classList.add("is-hidden");
    worksDetailView.classList.add("is-active");
});

//戻るボタン
worksBackButton.addEventListener("click", (event) => {
    event.stopPropagation();
    worksListView.classList.remove("is-hidden");
    worksDetailView.classList.remove("is-active");
});

//閉じるボタン
worksCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();

    worksWrap.classList.remove("is-expanded");
    worksPagination1.classList.remove("is-expanded");
    blogWrap.classList.remove("is-shifted-works");
    githubWrap.classList.remove("is-shifted-works");
    sub6Wrap.classList.remove("is-shifted-works");

    worksListView.classList.remove("is-hidden");
    worksDetailView.classList.remove("is-active");

    worksEvacuationTiles.forEach((tile) => {
        tile.classList.remove("is-muted");
    });
});