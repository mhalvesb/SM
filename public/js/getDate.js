

let p = document.querySelector(".infos .date");
let date = new Date(p.innerText);

const mes = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro"
]

p.innerText = `Criado em ${date.getDate()} de ${mes[date.getMonth()]} de ${date.getFullYear()}`;
const header = document.querySelector("header");
header.style.display = "inline-block";