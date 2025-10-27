import { GetPosts, GetPost, GetUserById, GetComments } from './fetchAPI.js';

let place = document.getElementById("post-grid");
console.log('helloooo?')
LoadPosts();

async function LoadPosts() {
    let posts;
    try {

        posts = await GetPosts(5);
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


        //postTemplate.appendChild(await LoadUser( await GetUserById(post.userId)));


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
            //commentToggle.innerHTML = `<i class="fa-solid fa-comment icon-in-text"></i> show comments (${comments.length}) <i class="fa-solid fa-caret-down icon-in-text"></i>`;
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
        await LoadComments(post.id);
    }
}

async function LoadComments(postId) {
    const comments = (await GetComments(postId));
    const container = document.querySelector(`.post#\\3${postId}`).querySelector(".comments-container");

    for (const comment of comments) {
        const commentTemplate = document.getElementById('comment-template').content.cloneNode(true);
        const user = await GetUserById(comment.user.id);

        // Modify the comment template
        //commentTemplate.appendChild(await LoadUser(await GetUserById(post.userId)));

        commentTemplate.querySelector('.like-count').textContent = comment.likes;
        commentTemplate.querySelector('.post-text').textContent = comment.body;

        container.appendChild(commentTemplate);
    }
}

async function LoadUser(user) {
    const userTemplate = document.getElementById('user-template').content.cloneNode(true);
    userTemplate.querySelector('.post-name').textContent = `${user.firstName} ${user.maidenName} ${user.lastName}`;
    userTemplate.querySelector('.post-img').src = user.image;
    userTemplate.querySelector('.post-mail').textContent = user.email;
    
}
