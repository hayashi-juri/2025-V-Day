document.addEventListener("DOMContentLoaded", () => {

    // get elementd
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

    // show/hide
    const toggleDisplay = (element, show) => {
        element.style.display = show ? "inline-block" : "none";
    };

    // open envelope
    const openEnvelope = () => {
        elements.envelopeWrapper.classList.add("open");
        elements.heartElement.style.opacity = "0";

        setTimeout(() => {
            createHearts();
        }, 1000);

        setTimeout(() => {
            if (elements.letter) {
                elements.letter.style.opacity = "1"; // show letter
                elements.letter.style.bottom = "150px"; // move letter
            }
        }, 1000);
    };

    // close envelope
    const closeEnvelope = () => {
        elements.envelopeWrapper.classList.remove("open");
        elements.heartElement.style.opacity = "1";

        setTimeout(() => {
            elements.heartElement.style.opacity = "1";
            elements.letter.style.opacity = "0"; // hide envelope
            elements.letter.style.bottom = "0";
        }, 500);
    };

    // lid open/close
    const toggleEnvelope = () => {
        isOpened = !isOpened;
        isOpened ? openEnvelope() : closeEnvelope();
    };

    // back btn
    const goBack = (wrapperToHide, wrappersToShow = []) => {
        wrapperToHide.classList.remove("show");
        wrappersToShow.forEach(wrapper => toggleDisplay(wrapper, true));
        toggleDisplay(elements.image1, true);
    };

    // hearts function
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
        console.log("Creating floating hearts...");

        const heartContainer = document.querySelector('.floating-hearts');

        if (!heartContainer) {
            console.error("No container found for floating hearts!");
            return;
        }

        const heartCount = 10;

        for (let i = 0; i < heartCount; i++) {

            const heart = document.createElement("div");
            heart.classList.add("floating-heart");
            heart.innerText = "❤";

            const size = Math.random() * 30 + 20;
            heart.style.fontSize = `${size}px`;
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.animationDuration = `${Math.random() * 5 + 5}s`;

            heartContainer.appendChild(heart);

            heart.addEventListener("animationend", () => {
                heart.remove();
            });
        }
    }

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
        event.stopPropagation();
        goBack(elements.envelopeWrapper, [elements.yayButton, elements.yeppiButton]);
    };

    elements.backButtonC.onclick = () => 
        goBack(elements.chocolateWrapper, [elements.yayButton, elements.yeppiButton]);

    elements.backButtonR.onclick = () => {
        elements.ramenWrapper.classList.remove("show");
        elements.chocolateWrapper.classList.add("show");
    };

});