import { GetPosts, GetPost, GetUserById, GetComments } from './fetchAPI.js';

async function GetInfo() {
    let posts = await GetPosts();
    console.log(posts);
    console.log("-----------");

    posts = posts.posts

    for (let post of posts) {
        console.log(post);
        console.log("IM WORKING");

        console.log(post.title);
        console.log(post.body);
        for (let tag of post.tags) {
            console.log(tag);
        }
        console.log(`likes: ${post.reactions?.likes ?? "Reactions not available"}`);
        console.log(`dislikes: ${post.reactions?.dislikes ?? "Reactions not available"}`);
        console.log(post.views);

        //user stuff

        let user = await GetUserById(post.userId);
        console.log(user.firstName + user.maidenName + user.lastName);
        console.log(user.email);

        let UglyJSONcomments = await GetComments(post.id);
        let comments = UglyJSONcomments.comments;

        let i = 0;
        for (let comment of comments) {
            console.log(`-------comment ${i}`);
            i++;
            console.log(comment.body);
            console.log(comment.likes);
            let user = await GetUserById(comment.user.id);
            console.log(user.firstName + user.maidenName + user.lastName);
            console.log(user.email);

        }
    }
}

async function GetUserInfo(id){
    let user = await GetUserById(id);
    return {firstName:user.firstName}
}
/* 
let myPeeps{
    "users": [
        json copypasta
    ]
}

let filteredUsers = {}

function userCreator(user) {
    return { firstname user.Firstname, lastName: user.LastName, age: user.age }
}

for (user in filteredUSers) {

} */

