document.addEventListener("DOMContentLoaded", () => {
    const wrapper = document.querySelector(".wrapper");
    const lidClosed = document.querySelector(".lid.closed");
    const lidOpen = document.querySelector(".lid.open");
    const heartElement = document.querySelector(".heart");
    let isOpened = false;

    const createHearts = () => {
        for (let i = 0; i < 100; i++) { // ハートの数を設定
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerText = "❤";
            document.body.appendChild(heart);

            const size = Math.random() * 20 + 10; // サイズをランダム化
            heart.style.fontSize = `${size}px`;

            // 初期位置を封筒の中央付近に設定
            const { left, top, width, height } = wrapper.getBoundingClientRect();
            heart.style.left = `${left + width / 2}px`;
            heart.style.top = `${top + height / 2}px`;

            // ランダムな移動先を設定
            const xMove = (Math.random() - 0.5) * 400;
            const yMove = -(Math.random() * 300 + 200);

            heart.animate([
                { transform: `translate(0, 0)` },
                { transform: `translate(${xMove}px, ${yMove}px)`, opacity: 0 }
            ], {
                duration: 2000 + Math.random() * 1000,
                easing: "ease-out",
                iterations: 1,
                fill: "forwards"
            });

            // アニメーション終了後に削除
            setTimeout(() => heart.remove(), 3000);
        }
    };

    const openEnvelope = () => {
        // 蓋を開く動作
        lidClosed.style.transform = "rotateX(90deg)";
        lidOpen.style.transform = "rotateX(180deg)";

        // 封筒についているハートを非表示にする
        heartElement.style.opacity = "0";

        // ハートを生成する前に遅延を追加
        setTimeout(() => {
            createHearts();
        }, 1000); // 蓋が開ききるタイミングに合わせて遅延を調整
    };

    const closeEnvelope = () => {
        // 蓋を閉じる動作
        lidClosed.style.transform = "rotateX(0deg)";
        lidOpen.style.transform = "rotateX(90deg)";

        // 封筒についているハートを再表示
        setTimeout(() => {
            heartElement.style.opacity = "1";
        }, 1000);
    };

    const toggleEnvelope = () => {
        if (!isOpened) {
            isOpened = true;
            openEnvelope();
            setTimeout(() => {
            wrapper.classList.add("open"); // 手紙を出す
            }, 1200);
        } else {
            isOpened = false;
            closeEnvelope();
            setTimeout(() => {
            wrapper.classList.remove("open"); // 手紙をしまう
            }, 1200);
        }
    };    


    // 封筒をクリックすると開く
    wrapper.addEventListener("click", toggleEnvelope);
});
