let date = document.querySelectorAll(".data");
const header = document.querySelector("header");
header.style.display = "inline-block";


const datas = [
    31,
    29,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31
]


for(let i in date){
    const mes = new Date(date[i].innerText).getMonth();
    const dia = new Date(date[i].innerText).getDate();
    const calcDias = datas[mes] - dia + new Date().getDate();

    const minutos = new Date(date[i].innerText).getMinutes();
    const calcMinutes = new Date().getMinutes() >= minutos;
    

    const segundos = new Date(date[i].innerText).getSeconds();
    const calcSeconds = new Date().getSeconds() >= segundos;

    let month = `${Math.abs(mes - new Date().getMonth())}`
    let days = `${Math.abs(new Date(date[i].innerText).getDate() - new Date().getDate())}`
    let hours = `${Math.abs(new Date(date[i].innerText).getHours() - new Date().getHours())}`
    let minutes = `${Math.abs(new Date(date[i].innerText).getMinutes() - new Date().getMinutes())}`
    let seconds = `${Math.abs(new Date(date[i].innerText).getSeconds() - new Date().getSeconds())}`
    
    if(month == 1 && calcDias >= datas[mes]){
        date[i].innerText = `Postado há um mês`
    } else if(month == 1 && calcDias < datas[mes]){
        date[i].innerText = `Postado há ${calcDias} dias`
    } else if(month > 1){
        date[i].innerText = `Postado há ${month} meses`
    } else if(month == 0 && days != 0){
        date[i].innerText = `Postado há ${days} dias`
    }else if(hours == 1 && calcMinutes){
       date[i].innerText = `Postado há ${hours} hora`
    } else if(hours > 1){
       date[i].innerText = `Postado há ${hours} horas`
    }else if(hours == 1 && minutes > 1){
       date[i].innerText = `Postado há ${Math.abs(minutes - 60)} minutos`
     } else if(minutes == 1 && calcSeconds){
        date[i].innerText = `Postado há ${minutes} minuto`
    } else if(minutes > 1){
        date[i].innerText = `Postado há ${minutes} minutos`
    } else if(!calcSeconds){
        date[i].innerText = `Postado há ${Math.abs(seconds - 60)} segundos`
    } else{
        date[i].innerText = `Postado há ${seconds} segundos`
    }

}


