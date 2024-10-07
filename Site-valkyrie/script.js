let unlockAttempts = 0;
const maxAttempts = 3;
let lockedOut = false;
let securityTimeout;
let lockoutTimeout;
const lockoutDuration = 300000; // 5 minutes in milliseconds
const passwordRegex = /^[a-zA-Z0-9]+$/;

const accessLevels = {
    "Level 1": "1111",
    "Level 2": "2222",
    "Level 3": "3333",
    "Level 4": "4444",
    "Admin": "2137"
};

let unlockedLevels = {
    "Level 1": false,
    "Level 2": false,
    "Level 3": false,
    "Level 4": false,
    "Admin": false
};

function unlockClassifiedFiles(level) {
    if (lockedOut) {
        alert("You have been locked out. Please try again after 5 minutes.");
        return;
    }

    const files = document.getElementById(`classified-files-level-${level}`);
    const password = prompt(`Input Password for Classified Files (Level ${level}):`);

    if (passwordRegex.test(password)) {
        if (password === accessLevels[`Level ${level}`]) {
            files.classList.remove("hidden");
            unlockedLevels[`Level ${level}`] = true;
            unlockAttempts = 0;
            startSecurityTimeout();
            console.log(`Classified Level ${level} files have been unlocked.`);
            document.querySelector(`button[onclick="toggleClassifiedFiles(${level})"]`).textContent = `Lock Classified Files (Level ${level})`;
        } else {
            unlockAttempts++;
            const attemptsLeft = maxAttempts - unlockAttempts;
            alert(`Clearance Denied. ${attemptsLeft} attempts left.`);
        }
    } else {
        alert("Password must be alphanumeric.");
    }

    if (unlockAttempts >= maxAttempts) {
        handleLockout();
    }
}

function unlockAdminFiles() {
    if (lockedOut) {
        alert("You have been locked out. Please try again after 5 minutes.");
        return;
    }

    const adminFiles = document.getElementById("admin-files");
    const password = prompt("Input Password for Admin Files:");

    if (passwordRegex.test(password)) {
        if (password === accessLevels["Admin"]) {
            adminFiles.classList.remove("hidden");
            unlockedLevels["Admin"] = true;
            unlockAttempts = 0;
            startSecurityTimeout();
            console.log("Admin files have been unlocked.");
            document.querySelector('button[onclick="toggleAdminFiles()"]').textContent = "Lock Admin Files";
        } else {
            unlockAttempts++;
            const attemptsLeft = maxAttempts - unlockAttempts;
            alert(`Clearance Denied. ${attemptsLeft} attempts left.`);
        }
    } else {
        alert("Password must be alphanumeric.");
    }

    if (unlockAttempts >= maxAttempts) {
        handleLockout();
    }
}

function toggleClassifiedFiles(level) {
    const files = document.getElementById(`classified-files-level-${level}`);
    if (!unlockedLevels[`Level ${level}`]) {
        unlockClassifiedFiles(level);
    } else {
        lockClassifiedFiles(level);
    }
}

function lockClassifiedFiles(level) {
    const files = document.getElementById(`classified-files-level-${level}`);
    if (confirm(`Do you want to lock Classified Files (Level ${level})?`)) {
        files.classList.add("hidden");
        unlockedLevels[`Level ${level}`] = false;
        document.querySelector(`button[onclick="toggleClassifiedFiles(${level})"]`).textContent = `Request Access to Classified Files (Level ${level})`;
    }
}

function toggleAdminFiles() {
    const adminFiles = document.getElementById("admin-files");
    if (!unlockedLevels["Admin"]) {
        unlockAdminFiles();
    } else {
        lockAdminFiles();
    }
}

function lockAdminFiles() {
    const adminFiles = document.getElementById("admin-files");
    if (confirm("Do you want to lock Admin Files?")) {
        adminFiles.classList.add("hidden");
        unlockedLevels["Admin"] = false;
        document.querySelector('button[onclick="toggleAdminFiles()"]').textContent = "Request Access to Admin Files";
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
        const adminFiles = document.getElementById("admin-files");

        files.forEach(file => {
            if (!file.classList.contains("hidden")) {
                file.classList.add("hidden");
                alert("Classified files have been locked due to inactivity.");
            }
        });

        if (!adminFiles.classList.contains("hidden")) {
            adminFiles.classList.add("hidden");
            alert("Admin files have been locked due to inactivity.");
        }
    }, 300000);
}
