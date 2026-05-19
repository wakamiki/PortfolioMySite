//画面初期表示
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('is-page-loaded', 'is-intro-playing');

    const introTiles = document.querySelectorAll(".tile-wrap");
    const lastIntroTile = introTiles[introTiles.length - 1];

    lastIntroTile.addEventListener("animationend", () => {
        document.body.classList.remove("is-intro-playing");
    }, { once: true });
});

//===================
//共通関数
//===================
//タイル展開アニメーション
function animateFlip(element, changeLayout, origin = "top left") {
    const first = element.getBoundingClientRect();

    changeLayout();

    const last = element.getBoundingClientRect();

    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;

    element.style.transformOrigin = origin;

    const animation = element.animate(
        [
            {
                transform: `translate(${deltaX}px, ${deltaY}px) scale(${deltaW}, ${deltaH})`
            },
            {
                transform: "translate(0, 0) scale(1, 1)"
            }
        ],
        {
            duration: 650,
            easing: "cubic-bezier(0.22, 1, 0.36, 1)",
            fill: "both"
        }
    );


    animation.addEventListener("finish", () => {
        element.style.transformOrigin = "";
    });
}

//works閉じる共通
function closeWorks() {
    worksWrap.classList.remove("is-expanded");
    worksPagination.classList.remove("is-expanded");

    worksListView.classList.remove("is-hidden");
    worksDetailView.classList.remove("is-active");

    returnTiles(worksEvacuationTiles);
    restoreRelocatedTile(sub6Wrap, "is-shifted-works", 80);
    restoreRelocatedTile(githubWrap, "is-shifted-works", 160);
    restoreRelocatedTile(blogWrap, "is-shifted-works", 240);


}

//展開時移動tileを移動先へ
function relocateTile(tile, shiftedClass, delay = 0) {
    tile.classList.add("is-relocating");
    setTimeout(() => {
        tile.classList.remove("is-relocating");
        tile.classList.add(shiftedClass);
        tile.classList.add("is-returning");

        tile.addEventListener("animationend", () => {
            tile.classList.remove("is-returning");
        }, { once: true });
    }, delay);
}

//閉じる時移動tileを元の位置
function restoreRelocatedTile(tile, shiftedClass, delay = 0) {
    tile.classList.remove("is-returning");
    tile.classList.add("is-relocating");
    setTimeout(() => {
        tile.classList.remove("is-relocating");
        tile.classList.remove(shiftedClass);
        tile.classList.add("is-returning");

        tile.addEventListener("animationend", () => {
            tile.classList.remove("is-returning");
        }, { once: true });
    }, delay);
}


//タイル退避後復帰
function returnTiles(tiles) {
    tiles.forEach((tile) => {
        tile.classList.remove("is-evacuating");
        tile.classList.add("is-returning");

        tile.addEventListener("animationend", () => {
            tile.classList.remove("is-returning");
        }, { once: true });
    });
}

//タイル退避処理
function evacuateTiles(tiles) {
    tiles.forEach((tile) => {
        tile.classList.remove("is-returning");
        tile.classList.add("is-evacuating");
    });
}



//===================
//about
//===================

// about展開
const aboutWrap = document.querySelector(".tile-wrap-about");
const aboutTile = document.querySelector(".tile-about");
const aboutCloseButton = document.querySelector(".tile-about .tile-close");
const aboutEvacuationTiles = document.querySelectorAll(".about-evacuation");
const blogWrap = document.querySelector(".tile-wrap-blog");

aboutTile.addEventListener("click", () => {
    animateFlip(aboutWrap, () => {
        aboutWrap.classList.add("is-expanded");

        evacuateTiles(aboutEvacuationTiles);
        relocateTile(blogWrap, "is-shifted-about", 240);

    });
});


//閉じるボタン
aboutCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();

    animateFlip(aboutWrap, () => {
        aboutWrap.classList.remove("is-expanded");
        returnTiles(aboutEvacuationTiles);
        restoreRelocatedTile(blogWrap, "is-shifted-about", 0);
    });
});


//===================
//works
//===================
// works展開
const worksWrap = document.querySelector(".tile-wrap-works");
const worksTile = document.querySelector(".tile-works");
const worksCloseButton = document.querySelector(".tile-works .tile-close");
const worksEvacuationTiles = document.querySelectorAll(".works-evacuation");
const githubWrap = document.querySelector(".tile-wrap-github");
const sub6Wrap = document.querySelector(".tile-wrap-green.sub6");
const worksPagination = document.querySelector(".works-pagination");

worksTile.addEventListener("click", () => {
    animateFlip(worksWrap, () => {
        worksWrap.classList.add("is-expanded");
        worksPagination.classList.add("is-expanded");

        blogWrap.classList.add("is-relocating");
        githubWrap.classList.add("is-relocating");
        sub6Wrap.classList.add("is-relocating");

        evacuateTiles(worksEvacuationTiles);
        relocateTile(sub6Wrap, "is-shifted-works", 80);
        relocateTile(githubWrap, "is-shifted-works", 160);
        relocateTile(blogWrap, "is-shifted-works", 240);


    }, "0% 10%");
});

// worksページ切り替え
const worksCard = document.querySelector(".works-list-card");
const worksListView = document.querySelector(".works-list-view");
const worksDetailView = document.querySelector(".works-detail-view");
const worksBackButton = document.querySelector(".works-back");

worksCard.addEventListener("click", (event) => {
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

    animateFlip(worksWrap, () => {
        closeWorks();

    });
});

//===================
//画面遷移
//===================

//blog画面遷移

const blogTile = document.querySelector('.tile-blog');
const blogOverlay = document.querySelector('.blog-transition-overlay');

blogTile.addEventListener('click', () => {
    blogOverlay.classList.add('is-fade-in');

    setTimeout(() => {
        window.location.href = 'https://example.com';
    }, 1550);
});

//github画面遷移
const githubTile = document.querySelector('.tile-github');
const githubOverlay = document.querySelector('.github-transition-overlay');

githubTile.addEventListener('click', () => {
    githubOverlay.classList.add('is-iris-in');

    setTimeout(() => {
        window.location.href = 'https://github.com/ここにユーザー名';
    }, 1550);
});
