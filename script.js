const envelope = document.getElementById("envelope");
let escapeCount = 0;
let maxEscapes = Math.floor(Math.random() * 6) + 5; // 5〜10回のランダム

const emojis = ["❤️", "🍫", "✨", "⭐", "💖"];
let envelopeRect = envelope.getBoundingClientRect(); // 封筒の初期位置を取得

// 封筒にマウスまたはタッチイベントを設定
function addEscapeEvent() {
    envelope.addEventListener("mouseover", handleEscape);
    envelope.addEventListener("touchstart", handleEscape);
}

function handleEscape() {
    if (escapeCount < maxEscapes) {
        // 封筒をランダムな位置に移動
        const container = envelope.parentElement;
        const containerRect = container.getBoundingClientRect();
        const envelopeRect = envelope.getBoundingClientRect();

        const newLeft = Math.random() * (containerRect.width - envelopeRect.width);
        const newTop = Math.random() * (containerRect.height - envelopeRect.height);

        envelope.style.left = `${newLeft}px`;
        envelope.style.top = `${newTop}px`;
        escapeCount++;
    } 
    
    else {
        // 封筒を開けて絵文字を表示
        envelope.classList.add("ready");
        envelope.removeEventListener("mouseover", handleEscape); // 移動停止
        envelope.addEventListener("click", openEnvelope); // クリックで開ける

    }
}

function openEnvelope() {
    envelope.classList.remove("closed");
    envelope.classList.add("open");
    // releaseEmojis();
}

/*
function releaseEmojis() {
    const container = document.querySelector(".container");
    const centerX = envelopeRect.left + envelopeRect.width / 2;
    const centerY = envelopeRect.top + envelopeRect.height / 2;

    for (let i = 0; i < 30; i++) {
        const emoji = document.createElement("div");
        emoji.classList.add("emoji");
        emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${centerX}px`;
        emoji.style.top = `${centerY}px`;
        emoji.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(emoji);

        // アニメーションが終わったら削除
        emoji.addEventListener("animationend", () => {
            emoji.remove();
        });
    }
}*/

// イベントを追加
addEscapeEvent();
