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
function animateFlip(element, changeLayout) {
    const first = element.getBoundingClientRect();

    changeLayout();

    const last = element.getBoundingClientRect();

    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;

    element.style.transformOrigin = "top left";

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
    worksPagination1.classList.remove("is-expanded");

    blogWrap.classList.remove("is-returning");
    blogWrap.classList.add("is-relocating")
    githubWrap.classList.remove("is-returning");
    githubWrap.classList.add("is-relocating")
    sub6Wrap.classList.remove("is-returning");
    sub6Wrap.classList.add("is-relocating")

    worksListView.classList.remove("is-hidden");
    worksDetailView.classList.remove("is-active");

    worksEvacuationTiles.forEach((tile) => {
        tile.classList.remove("is-evacuating");
        tile.classList.add("is-returning");

        tile.addEventListener("animationend", () => {
            tile.classList.remove("is-returning");
        }, { once: true });
    });

    setTimeout(() => {
        blogWrap.classList.remove("is-relocating");
        blogWrap.classList.remove("is-shifted-works");
        blogWrap.classList.add("is-returning");

        blogWrap.addEventListener("animationend", () => {
            blogWrap.classList.remove("is-returning");
        }, { once: true });
    }, 240);

    setTimeout(() => {
        githubWrap.classList.remove("is-relocating");
        githubWrap.classList.remove("is-shifted-works");
        githubWrap.classList.add("is-returning");

        githubWrap.addEventListener("animationend", () => {
            githubWrap.classList.remove("is-returning");
        }, { once: true });
    }, 160);

    setTimeout(() => {
        sub6Wrap.classList.remove("is-relocating");
        sub6Wrap.classList.remove("is-shifted-works");
        sub6Wrap.classList.add("is-returning");

        sub6Wrap.addEventListener("animationend", () => {
            sub6Wrap.classList.remove("is-returning");
        }, { once: true });
    }, 80);
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
        blogWrap.classList.add("is-relocating");

        aboutEvacuationTiles.forEach((tile) => {
            tile.classList.remove("is-returning");
            tile.classList.add("is-evacuating");
        });

        setTimeout(() => {
            blogWrap.classList.remove("is-relocating");
            blogWrap.classList.add("is-shifted-about");
            blogWrap.classList.add("is-returning");

            blogWrap.addEventListener("animationend", () => {
                blogWrap.classList.remove("is-returning");
            });
        }, 0);

    });
});


//閉じるボタン
aboutCloseButton.addEventListener("click", (event) => {
    event.stopPropagation();

    animateFlip(aboutWrap, () => {
        aboutWrap.classList.remove("is-expanded");
        blogWrap.classList.remove("is-returning");
        blogWrap.classList.add("is-relocating");

        aboutEvacuationTiles.forEach((tile) => {
            tile.classList.remove("is-evacuating");
            tile.classList.add("is-returning");

            tile.addEventListener("animationend", () => {
                tile.classList.remove("is-returning");
            }, { once: true });
        });
        setTimeout(() => {
            blogWrap.classList.remove("is-relocating");
            blogWrap.classList.remove("is-shifted-about");
            blogWrap.classList.add("is-returning");

            blogWrap.addEventListener("animationend", () => {
                blogWrap.classList.remove("is-returning");
            }, { once: true });
        }, 0);
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
const worksPagination1 = document.querySelector(".works-pagination1");

worksTile.addEventListener("click", () => {
    animateFlip(worksWrap, () => {
        worksWrap.classList.add("is-expanded");
        worksPagination1.classList.add("is-expanded");

        blogWrap.classList.add("is-relocating");
        githubWrap.classList.add("is-relocating");
        sub6Wrap.classList.add("is-relocating");

        worksEvacuationTiles.forEach((tile) => {
            tile.classList.remove("is-returning");
            tile.classList.add("is-evacuating");
        });

        setTimeout(() => {
            blogWrap.classList.remove("is-relocating");
            blogWrap.classList.add("is-shifted-works");
            blogWrap.classList.add("is-returning");

            blogWrap.addEventListener("animationend", () => {
                blogWrap.classList.remove("is-returning");
            },);
        }, 240);

        setTimeout(() => {
            githubWrap.classList.remove("is-relocating");
            githubWrap.classList.add("is-shifted-works");
            githubWrap.classList.add("is-returning");

            githubWrap.addEventListener("animationend", () => {
                githubWrap.classList.remove("is-returning");
            },);
        }, 160);

        setTimeout(() => {
            sub6Wrap.classList.remove("is-relocating");
            sub6Wrap.classList.add("is-shifted-works");
            sub6Wrap.classList.add("is-returning");

            sub6Wrap.addEventListener("animationend", () => {
                sub6Wrap.classList.remove("is-returning");
            });
        }, 80);
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
    blogOverlay.classList.remove('is-fade-out');
    blogOverlay.classList.add('is-fade-in');

    setTimeout(() => {
        blogOverlay.classList.remove('is-fade-in');
        blogOverlay.classList.add('is-fade-out');
    }, 900);

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
    }, 950);
});
