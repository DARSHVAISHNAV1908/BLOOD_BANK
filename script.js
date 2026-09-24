document.addEventListener("DOMContentLoaded", function () {

    /* ================= MOBILE MENU ================= */

    const menuBtn = document.getElementById("menuBtn");
    const navbar = document.getElementById("navbar");

    if (menuBtn && navbar) {
        menuBtn.addEventListener("click", function () {
            navbar.classList.toggle("show");
        });

        document.querySelectorAll(".navbar a").forEach(function (link) {
            link.addEventListener("click", function () {
                navbar.classList.remove("show");
            });
        });
    }


    /* ================= NOTIFICATION ================= */

    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notificationText");
    const closeNotification = document.getElementById("closeNotification");
    let notificationTimer = null;

    function showNotification(message) {
        if (!notification || !notificationText) {
            return;
        }

        notificationText.textContent = message;
        notification.classList.add("show");

        if (notificationTimer) {
            clearTimeout(notificationTimer);
        }

        notificationTimer = setTimeout(function () {
            notification.classList.remove("show");
        }, 4000);
    }

    if (closeNotification) {
        closeNotification.addEventListener("click", function () {
            notification.classList.remove("show");
            if (notificationTimer) {
                clearTimeout(notificationTimer);
            }
        });
    }


    /* ================= DARK MODE ================= */

    const darkModeBtn = document.getElementById("darkModeBtn");

    if (darkModeBtn) {
        darkModeBtn.addEventListener("click", function () {
            document.body.classList.toggle("dark-mode");

            if (document.body.classList.contains("dark-mode")) {
                darkModeBtn.textContent = "☀️";
                showNotification("Dark mode enabled.");
            } else {
                darkModeBtn.textContent = "🌙";
                showNotification("Light mode enabled.");
            }
        });
    }


    /* ================= BLOOD SEARCH ================= */

    const bloodSearch = document.getElementById("bloodSearch");
    const searchBloodBtn = document.getElementById("searchBloodBtn");
    const bloodCards = document.querySelectorAll(".blood-group-card");

    function searchBlood() {
        if (!bloodSearch) {
            return;
        }

        const searchValue = bloodSearch.value.trim().toUpperCase();
        let found = false;

        bloodCards.forEach(function (card) {
            const group = card.getAttribute("data-group");

            if (searchValue === "" || group === searchValue || group.includes(searchValue)) {
                card.style.display = "block";
                found = true;
            } else {
                card.style.display = "none";
            }
        });

        if (searchValue !== "" && found) {
            showNotification("Blood group " + searchValue + " found.");
        } else if (searchValue !== "" && !found) {
            showNotification("No matching blood group found.");
        }
    }

    if (searchBloodBtn) {
        searchBloodBtn.addEventListener("click", searchBlood);
    }

    if (bloodSearch) {
        bloodSearch.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                searchBlood();
            }
        });
    }


    /* ================= DOWNLOAD REPORT ================= */

    const downloadReportBtn = document.getElementById("downloadReportBtn");

    if (downloadReportBtn) {
        downloadReportBtn.addEventListener("click", function () {
            const report = `
SHREEJI BLOOD BANK
=============================

BLOOD TEST REPORT

Donor Name: Darsh Vaishnav
Date: 23/09/2026

Blood Group: O+
Hemoglobin: 14.2 g/dL
Blood Pressure: 120/80 mmHg
Blood Sugar: 92 mg/dL
Pulse: 74 bpm

=============================

This is a demo report generated
for the Shreeji Blood Bank website.

It is not a medical diagnosis.
`;

            const blob = new Blob([report], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = "Shreeji_Blood_Report.txt";

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);

            showNotification("Blood report downloaded successfully.");
        });
    }


    /* ================= PRINT REPORT ================= */

    const printReportBtn = document.getElementById("printReportBtn");

    if (printReportBtn) {
        printReportBtn.addEventListener("click", function () {
            window.print();
        });
    }


    /* ================= REGISTRATION ================= */

    const registrationForm = document.getElementById("registrationForm");
    const registrationMessage = document.getElementById("registrationMessage");

    if (registrationForm && registrationMessage) {
        registrationForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = document.getElementById("donorName").value.trim();
            const blood = document.getElementById("donorBlood").value;
            const date = document.getElementById("donationDate").value;
            const time = document.getElementById("donationTime").value;

            const condition1 = document.getElementById("condition1").checked;
            const condition2 = document.getElementById("condition2").checked;
            const condition3 = document.getElementById("condition3").checked;

            if (name === "") {
                registrationMessage.textContent = "Please enter your name.";
                registrationMessage.style.color = "#c9182b";
                return;
            }

            if (blood === "") {
                registrationMessage.textContent = "Please select your blood group.";
                registrationMessage.style.color = "#c9182b";
                return;
            }

            if (date === "") {
                registrationMessage.textContent = "Please select a donation date.";
                registrationMessage.style.color = "#c9182b";
                return;
            }

            if (time === "") {
                registrationMessage.textContent = "Please select a donation time.";
                registrationMessage.style.color = "#c9182b";
                return;
            }

            if (!condition1 || !condition2 || !condition3) {
                registrationMessage.textContent = "Please confirm all pre-donation conditions.";
                registrationMessage.style.color = "#c9182b";
                return;
            }

            registrationMessage.textContent =
                "Registration successful! Thank you, " +
                name +
                ". Your preferred donation time is " +
                date +
                " at " +
                time +
                ".";

            registrationMessage.style.color = "#168a45";
            showNotification("Donation registration completed successfully!");
            registrationForm.reset();
        });
    }


    /* ================= LOGIN ================= */

    const loginForm = document.getElementById("loginForm");
    const loginMessage = document.getElementById("loginMessage");

    if (loginForm && loginMessage) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const email = document.getElementById("loginEmail").value.trim();
            const password = document.getElementById("loginPassword").value.trim();

            if (email === "" || password === "") {
                loginMessage.textContent = "Please enter email and password.";
                loginMessage.style.color = "#c9182b";
                return;
            }

            loginMessage.textContent = "Demo login successful! Welcome back.";
            loginMessage.style.color = "#168a45";
            showNotification("Welcome back! Demo login successful.");
        });
    }


    /* ================= REMINDER ================= */

    const reminderBtn = document.getElementById("reminderBtn");

    if (reminderBtn) {
        reminderBtn.addEventListener("click", function () {
            showNotification("Reminder set! Please contact the blood bank before your donation.");
        });
    }


    /* ================= BACK TO TOP ================= */

    const backToTop = document.getElementById("backToTop");

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 500) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }


    /* ================= SMOOTH SCROLL ================= */

    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = this.getAttribute("href");

            if (targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();
                target.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    /* ================= MINIMUM DONATION DATE ================= */

    const donationDate = document.getElementById("donationDate");

    if (donationDate) {
        const today = new Date().toISOString().split("T")[0];
        donationDate.setAttribute("min", today);
    }

});
