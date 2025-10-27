import { GetPosts, GetPost, GetUserById, GetComments } from './fetchAPI.js';

/*
async function GetInfoPosts() {
    let UglyJSONposts = await GetPosts(1);
    let posts = UglyJSONposts.posts;
    for (let post of posts) {
        
     //   dictionary["key1"] = "value1";
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
}*/

/**
 * Retrieves a user's first and last names, along with their maiden name.
 * @param {number} id - The unique identifier for the user.
 * @returns {Promise<{firstName: string, maidenName: string, lastName: string}>} A promise that resolves to an object containing the user's names.
 * @throws {Error} Throws an error if the user cannot be retrieved.
 */
async function GetUserDetailedInfo(id){
    let user = await GetUserById(id);
    return {firstName:user.firstName, maidenName:user.maidenName, lastName:user.lastName, email:user.email, 
        birthDate: user.birthDate, image:user.image, bloodGroup:user.bloodGroup, country: user.adress.country}
}

async function GetUserInfo(id) {
    let user = await GetUserById(id);
    return {
        firstName: user.firstName, maidenName: user.maidenName, lastName: user.lastName, 
        email: user.email, image: user.image}
}