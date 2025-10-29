let currentPage = window.location.href;
let nav = document.querySelector("nav");

let index = document.getElementById("toindex")
let post = document.getElementById("toposts")
let contact = document.getElementById("tocontact")

if(currentPage == index){
    index.className = "selected-page";   
}
if (currentPage == post) {
    post.className = "selected-page";   

}
if (currentPage == contact) {
    contact.className = "selected-page";   

}
/**<nav>
           <a id="toindex" href="./index.html">Home</a>
            <a id="toposts"href="./posts.html">Posts</a>
            <a id="tocontact"href="./contact.html">Contact</a>
        </nav> */