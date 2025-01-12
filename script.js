document.addEventListener("DOMContentLoaded", () => {
    const yayButton = document.querySelector(".yay");
    const yeppiButton = document.querySelector(".yeppi");
    const image1 = document.querySelector(".image-1")
    const image2 = document.querySelector(".image-2")
    const envelopeWrapper = document.querySelector(".envelope-wrapper");
    const heartElement = document.querySelector(".heart");
    const chocolateWrapper = document.querySelector(".chocolate-wrapper");
    let isOpened = false;

    // Yayボタンがクリックされたときに封筒を表示
    const showEnvelope = () => {
        image1.style.display = "none";
        yayButton.style.display = "none";
        yeppiButton.style.display = "none"; // 非表示
        envelopeWrapper.classList.add("show");

        // 封筒が表示された後、クリックで開閉可能に
        setTimeout(() => {
            envelopeWrapper.addEventListener("click", toggleEnvelope);
        }, 500); // アニメーション完了後にイベントを追加
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
        envelopeWrapper.classList.add("open");
        heartElement.style.opacity = "0";

        setTimeout(() => {
            createHearts();
        }, 1000);
    };

    // 封筒を閉じる
    const closeEnvelope = () => {
        envelopeWrapper.classList.remove("open");
        heartElement.style.opacity = "1";

        setTimeout(() => {
            heartElement.style.opacity = "1";
            letter.style.opacity = "0"; // 手紙を非表示
            letter.style.bottom = "0";
        }, 1000);
    };

    // 封筒の開閉を切り替え
    const toggleEnvelope = () => {
        if (!isOpened) {
            isOpened = true;
            openEnvelope();
        } else {
            isOpened = false;
            closeEnvelope();
        }
    };

    const showChocolate = () => {
        image1.style.display = "none";
        yeppiButton.style.display = "none"; // 非表示
        yayButton.style.display = "none"; // 非表示
        // イベントを追加
        chocolateWrapper.classList.add("show");
    };

    // 封筒をクリックすると開閉
    envelopeWrapper.addEventListener("click", toggleEnvelope);

    // ボタンのイベントリスナーを設定
    yayButton.onclick = showEnvelope;
    yeppiButton.onclick = showChocolate;
});