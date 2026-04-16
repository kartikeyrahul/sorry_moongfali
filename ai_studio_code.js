let musicPlayed = false;

function nextScene(currentScene) {
    if (!musicPlayed) {
        let audio = document.getElementById("bgMusic");
        audio.play().catch(e => console.log("Audio play failed"));
        musicPlayed = true;
    }

    let current = document.getElementById(`scene${currentScene}`);
    current.style.opacity = "0";
    current.style.transform = "translateY(-20px)";
    
    setTimeout(() => {
        current.classList.remove("active");
        current.style.display = "none";
        
        let next = document.getElementById(`scene${currentScene + 1}`);
        next.style.display = "block";
        
        setTimeout(() => {
            next.classList.add("active");
            next.style.opacity = "1";
            next.style.transform = "translateY(0)";
        }, 50);
    }, 800);
}

// === THE PUNISHMENT GAME LOGIC ===
let egoHealth = 100;
const egoBar = document.getElementById("egoBar");
const punchBtn = document.getElementById("punchBtn");

function punchKartikey() {
    egoHealth -= 15; // Takes about 7 taps to destroy

    // Haptic feedback for mobile phones (makes the phone vibrate slightly)
    if (navigator.vibrate) {
        navigator.vibrate(50);
    }

    if (egoHealth <= 0) {
        egoHealth = 0;
        egoBar.style.width = "0%";
        egoBar.innerHTML = "EGO DESTROYED";
        punchBtn.style.display = "none";
        
        // Move to the next scene automatically after ego is destroyed
        setTimeout(() => {
            nextScene(3);
        }, 1000);
    } else {
        egoBar.style.width = egoHealth + "%";
        egoBar.innerHTML = egoHealth + "% EGO";
        
        // Random funny texts on button tap
        const texts = ["Ouch! 🤕", "Okay, I deserve that", "Hit harder! 🥊", "My pride hurts", "Sorry! 😭"];
        punchBtn.innerHTML = texts[Math.floor(Math.random() * texts.length)];
    }
}

// === MOVING "NO" BUTTON ===
const noBtn = document.getElementById("noBtn");

function moveNoButton() {
    let maxX = window.innerWidth - noBtn.clientWidth - 20;
    let maxY = window.innerHeight - noBtn.clientHeight - 20;

    let randomX = Math.max(10, Math.floor(Math.random() * maxX));
    let randomY = Math.max(10, Math.floor(Math.random() * maxY));

    noBtn.style.position = "fixed";
    noBtn.style.left = `${randomX}px`;
    noBtn.style.top = `${randomY}px`;
    noBtn.style.transform = "none";
}

noBtn.addEventListener("mouseover", moveNoButton);
noBtn.addEventListener("touchstart", function(e) {
    e.preventDefault();
    moveNoButton();
});

// === FINAL SCENE TRANSITION ===
function forgiven() {
    let audio = document.getElementById("bgMusic");
    document.getElementById("audioSource").src = "happy.mp3";
    audio.load();
    audio.play();

    // Change theme from Dark to Premium Elegant Light/Cream theme
    document.body.style.backgroundColor = "#faf9f6"; // Off-white/cream
    document.body.style.color = "#2c2c2c";
    
    // Change heading colors
    const headings = document.querySelectorAll("h1, h2");
    headings.forEach(h => h.style.color = "#d4af37");

    nextScene(4);
}

// === PREMIUM SPARKLES ON TAP ===
document.addEventListener("click", function(e) {
    // Prevent sparkles from breaking the button clicks
    if(e.target.tagName !== 'BUTTON') {
        createSparkle(e.pageX, e.pageY);
    }
});
document.addEventListener("touchstart", function(e) {
    if(e.target.tagName !== 'BUTTON') {
        let touch = e.touches[0];
        createSparkle(touch.pageX, touch.pageY);
    }
}, {passive: true});

function createSparkle(x, y) {
    let sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 800);
}