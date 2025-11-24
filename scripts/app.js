let cards = document.getElementById("cards");
let periodBtns = document.querySelectorAll("[data-period]");
let stuff = [];

async function getData() {
    let r = await fetch("data.json");
    stuff = await r.json();
    showCards("weekly");
}

function showCards(p) {
    cards.innerHTML = "";

    for (let i = 0; i < stuff.length; i++) {
        let t = stuff[i].title;
        let tf = stuff[i].timeframes[p];
        let cur = tf.current;
        let prev = tf.previous;

        let prevTxt = "";
        if (p === "daily") prevTxt = "Yesterday";
        else if (p === "weekly") prevTxt = "Last Week";
        else prevTxt = "Last Month";

        let c = document.createElement("div");
        c.className = "one-card " + t.toLowerCase().replace(" ", "-");

        c.innerHTML =
        "<div class='card-color'></div>" +
        "<div class='card-box'>" +
            "<div class='card-head'>" +
                "<h3>" + t + "</h3>" +
                "<img src='images/icon-ellipsis.svg'>" +
            "</div>" +
            "<div class='hours'>" +
                "<p class='hrs-now'>" + cur + "hrs</p>" +
                "<p class='hrs-before'>" + prevTxt + " - " + prev + "hrs</p>" +
            "</div>" +
        "</div>";

        cards.appendChild(c);
    }
}

for (let i = 0; i < periodBtns.length; i++) {
    periodBtns[i].addEventListener("click", function() {
        for (let j = 0; j < periodBtns.length; j++) {
            periodBtns[j].classList.remove("active");
        }
        this.classList.add("active");
        showCards(this.dataset.period);
    });
}

getData();
