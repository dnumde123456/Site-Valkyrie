        function redirectBasedOnDevice() {
            var mobileUrl = "mobile.html";
            var desktopUrl = "pc.html";

            if (/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = mobileUrl;
            } else {
                window.location.href = desktopUrl;
            }
        }

        window.onload = redirectBasedOnDevice;