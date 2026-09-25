// ================= MOBILE MENU =================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn.addEventListener("click", function () {

    nav.classList.toggle("active");

});


// Close mobile menu after clicking a navigation link

document.querySelectorAll(".nav a").forEach(function (link) {

    link.addEventListener("click", function () {

        nav.classList.remove("active");

    });

});


// ================= DONOR LOGIN =================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const message =
        document.getElementById("loginMessage");


    if (username !== "" && password !== "") {

        message.textContent =
            "Demo login successful. Real donor authentication requires a secure backend.";

        message.classList.add("success");

    }

});


// ================= PRINT REPORT =================

const printReport =
    document.getElementById("printReport");

printReport.addEventListener("click", function () {

    window.print();

});
