import { GetPosts, GetPost, GetUserById, GetComments } from './fetchAPI.js';

document.addEventListener("DOMContentLoaded", () => {
    console.log(GetPosts());

    /*

let filteredUsers = {}

function userCreator(user) {
    return { firstname user.Firstname, lastName: user.LastName, age: user.age }
}

for (user in filteredUSers) {

} */

    //GetInfo()
   //console.log();


})






//working..!
// async function GetInfo() {
//     console.log("getting post..")
//     const p = await GetPost(5);
//     console.log(`<h2>${p.title}</h2><p>${p.body}</p><p><b>${p.reactions.likes}</b></p>
//                      <form method="dialog"><button>Close</button></form>`);//modal.showModal();
// }