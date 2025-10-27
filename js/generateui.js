import { GetPosts, GetPost, GetUserById, GetComments } from './fetchAPI.js';

let place = document.getElementById("post-grid");
console.log('helloooo?')
LoadPosts();

async function LoadPosts() {
    const posts = await GetPosts(5);

    for (const post of posts) {
        const frag = document.createDocumentFragment();
        const postTemplate = document.getElementById('post-template').content.cloneNode(true);
        const user = await GetUserById(post.userId);

        // Set ID of template
        postTemplate.querySelector(".post").setAttribute("id", post.id);

        // Modify the post template
        postTemplate.querySelector('.post-title').textContent = post.title;
        postTemplate.querySelector('.post-name').textContent = `${user.firstName} ${user.maidenName} ${user.lastName}`;
        postTemplate.querySelector('.post-mail').textContent = user.email;
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

        if (comments.length > 0) {
            commentToggle.innerHTML = `<i class="fa-solid fa-comment icon-in-text"></i> show comments (${comments.length}) <i class="fa-solid fa-caret-down icon-in-text"></i>`;
        } else {
            commentToggle.innerHTML = `<i class="fa-solid fa-comment-slash icon-in-text"></i> no comments under this post`;
        }

        frag.appendChild(postTemplate);
        place.appendChild(frag);

        //create toggle
        

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
        commentTemplate.querySelector('.post-name').textContent = `${user.firstName} ${user.maidenName} ${user.lastName}`;
        commentTemplate.querySelector('.post-mail').textContent = user.email;
        commentTemplate.querySelector('.like-count').textContent = comment.likes;
        commentTemplate.querySelector('.post-text').textContent = comment.body;

        container.appendChild(commentTemplate);
    }
}
