const envelope = document.getElementById("envelope");
const emojiContainer = document.getElementById("emojiContainer");
let escapeCount = 0;

envelope.addEventListener("mouseover", () => {
    if (escapeCount < 5) {
        // 封筒をランダムな位置に移動
        const container = envelope.parentElement;
        const containerRect = container.getBoundingClientRect();
        const envelopeRect = envelope.getBoundingClientRect();

        const newLeft = Math.random() * (containerRect.width - envelopeRect.width);
        const newTop = Math.random() * (containerRect.height - envelopeRect.height);

        envelope.style.left = `${newLeft}px`;
        envelope.style.top = `${newTop}px`;
        escapeCount++;
    } else {
        // 封筒を開けて絵文字を表示
        envelope.classList.add("hidden");
        emojiContainer.classList.remove("hidden");
    }
});
