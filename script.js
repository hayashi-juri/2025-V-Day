document.addEventListener("DOMContentLoaded", () => {

    // 要素の取得
    const elements = {
        yayButton: document.querySelector(".yay"),
        yeppiButton: document.querySelector(".yeppi"),
        image1: document.querySelector(".image-1"),
        envelopeWrapper: document.querySelector(".envelope-wrapper"),
        heartElement: document.querySelector(".heart"),
        letter: document.querySelector(".letter"),
        backButtonE: document.querySelector(".back-button-envelope"),
        chocolateWrapper: document.querySelector(".chocolate-wrapper"),
        gifButton: document.querySelector(".gif-button"),
        backButtonC: document.querySelector(".back-button-chocolate"),
        ramenWrapper: document.querySelector(".ramen-wrapper"),
        backButtonR: document.querySelector(".back-button-ramen"),
        heartContainer: document.querySelector(".floating-hearts"),
    };

    let isOpened = false;

    createFloatingHearts();

    // 要素の表示/非表示を切り替える関数
    const toggleDisplay = (element, show) => {
        element.style.display = show ? "inline-block" : "none";
    };

    // 封筒を開く
    const openEnvelope = () => {
        elements.envelopeWrapper.classList.add("open");
        elements.heartElement.style.opacity = "0";

        setTimeout(() => {
            createHearts();
        }, 1000);

        setTimeout(() => {
            if (elements.letter) {
                elements.letter.style.opacity = "1"; // 手紙を表示
                elements.letter.style.bottom = "150px"; // 手紙を上に移動
            }
        }, 1000);
    };

    // 封筒を閉じる
    const closeEnvelope = () => {
        elements.envelopeWrapper.classList.remove("open");
        elements.heartElement.style.opacity = "1";

        setTimeout(() => {
            elements.heartElement.style.opacity = "1";
            elements.letter.style.opacity = "0"; // 手紙を非表示
            elements.letter.style.bottom = "0";
        }, 500);
    };

    // 封筒の開閉を切り替え
    const toggleEnvelope = () => {
        isOpened = !isOpened;
        isOpened ? openEnvelope() : closeEnvelope();
    };

    // 戻るボタンがクリックされたときの処理
    const goBack = (wrapperToHide, wrappersToShow = []) => {
        wrapperToHide.classList.remove("show");
        wrappersToShow.forEach(wrapper => toggleDisplay(wrapper, true));
        toggleDisplay(elements.image1, true);
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

            const { left, top, width, height } = elements.envelopeWrapper.getBoundingClientRect();
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

    function createFloatingHearts() {
        console.log("Creating floating hearts..."); // デバッグ用ログ

        // `floating-hearts`クラスを持つコンテナを取得
        const heartContainer = document.querySelector('.floating-hearts');

        // コンテナが存在しない場合エラーログを出力して終了
        if (!heartContainer) {
            console.error("No container found for floating hearts!");
            return;
        }

        // 一度に生成するハートの数
        const heartCount = 10;

        for (let i = 0; i < heartCount; i++) {
            // ハートの要素を生成
            const heart = document.createElement("div"); // ここでheart変数を宣言
            heart.classList.add("floating-heart");
            heart.innerText = "❤"; // ハートの文字
            
            // ランダムなサイズと位置を設定
            const size = Math.random() * 30 + 20; // 20px〜50pxのサイズ
            heart.style.fontSize = `${size}px`;
            heart.style.left = `${Math.random() * 100}vw`; // 横方向ランダム配置
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // アニメーション時間5〜10秒

            // コンテナにハートを追加
            heartContainer.appendChild(heart);

            // アニメーション終了時に自動削除
            heart.addEventListener("animationend", () => {
                heart.remove();
            });
        }
    }

    // イベント設定
    elements.yayButton.onclick = () => {
        toggleDisplay(elements.image1, false);
        toggleDisplay(elements.yayButton, false);
        toggleDisplay(elements.yeppiButton, false);
        elements.envelopeWrapper.classList.add("show");
        setTimeout(() => elements.envelopeWrapper.addEventListener("click", toggleEnvelope), 500);
    };

    elements.yeppiButton.onclick = () => {
        toggleDisplay(elements.image1, false);
        toggleDisplay(elements.yayButton, false);
        toggleDisplay(elements.yeppiButton, false);
        elements.chocolateWrapper.classList.add("show");
    };

    elements.gifButton.onclick = () => {
        elements.ramenWrapper.classList.add("show");
        elements.chocolateWrapper.classList.remove("show");
    };

    elements.backButtonE.onclick = (event) => {
        event.stopPropagation(); // クリックイベントの伝播を防ぐ
        // 封筒を閉じて戻る
        goBack(elements.envelopeWrapper, [elements.yayButton, elements.yeppiButton]);
    };

    elements.backButtonC.onclick = () => 
        goBack(elements.chocolateWrapper, [elements.yayButton, elements.yeppiButton]);

    elements.backButtonR.onclick = () => {
        elements.ramenWrapper.classList.remove("show");
        elements.chocolateWrapper.classList.add("show");
    };

});