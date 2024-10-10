let unlockAttempts = 0;
const maxAttempts = 3;
let lockedOut = false;
const lockoutDuration = 300000;
let lockoutTimeout;
let securityTimeout;
const passwordRegex = /^[a-zA-Z0-9]+$/;
const sound = new Audio('error.wav');

const accessLevels = {
    "1111": 1,
    "2222": 2,
    "3333": 3,
    "4444": 4,
    "2137": 5
};

let unlockedLevels = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
};

function showError(messageId) {
    const errorElement = document.getElementById(messageId);
    errorElement.classList.remove("hidden");
}

function hideError(messageId) {
    const errorElement = document.getElementById(messageId);
    if (errorElement) {
        errorElement.classList.add("hidden");
    }
}

function unlockFiles() {
    if (lockedOut) {
        alert("You have been locked out. Please try again later.");
        hideError('access-error');
        return;
    }

    const passwordInput = document.getElementById("access-password").value;

    if (!passwordRegex.test(passwordInput)) {
        showError('access-error');
        return;
    }

    const level = accessLevels[passwordInput];

    if (level) {
        for (let i = 1; i <= level; i++) {
            document.getElementById(`classified-files-level-${i}`).classList.remove("hidden");
            unlockedLevels[i] = true;
        }

        hideError('access-error');
        hideError('locked-out-message');
        hideError('timeout-message');
        unlockAttempts = 0;
        startSecurityTimeout();
    } else {
        unlockAttempts++;
        const attemptsLeft = maxAttempts - unlockAttempts;
        hideError('access-error');
        document.getElementById('access-error').innerHTML = "Incorrect password. Please try again.";
        sound.play();
        showError('access-error');
        document.getElementById('access-error').innerHTML += "You have " + attemptsLeft + " attempt(s) left.";
        if (unlockAttempts >= maxAttempts) {
            handleLockout();
        }
    }
}

function handleLockout() {
    hideError('access-error');
    showError('locked-out-message');
    lockedOut = true;

    lockoutTimeout = setTimeout(() => {
        lockedOut = false;
        unlockAttempts = 0;
        hideError('locked-out-message');
    }, lockoutDuration);
}

function startSecurityTimeout() {
    clearTimeout(securityTimeout);
    securityTimeout = setTimeout(() => {
        const files = document.querySelectorAll(".classified-files");

        files.forEach(file => {
            if (!file.classList.contains("hidden")) {
                file.classList.add("hidden");
            }
        });

        showError('timeout-message');
    }, 300000);
}
