document.addEventListener("DOMContentLoaded", () => {
    const yesButton = document.getElementById("yesButton");
    const noButton = document.getElementById("noButton");
    const envelopeWrapper = document.querySelector(".envelope-wrapper");
    const lidClosed = document.querySelector(".lid.closed");
    const lidOpen = document.querySelector(".lid.open");
    const heartElement = document.querySelector(".heart");
    let isOpened = false;

    // Yesボタンがクリックされたときに封筒を表示
    const showEnvelope = () => {
        noButton.style.display = "none"; // Noボタン非表示
        envelopeWrapper.classList.add("show");

        // 封筒が表示された後、クリックで開閉可能に
        setTimeout(() => {
            envelopeWrapper.addEventListener("click", toggleEnvelope);
        }, 1000); // アニメーション完了後にイベントを追加
    };

    // Noボタンがホバーされたときに移動する効果
    const moveButton = () => {
        const randomX = Math.random() * (window.innerWidth - noButton.offsetWidth);
        const randomY = Math.random() * (window.innerHeight - noButton.offsetHeight);
        noButton.style.position = "absolute";
        noButton.style.left = `${Math.max(0, randomX)}px`;
        noButton.style.top = `${Math.max(0, randomY)}px`;
    };

    // ハートを生成する関数
    const createHearts = () => {
        for (let i = 0; i < 100; i++) {
            const heart = document.createElement("div");
            heart.classList.add("heart");
            heart.innerText = "❤";
            document.body.appendChild(heart);

            const size = Math.random() * 20 + 10;
            heart.style.fontSize = `${size}px`;

            const { left, top, width, height } = envelopeWrapper.getBoundingClientRect();
            heart.style.left = `${left + width / 2}px`;
            heart.style.top = `${top + height / 2}px`;

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

            setTimeout(() => heart.remove(), 3000);
        }
    };

    // 封筒を開く
    const openEnvelope = () => {
        lidClosed.style.transform = "rotateX(90deg)";
        lidOpen.style.transform = "rotateX(180deg)";
        heartElement.style.opacity = "0";

        setTimeout(() => {
            createHearts();
        }, 1000);
    };

    // 封筒を閉じる
    const closeEnvelope = () => {
        lidClosed.style.transform = "rotateX(0deg)";
        lidOpen.style.transform = "rotateX(90deg)";

        setTimeout(() => {
            heartElement.style.opacity = "1";
        }, 1000);
    };

    // 封筒の開閉を切り替え
    const toggleEnvelope = () => {
        if (!isOpened) {
            isOpened = true;
            openEnvelope();
            setTimeout(() => {
                envelopeWrapper.classList.add("open");
            }, 1200);
        } else {
            isOpened = false;
            closeEnvelope();
            setTimeout(() => {
                envelopeWrapper.classList.remove("open");
            }, 1200);
        }
    };

    // ボタンのイベントリスナーを設定
    yesButton.onclick = showEnvelope;
    noButton.onmouseover = moveButton;
});
