// =========================================
// BOTÓN DE INICIO
// =========================================

const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {

    const hero = document.getElementById("hero");

if (hero) {
    hero.classList.add("gift-opened");
}

    const intro = document.getElementById("memories");

    intro.scrollIntoView({
        behavior: "smooth"
    });

    
});


/* =========================================
   SISTEMA DE PÉTALOS
========================================= */

const globalPetals = document.querySelector(".global-petals");
const fallenPetals = document.querySelector(".fallen-petals");

let lastScrollY = window.scrollY;
let fallenCount = 0;

const isMobile = window.innerWidth <= 700;

const MAX_FALLEN = isMobile ? 90 : 160;
const LIVE_PETALS = isMobile ? 10 : 18;


/* =========================================
   PÉTALOS QUE CAEN
========================================= */

function createFallingPetal() {

    const petal = document.createElement("span");

    petal.classList.add("falling-petal");

    const size = Math.random() * 9 + 9;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.5}px`;

    petal.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 7 + 6;

    petal.style.animationDuration =
        `${duration}s, ${Math.random() * 2 + 2}s`;

    petal.style.animationDelay =
        `${Math.random() * 2}s, 0s`;

    globalPetals.appendChild(petal);

    petal.addEventListener("animationend", function(event) {

        if (event.animationName === "petal-fall") {

            petal.remove();

            createFallingPetal();
        }

    });

}


/* =========================================
   CREAR PÉTALOS INICIALES
========================================= */

for (let i = 0; i < LIVE_PETALS; i++) {
    createFallingPetal();
}


/* =========================================
   PÉTALOS QUE ATERRIZAN AL HACER SCROLL
========================================= */

function createFallenPetal() {

    if (fallenCount >= MAX_FALLEN) {
        return;
    }

    const petal = document.createElement("span");

    petal.classList.add("fallen-petal");

    /*
        El pétalo cae aproximadamente
        en la parte inferior de la pantalla
        que estamos viendo actualmente.
    */

    const landingY =
        window.scrollY +
        window.innerHeight -
        Math.random() * 55 -
        20;

    const landingX =
        Math.random() * window.innerWidth;

    petal.style.left = `${landingX}px`;
    petal.style.top = `${landingY}px`;

    const size = Math.random() * 7 + 8;

    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.5}px`;

    petal.style.transform =
        `rotate(${Math.random() * 360}deg)`;

    fallenPetals.appendChild(petal);

    fallenCount++;
}


/* =========================================
   CREAR VARIOS PÉTALOS AL AVANZAR
========================================= */

window.addEventListener("scroll", () => {

    const currentScrollY = window.scrollY;

    const distance =
        Math.abs(currentScrollY - lastScrollY);

    /*
        Solo agregamos pétalos después
        de desplazarnos una cantidad suficiente.
    */

    if (distance > 100) {

        const amount =
            Math.min(
                Math.floor(distance / 100),
                4
            );

        for (let i = 0; i < amount; i++) {
            createFallenPetal();
        }

        lastScrollY = currentScrollY;
    }

});


/* =========================================
   AJUSTAR AL CAMBIAR TAMAÑO
========================================= */

window.addEventListener("resize", () => {

    /*
        No necesitamos reconstruir los pétalos.
        Solo evitamos que el sistema genere
        demasiados elementos.
    */

});


/* =========================================
   FLORES QUE APARECEN AL HACER SCROLL
========================================= */

const growingFlowers =
    document.querySelector(".growing-flowers");

let flowerCount = 0;
let lastFlowerScroll = window.scrollY;

const MAX_FLOWERS =
    window.innerWidth <= 700 ? 45 : 80;


/* =========================================
   CREAR UNA FLOR
========================================= */

