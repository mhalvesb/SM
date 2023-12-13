const datas = document.querySelector("#birthday");
let valueslength = 0;
let dias;
let meses;
let anos;


datas.addEventListener("input", ()=>{
    datas.value = datas.value.replace(/[^0-9/]/g, '');
    if(valueslength <= datas.value.length){
        switch (datas.value.length){
            case 2:
                dias = datas.value
                datas.value += "/"
            break;
            case 5:
                meses = datas.value.slice(3)
                datas.value += "/"
            break;
            case 10:
                anos = datas.value.slice(6);
                console.log(anos);
            break;
        }
    } else{
        if(datas.value.length == 6 ){
            datas.value = datas.value.slice(4, 4);
        }else if(datas.value.length == 2) {
            datas.value = datas.value.slice(5, 6);
        } else if(datas.value.length == 5){
            datas.value = datas.value.slice(4, 4);
            }
    }

    valueslength = datas.value.length;
    
})