

let buttonComment = document.querySelectorAll("#coment");
let closeComent = document.querySelectorAll(".closecoment");
const section = document.querySelector("section");

for(let b of closeComent){
    b.addEventListener("click", ()=>{
     b.parentNode.parentNode.style.display = "none";
    })
}
for(let i of buttonComment){
    i.addEventListener("click", ()=>{
        i.parentNode.parentNode.querySelector(".comentfull").style.display = "flex";
        let id = document.getElementById("postsid");
    });
}




