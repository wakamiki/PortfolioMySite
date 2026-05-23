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
    worksBackButton.classList.remove("is-visible");
    worksPageDots[0].classList.add("is-active");
    worksPageDots[1].classList.remove("is-active");
    worksDetailProjects.forEach((project) => {
        project.classList.remove("is-active");
    });

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

//ロック中か判定
const tilespace = document.querySelector(".tilespace");

function isTileLocked() {
    return tilespace.classList.contains("is-tile-locked");
}

//タイルロック状態付与
function lockTiles() {
    tilespace.classList.add("is-tile-locked");
}
//タイルロック状態解除
function unlockTiles() {
    tilespace.classList.remove("is-tile-locked");
}

// 今回のクリックを止めるべきか判定
function shouldBlockTileAction(event) {
    return (
        isTileLocked() &&
        !event.target.closest(".tile-wrap.is-expanded")
    );
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

aboutTile.addEventListener("click", (event) => {
    if (shouldBlockTileAction(event)) {
        return;
    }
    if (aboutWrap.classList.contains("is-expanded")) {
        return;
    }

    lockTiles();

    animateFlip(aboutWrap, () => {
        aboutWrap.classList.add("is-expanded");

        evacuateTiles(aboutEvacuationTiles);
        relocateTile(blogWrap, "is-shifted-about", 240);

    });
});


//閉じるボタン
aboutCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();

    unlockTiles();

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

worksTile.addEventListener("click", (event) => {
    if (shouldBlockTileAction(event)) {
        return;
    }
    if (worksWrap.classList.contains("is-expanded")) {
        return;
    }

    lockTiles();

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
const worksCards = document.querySelectorAll(".works-list-card");
const worksDetailProjects = document.querySelectorAll(".works-detail-project");
const worksListView = document.querySelector(".works-list-view");
const worksDetailView = document.querySelector(".works-detail-view");
const worksBackButton = document.querySelector(".works-back");
const worksPageDots = document.querySelectorAll(".works-page-dot");

worksCards.forEach((card) => {
    card.addEventListener("click", (event) => {
        event.stopPropagation();

        const targetWork = card.dataset.work;

        worksDetailProjects.forEach((project) => {
            project.classList.toggle(
                "is-active",
                project.dataset.workDetail === targetWork
            );
        });
        worksListView.classList.add("is-hidden");
        worksDetailView.classList.add("is-active");
        worksBackButton.classList.add("is-visible");
        worksPageDots[0].classList.remove("is-active");
        worksPageDots[1].classList.add("is-active");
    });
});

//戻るボタン
worksBackButton.addEventListener("click", (event) => {
    event.stopPropagation();
    worksListView.classList.remove("is-hidden");
    worksDetailView.classList.remove("is-active");
    worksBackButton.classList.remove("is-visible");
    worksPageDots[0].classList.add("is-active");
    worksPageDots[1].classList.remove("is-active");
    worksDetailProjects.forEach((project) => {
        project.classList.remove("is-active");
    });
});

//閉じるボタン
worksCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();

    unlockTiles();

    animateFlip(worksWrap, () => {
        closeWorks();

    });
});

//===================
//画面遷移
//===================

//遷移先安全チェック
function isAllowedExternalUrl(url) {
    const allowedHosts = [
        "github.com",
        "note.com"
    ];

    try {
        const parsedUrl = new URL(url);
        return allowedHosts.includes(parsedUrl.hostname);
    } catch {
        return false;
    }
}

//遷移共通関数
function moveToAllowedExternalUrl(url) {
    if (!isAllowedExternalUrl(url)) {
        return;
    }

    window.location.href = url;
}

//blog画面遷移

const blogTile = document.querySelector('.tile-blog');
const blogOverlay = document.querySelector('.blog-transition-overlay');

blogTile.addEventListener('click', (event) => {
    if (shouldBlockTileAction(event)) {
        return;
    }
    if (!isAllowedExternalUrl("https://note.com/miki_jp2026")) {
        return;
    }
    blogOverlay.classList.add('is-fade-in');

    setTimeout(() => {
        moveToAllowedExternalUrl("https://note.com/miki_jp2026");
    }, 1550);
});

//github画面遷移
const githubTile = document.querySelector('.tile-github');
const githubOverlay = document.querySelector('.github-transition-overlay');

githubTile.addEventListener('click', (event) => {
    if (shouldBlockTileAction(event)) {
        return;
    }
    if (!isAllowedExternalUrl("https://github.com/wakamiki?tab=repositories")) {
        return;
    }
    githubOverlay.classList.add('is-iris-in');

    setTimeout(() => {
        moveToAllowedExternalUrl("https://github.com/wakamiki?tab=repositories");
    }, 1550);
});

//works-詳細ページ画面遷移
const workGithubLinks = document.querySelectorAll(".work-github-link");

function startGithubTransition(url) {
    githubOverlay.classList.add("is-iris-in");

    setTimeout(() => {
        window.location.href = url;
    }, 1550);
}

workGithubLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const url = link.href;

        if (!isAllowedExternalUrl(url)) {
            return;
        }

        animateFlip(worksWrap, () => {
            closeWorks();
        });

        setTimeout(() => {
            startGithubTransition(url);
        }, 1000);
    });
});

//works ErrorInsight画面遷移

