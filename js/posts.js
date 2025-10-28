import { LoadPosts } from './generateui.js';

document.addEventListener("DOMContentLoaded", () => {
    LoadPosts();


})

let btn = document.getElementById("load-more").addEventListener("click",MorePosts);
let uinfo = document.getElementById("user-info-bg");

uinfo.addEventListener("click",Hide);

function MorePosts(){
    LoadPosts();
}

function Hide(){
    uinfo.style.display = "none";

}

//working..!
// async function GetInfo() {
//     console.log("getting post..")
//     const p = await GetPost(5);
//     console.log(`<h2>${p.title}</h2><p>${p.body}</p><p><b>${p.reactions.likes}</b></p>
//                      <form method="dialog"><button>Close</button></form>`);//modal.showModal();
// }