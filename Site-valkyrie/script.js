let unlockAttempts = 0;
const maxAttempts = 3;
let lockedOut = false;
const lockoutDuration = 300000; // 5 minutes in milliseconds
let lockoutTimeout;
let securityTimeout;
const passwordRegex = /^[a-zA-Z0-9]+$/;

// Define the access levels with corresponding passwords
const accessLevels = {
    "1111": 1,
    "2222": 2,
    "3333": 3,
    "4444": 4,
    "2137": 5 // Changed from Admin to Level 5
};

// Track which levels are unlocked
let unlockedLevels = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
};

function unlockFiles() {
    if (lockedOut) {
        alert("You have been locked out. Please try again after 5 minutes.");
        return;
    }

    const passwordInput = document.getElementById("access-password").value;

    if (!passwordRegex.test(passwordInput)) {
        alert("Password must be alphanumeric.");
        return;
    }

    const level = accessLevels[passwordInput];
    
    if (level) {
        // Unlock all content for the current level and lower levels
        for (let i = 1; i <= level; i++) {
            document.getElementById(`classified-files-level-${i}`).classList.remove("hidden");
            unlockedLevels[i] = true;
        }
        
        unlockAttempts = 0;
        startSecurityTimeout();
        console.log(`Level ${level} files have been unlocked.`);
    } else {
        unlockAttempts++;
        const attemptsLeft = maxAttempts - unlockAttempts;
        alert(`Clearance Denied. ${attemptsLeft} attempts left.`);

        if (unlockAttempts >= maxAttempts) {
            handleLockout();
        }
    }
}

function handleLockout() {
    alert("You have been locked out after multiple failed attempts. Please wait 5 minutes before trying again.");
    lockedOut = true;

    lockoutTimeout = setTimeout(() => {
        lockedOut = false;
        unlockAttempts = 0;
        alert("You can now try unlocking again.");
    }, lockoutDuration);
}

function startSecurityTimeout() {
    clearTimeout(securityTimeout);
    securityTimeout = setTimeout(() => {
        const files = document.querySelectorAll(".classified-files");

        files.forEach(file => {
            if (!file.classList.contains("hidden")) {
                file.classList.add("hidden");
                alert("Classified files have been locked due to inactivity.");
            }
        });
    }, 300000);
}
