import { GetPosts, GetPost, GetUserById, GetComments } from './fetchAPI.js';

let place = document.getElementById("post-grid");
console.log('helloooo?')
LoadPosts();

//console.log(place)
//LoadPosts();

/*async function LoadPosts() {
    let UglyJSONposts = await GetPosts(3);
    let posts = UglyJSONposts.posts;
    const frag = document.createDocumentFragment(); //stolen from l10
    console.log("-----------");


    //frag.append(place);

    console.log('sleepy')

    ////////////////////////////

    for (let post of posts) {

        let postElement = document.createElement("div");
        postElement.className = "post";
        place.appendChild(postElement);

        let titleEl = document.createElement("p");
        titleEl.className = "post-title";
        titleEl.textContent = post.title;
        postElement.appendChild(titleEl);

        //add user
        let user = await GetUserById(post.userId);

        let userDiv = document.createElement("div");
        userDiv.className = "post-user";
        postElement.appendChild(titleEl);

        //should remake it!
        let userimg = document.createElement("div");
        userimg.className = "post-img";
        userDiv.appendChild(userDiv);

        let userTextsDiv = document.createElement("div");
        userTextsDiv.className = "post-user-texts";
        userDiv.appendChild(userTextsDiv);

        let userName = document.createElement("p");
        userName.className = "post-name";
        userName.textContent = user.firstName + " " + user.maidenName + " " + user.lastName;
        userTextsDiv.appendChild(userName);

        let useremail = document.createElement("p");
        useremail.className = "post-email";
        useremail.textContent = user.email;
        userTextsDiv.appendChild(useremail);

        let bodytext = document.createElement("p");
        bodytext.className = "post-text";
        bodytext.textContent = post.body;
        postElement.appendChild(bodytext);

        let tagsDiv = document.createElement("div");
        tagsDiv.className = "post-tags";
        postElement.appendChild(tagsDiv);

        for (let tag of post.tags) {
            let tagel = document.createElement(div);
            tagel.className = "post-details";
            tagel.textContent = tag;
            tagsDiv.appendChild(tagel);

        }


        let reactionsDiv = document.createElement("div");
        reactionsDiv.className = "post-reactions";
        postElement.appendChild(reactionsDiv);

        let likeel = document.createElement(div);
        likeel.className = "post-details";
        likeel.textContent = tag;
        reactionsDiv.appendChild(likeel);

        ///////////////////

        console.log(`likes: ${post.reactions?.likes ?? "Reactions not available"}`);
        console.log(`dislikes: ${post.reactions?.dislikes ?? "Reactions not available"}`);
        console.log(post.views);



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


async function LoadPosts() {
    let UglyJSONposts = await GetPosts(16);
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
        userDiv.appendChild(userImg); // Corrected here

        let userTextsDiv = document.createElement("div");
        userTextsDiv.className = "post-user-texts";
        userDiv.appendChild(userTextsDiv);

        let userName = document.createElement("p");
        userName.className = "post-name";
        userName.textContent = `${user.firstName} ${user.maidenName} ${user.lastName}`;
        userTextsDiv.appendChild(userName);

        let userEmail = document.createElement("p");
        userEmail.className = "post-mail"; // Corrected class name
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

        let commentToggle = document.createElement("div");
        commentToggle.innerHTML = `<i class="fa-solid fa-comment icon-in-text"></i> show comments (${post.commentsCount}) <i class="fa-solid fa-caret-down icon-in-text"></i>`;
        commentSection.appendChild(commentToggle);

        // Append postElement to fragment and then to the container
        frag.appendChild(postElement);
    }

    place.appendChild(frag);
}




/*<div class="post">
            <div>
                <p class="post-title">Title</p>
                <div class="post-user">
                    <div class="post-img"></div>
                    <div class="post-user-texts">
                        <p class="post-name">Maxwell Bebebe</p>
                        <p class="post-mail">Maxwell@work.ua</p>
                    </div>
                </div>
                <p class="post-text"></p>
                <div class="post-tags">
                    <div class="post-details">tag1</div>
                </div>
                <div class="post-reactions">

                    <div class="post-details">
                        <i class="fa-solid fa-thumbs-up"></i>
                        34
                    </div>

                    <div class="post-details">
                        <i class="fa-solid fa-thumbs-down"></i>
                        13
                    </div>

                    <div class="post-details">
                        <i class="fa-solid fa-vr-cardboard"></i>
                        537
                    </div>
                </div>
            </div>
            <div class="post-comment-section">
                <div>
                    <i class="fa-solid fa-comment icon-in-text"></i>
                    show comments (34)
                    <i class="fa-solid fa-caret-down icon-in-text"></i>
                </div>
            </div>
        </div> */
