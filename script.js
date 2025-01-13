document.addEventListener("DOMContentLoaded", () => {
    const yayButton = document.querySelector(".yay");
    const yeppiButton = document.querySelector(".yeppi");
    const image1 = document.querySelector(".image-1");
    // const image2 = document.querySelector(".image-2");
    const envelopeWrapper = document.querySelector(".envelope-wrapper");
    const heartElement = document.querySelector(".heart");
    const backButtonE = document.querySelector(".back-button-envelope");
    const chocolateWrapper = document.querySelector(".chocolate-wrapper");
    const gifButton = document.querySelector(".gif-button");
    const backButtonC = document.querySelector(".back-button-chocolate");
    const ramenWrapper = document.querySelector(".ramen-wrapper");
    const backButtonR = document.querySelector(".back-button-ramen");
    // const askWrapper = document.querySelector(".ask-wrapper");
    const heartContainer = document.querySelector(".floating-hearts");
    let isOpened = false;

    // ページロード時にバックグラウンドでハートを生成
    createFloatingHearts();

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

    // 戻るボタンがクリックされたときの処理
    const goBackFromEnvelope = () => {
        envelopeWrapper.classList.remove("show"); // 封筒を非表示
        yayButton.style.display = "inline-block"; // Yayボタンを再表示
        yeppiButton.style.display = "inline-block"; // Yeppiボタンを再表示
        image1.style.display = "block"; // 猫の画像を再表示
    };

    // Chocolate wrapper を表示
    const showChocolate = () => {
        image1.style.display = "none";
        yeppiButton.style.display = "none"; // 非表示
        yayButton.style.display = "none"; // 非表示
        // イベントを追加
        chocolateWrapper.classList.add("show");
    };

    gifButton.addEventListener("click", () => {
        // alert("You clicked the gift!"); // 必要に応じて他のアクションをここに記述
        ramenWrapper.classList.add("show");
        chocolateWrapper.classList.remove("show");
    });

    const goBackFromChocolate = () => {
        chocolateWrapper.classList.remove("show"); // Chocolate画面を非表示
        yayButton.style.display = "inline-block"; // Yayボタンを再表示
        yeppiButton.style.display = "inline-block"; // Yeppiボタンを再表示
        image1.style.display = "block"; // 猫の画像を再表示
    };

    const goBackFromRamen = () => {
        ramenWrapper.classList.remove("show"); // 封筒を非表示
        chocolateWrapper.classList.add("show");
    };

    function createConfetti() {
        for (let i = 0; i < 200; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti");
            
            document.body.appendChild(confetti);
    
            // ランダムなサイズと位置を設定
            const size = Math.random() * 8 + 4; // 4px〜12pxのランダムサイズ
            const xPosition = Math.random() * window.innerWidth;
            const yPosition = -50; // 初期位置を画面の上部に設定
    
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.left = `${xPosition}px`;
            confetti.style.top = `${yPosition}px`;
    
            // ランダムな回転と色
            confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
            // アニメーション
            confetti.animate(
                [
                    { transform: `translateY(0px)` },
                    { transform: `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 720}deg)` }
                ],
                {
                    duration: Math.random() * 2000 + 2000, // 2〜4秒間のランダムアニメーション
                    easing: "ease-out",
                    iterations: 1,
                    fill: "forwards"
                }
            );
    
            // 紙吹雪を一定時間後に削除
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    
    // ボタンのクリックイベントに紙吹雪を追加
    document.querySelector('.gif-button').addEventListener('click', () => {
        createConfetti();
    });
    
    function createFloatingHearts() {
        console.log("Creating floating hearts..."); // デバッグ用ログ
        const heartContainer = document.querySelector('.floating-hearts');
    
        // コンテナが存在しない場合エラーログを出力
        if (!heartContainer) {
            console.error("No container found for floating hearts!");
            return;
        }
    
        for (let i = 0; i < 10; i++) { // 一度に生成するハートの数
            const heart = document.createElement("div");
            heart.classList.add("floating-heart");
    
            // ハートを親コンテナに追加
            heartContainer.appendChild(heart);
    
            // ランダムなサイズ、位置、アニメーション時間などを設定
            const size = Math.random() * 30 + 20; // 20px〜50pxのサイズ
            heart.style.fontSize = `${size}px`;
            heart.style.left = `${Math.random() * 100}vw`; // 横方向ランダム配置
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`; // アニメーション時間
    
            // 一定時間後にハートを削除
            setTimeout(() => {
                heart.remove();
            }, 10000); // 10秒後に削除
        }
    }
    

    // 封筒をクリックすると開閉
    envelopeWrapper.addEventListener("click", toggleEnvelope);

    // ボタンのイベントリスナーを設定
    yayButton.onclick = showEnvelope;
    yeppiButton.onclick = showChocolate;
    backButtonE.addEventListener("click", goBackFromEnvelope);
    backButtonR.addEventListener("click", goBackFromRamen);
    // 戻るボタンにイベントリスナーを追加
    backButtonC.addEventListener("click", goBackFromChocolate);
});