function createGrowingFlower() {

    if (flowerCount >= MAX_FLOWERS) {
        return;
    }

    const flower = document.createElement("span");

    flower.classList.add("growing-flower");

    /*
        Variamos ligeramente las flores
        para que no parezcan copias exactas.
    */

    const flowers = ["🌼", "🌻", "✿"];

    flower.textContent =
        flowers[Math.floor(Math.random() * flowers.length)];

    /*
        La flor aparece cerca de la zona
        que acabamos de recorrer.
    */

    const y =
        window.scrollY +
        window.innerHeight -
        Math.random() * 180 -
        20;

    /*
        La colocamos principalmente
        cerca de los bordes para no
        tapar el texto.
    */

    let x;

    if (Math.random() < 0.5) {
        x = Math.random() * 15 + 2;
    } else {
        x = 83 + Math.random() * 15;
    }

    flower.style.left = `${x}%`;
    flower.style.top = `${y}px`;

    /*
        Pequeñas variaciones
        de tamaño y rotación.
    */

    const scale =
        0.7 + Math.random() * 0.6;

    flower.style.fontSize =
        `${18 + Math.random() * 14}px`;

    flower.style.transform =
        `scale(${scale}) rotate(${Math.random() * 30 - 15}deg)`;

    growingFlowers.appendChild(flower);

    flowerCount++;
}


/* =========================================
   CREAR FLORES AL AVANZAR
========================================= */

window.addEventListener("scroll", () => {

    const currentScroll =
        window.scrollY;

    const distance =
        Math.abs(currentScroll - lastFlowerScroll);

    /*
        Una pequeña flor aproximadamente
        cada 250px de recorrido.
    */

    if (distance > 250) {

        createGrowingFlower();

        /*
            Algunas veces aparecen
            dos juntas.
        */

        if (Math.random() < 0.3) {
            createGrowingFlower();
        }

        lastFlowerScroll = currentScroll;
    }

});

/* =========================================
   REVELADO DE LA FOTO
========================================= */

const letterPhoto = document.querySelector(".letter-photo");

if (letterPhoto) {

    const photoObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    letterPhoto.classList.add("show");

                    observer.unobserve(letterPhoto);
                }

            });

        },
        {
            threshold: 0.25
        }
    );

    photoObserver.observe(letterPhoto);
}

/* =========================================
   MENSAJE SECRETO
========================================= */

const secretTrigger = document.getElementById("secretTrigger");
const secretMessage = document.getElementById("secretMessage");

if (secretTrigger && secretMessage) {

    secretTrigger.addEventListener("click", () => {

        secretTrigger.style.display = "none";

        secretMessage.style.display = "block";

    });

}

/* =========================================
   MÚSICA DE LA EXPERIENCIA
========================================= */

const startGift = document.getElementById("startButton");
const backgroundMusic = document.getElementById("backgroundMusic");
const musicControl = document.getElementById("musicControl");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");

let musicStarted = false;


/* -----------------------------------------
   INICIAR EXPERIENCIA
----------------------------------------- */

if (startGift && backgroundMusic) {

    startGift.addEventListener("click", () => {

        /*
           La interacción del usuario permite
           reproducir el audio sin bloqueo del navegador.
        */

        backgroundMusic.volume = 0.35;

        backgroundMusic.play()
            .then(() => {
                const hero = document.getElementById("hero");

if (hero) {
    hero.classList.add("gift-opened");
}

                musicStarted = true;

                if (musicControl) {
                    musicControl.classList.add("visible");
                }

                if (musicButton) {
                    musicButton.textContent = "♫";
                }

                if (musicStatus) {
                    musicStatus.textContent = "Música";
                }

            })
            .catch(error => {

                console.log(
                    "No se pudo iniciar la música:",
                    error
                );

            });

    });

}


/* -----------------------------------------
   PAUSAR / REANUDAR
----------------------------------------- */

if (musicButton && backgroundMusic) {

    musicButton.addEventListener("click", () => {

        if (backgroundMusic.paused) {

            backgroundMusic.play();

            musicButton.textContent = "♫";

            musicButton.setAttribute(
                "aria-label",
                "Pausar música"
            );

            if (musicStatus) {
                musicStatus.textContent = "Música";
            }

        } else {

            backgroundMusic.pause();

            musicButton.textContent = "Ⅱ";

            musicButton.setAttribute(
                "aria-label",
                "Reanudar música"
            );

            if (musicStatus) {
                musicStatus.textContent = "Pausada";
            }

        }

    });

}

const memoryPhotos = document.querySelectorAll(".memory-photo");

if (memoryPhotos.length > 0) {

    const memoryObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry, index) => {

                if (entry.isIntersecting) {

                    setTimeout(() => {
                        entry.target.classList.add("show");
                    }, index * 180);

                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.2
        }
    );

    memoryPhotos.forEach(photo => {
        memoryObserver.observe(photo);
    });
}