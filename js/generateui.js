import { GetPosts, GetPost, GetUserById, GetComments } from './fetchAPI.js';

let place = document.getElementById("post-grid");
console.log('helloooo?')
LoadPosts();

async function LoadPosts() {
    let UglyJSONposts = await GetPosts(5);
    let posts = UglyJSONposts.posts;
    const frag = document.createDocumentFragment();

    for (let post of posts) {
        let postElement = document.createElement("div");
        postElement.className = "post";

        let titleEl = document.createElement("p");
        titleEl.className = "post-title";
        titleEl.textContent = post.title;
        postElement.appendChild(titleEl);

        // Add user info
        let user = await GetUserById(post.userId);

        let userDiv = document.createElement("div");
        userDiv.className = "post-user";
        postElement.appendChild(userDiv);

        let userImg = document.createElement("div");
        userImg.className = "post-img";
        userDiv.appendChild(userImg);

        let userTextsDiv = document.createElement("div");
        userTextsDiv.className = "post-user-texts";
        userDiv.appendChild(userTextsDiv);

        let userName = document.createElement("p");
        userName.className = "post-name";
        userName.textContent = `${user.firstName} ${user.maidenName} ${user.lastName}`;
        userTextsDiv.appendChild(userName);

        let userEmail = document.createElement("p");
        userEmail.className = "post-mail";
        userEmail.textContent = user.email;
        userTextsDiv.appendChild(userEmail);

        let bodyText = document.createElement("p");
        bodyText.className = "post-text";
        bodyText.textContent = post.body;
        postElement.appendChild(bodyText);

        let tagsDiv = document.createElement("div");
        tagsDiv.className = "post-tags";
        postElement.appendChild(tagsDiv);

        for (let tag of post.tags) {
            let tagEl = document.createElement("div");
            tagEl.className = "post-details";
            tagEl.textContent = tag;
            tagsDiv.appendChild(tagEl);
        }

        let reactionsDiv = document.createElement("div");
        reactionsDiv.className = "post-reactions";
        postElement.appendChild(reactionsDiv);

        // Dynamic creation of reaction elements
        let createReactionElement = (iconClass, count) => {
            let reactionEl = document.createElement("div");
            reactionEl.className = "post-details";
            let icon = document.createElement("i");
            icon.className = iconClass;
            reactionEl.appendChild(icon);
            reactionEl.appendChild(document.createTextNode(` ${count}`));
            return reactionEl;
        };

        reactionsDiv.appendChild(createReactionElement("fa-solid fa-thumbs-up", post.reactions?.likes || 0));
        reactionsDiv.appendChild(createReactionElement("fa-solid fa-thumbs-down", post.reactions?.dislikes || 0));
        reactionsDiv.appendChild(createReactionElement("fa-solid fa-vr-cardboard", post.views || 0));

        let commentSection = document.createElement("div");
        commentSection.className = "post-comment-section";
        postElement.appendChild(commentSection);

        let comments = await GetComments(post.id);
        console.log()

        let commentToggle = document.createElement("div");
        console.log(comments.total)
        if (comments.total > 0){
            commentToggle.innerHTML = `<i class="fa-solid fa-comment icon-in-text"></i> show comments (${comments.total}) <i class="fa-solid fa-caret-down icon-in-text"></i>`;
            LoadComments(postid)
        }
        else {
            commentToggle.innerHTML = `<i class="fa-solid fa-comment-slash icon-in-text"></i> no comments under this post`;
        }
        commentSection.appendChild(commentToggle);


        //COMMENTS!!!

        // Append postElement to fragment and then to the container
        frag.appendChild(postElement);
    }

    place.appendChild(frag);
}

async function LoadComments(postid){

    let comments = await GetComments(post.id)

    //let i = 0;
    for (let comment of comments) {
        //console.log(`-------comment ${i}`);
        //i++;

        function createCommentSection() {
            // Create the main section element
            const commentSection = document.createElement("section");
            commentSection.className = "post-comment";
            //hiddenDiv.style.display = "none";

            // Create the comment header
            const commentHeader = document.createElement("div");
            commentHeader.className = "comment-header";

            // Create the user info div
            const postUserDiv = document.createElement("div");
            postUserDiv.className = "post-user";

            // Create the user image div
            const userImgDiv = document.createElement("div");
            userImgDiv.className = "post-img";
            postUserDiv.appendChild(userImgDiv);

            // Create the user texts div
            const userTextsDiv = document.createElement("div");
            userTextsDiv.className = "post-user-texts";

            // Create the user name paragraph
            const userName = document.createElement("p");
            userName.className = "post-name";
            userName.textContent = "Maxwell Bebebe"; // Change as needed
            userTextsDiv.appendChild(userName);

            // Create the user email paragraph
            const userEmail = document.createElement("p");
            userEmail.className = "post-mail";
            userEmail.textContent = "Maxwell@work.ua"; // Change as needed
            userTextsDiv.appendChild(userEmail);

            // Append user texts div to user div
            postUserDiv.appendChild(userTextsDiv);

            // Append user div to comment header
            commentHeader.appendChild(postUserDiv);

            // Create the post details div for reactions
            const postDetailsDiv = document.createElement("div");
            postDetailsDiv.className = "post-details";

            // Create the thumbs-up icon
            const thumbsUpIcon = document.createElement("i");
            thumbsUpIcon.className = "fa-solid fa-thumbs-up";
            postDetailsDiv.appendChild(thumbsUpIcon);

            // Create the thumbs-up count text
            const thumbsUpCount = document.createTextNode(comment.likes);
            postDetailsDiv.appendChild(thumbsUpCount);

            // Append post details to comment header
            commentHeader.appendChild(postDetailsDiv);

            // Append the comment header to the section
            commentSection.appendChild(commentHeader);

            // Create the comment text paragraph
            const postText = document.createElement("p");
            postText.className = "post-text";
            postText.textContent = comment.body;
            commentSection.appendChild(postText);

            // Append the comment section to the desired container
            const container = document.getElementById("comments-container"); // Ensure this ID is present in your HTML
            container.appendChild(commentSection);
        }

        // Call the function to create the comment section
        createCommentSection();

        console.log(comment.body);
        console.log(comment.likes);
        let user = await GetUserById(comment.user.id);
        console.log(user.firstName + user.maidenName + user.lastName);
        console.log(user.email);

    }

}