import { GetPosts, GetPost, GetUserById, GetComments } from './fetchAPI.js';

let place = document.getElementById("post-grid");
let skip = 0;

/**
 * @typedef {import('./fetchAPI.js').Post} Post
 */

export async function LoadPosts() {
    let posts;
    try {

        let load = 6;
        posts = await GetPosts(load, skip);
        skip += load
    }
    catch {
        const goose = document.querySelector(".error-status");
        goose.setAttribute("id", "error-active");
    }

    const frag = document.createDocumentFragment();
    for (const post of posts) {
        const postTemplate = document.getElementById('post-template').content.cloneNode(true);

        // Set ID of template
        postTemplate.querySelector(".post").setAttribute("id", post.id);

        // Modify the post template
        postTemplate.querySelector('.post-title').textContent = post.title;


        postTemplate.querySelector(".post-user").appendChild(await LoadUser(await GetUserById(post.userId)));

        postTemplate.querySelector('.post-text').textContent = post.body;

        // Append tags
        const tagsContainer = postTemplate.querySelector('.post-tags');
        post.tags.forEach(tag => {
            const tagEl = document.createElement('div');
            tagEl.className = 'post-details';
            tagEl.textContent = tag;
            tagsContainer.appendChild(tagEl);
        });

        // Append reactions
        const reactionsContainer = postTemplate.querySelector('.post-reactions');
        reactionsContainer.querySelector('#thumbs-up #content').textContent = post.reactions?.likes || 0;
        reactionsContainer.querySelector('#thumbs-down #content').textContent = post.reactions?.dislikes || 0;
        reactionsContainer.querySelector('#views #content').textContent = post.views || 0;

        // Setting up comment section
        const comments = await GetComments(post.id);
        const commentToggle = postTemplate.querySelector('.comment-toggle');

        const yesComm = postTemplate.querySelector(".yes-comments");
        const noComm = postTemplate.querySelector(".no-comments");

        if (comments.length > 0) {
            const numscomments = postTemplate.querySelector('#number-comments').textContent = comments.length;
            noComm.style.display = "none";
        } else {
            yesComm.style.display = "none";

        }



        frag.appendChild(postTemplate);

        //create toggle

        //Hide comments(<span class="comment-count"></span>)
        //    < i class="fa-solid fa-caret-up icon-in-text" ></i >

    }

    place.appendChild(frag);

    for (let post of posts) {
        await LoadComments(post);
    }
}

/**
 * Fetches comments for a specific post.
 * @param {Post} post - The identifier of the post for which to fetch comments.
 * @returns {Promise<Any>} A promise that resolves to an array of comment objects.
 * @throws {Error} Throws an error if the fetch request is not successful.
 */
async function LoadComments(post) {
    const comments = (await GetComments(post.id));
    const container = document.querySelector(`.post#\\3${post.id}`).querySelector(".comments-container");

    for (const comment of comments) {
        const commentTemplate = document.getElementById('comment-template').content.cloneNode(true);
        
        const usercontainer = commentTemplate.querySelector('.comment-header');        
        usercontainer.appendChild(await LoadUser(await GetUserById(post.userId)));

        commentTemplate.querySelector('.like-count').textContent = comment.likes;
        commentTemplate.querySelector('.post-text').textContent = comment.body;

        container.appendChild(commentTemplate);
    }
}

async function LoadUser(user) {
    const userTemplate = document.getElementById('user-template').content.cloneNode(true);

    // Set ID of template
    userTemplate.querySelector('.post-user').setAttribute("id", user.id);


    userTemplate.querySelector('.post-name').textContent = `${user.firstName} ${user.maidenName} ${user.lastName}`;
    userTemplate.querySelector('.post-img').src = user.image;
    userTemplate.querySelector('.post-mail').textContent = user.email;
    return userTemplate
}
