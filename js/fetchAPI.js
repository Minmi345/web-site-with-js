const BASE = 'https://dummyjson.com';
/**
 * @typedef {Object} Post
 * @property {number} id - Unique identifier for the post.
 * @property {string} title - Title of the post.
 * @property {string} body - Content of the post.
 * @property {Array<string>} tags - List of tags associated with the post.
 * @property {Object} reactions - The reactions to the post.
 * @property {number} reactions.likes - Number of likes.
 * @property {number} reactions.dislikes - Number of dislikes.
 * @property {number} views - Total number of views for the post.
 * @property {number} userId - Unique identifier for the user who created the post.
 */

/**
 * @typedef {Object} Address
 * @property {string} address - The street address.
 * @property {string} city - The city of the address.
 * @property {string} country - The country of the address.
 */

/**
 * @typedef {Object} Company
 * @property {string} department - The department of the company.
 * @property {string} name - The name of the company.
 * @property {string} title - The job title.
 * @property {Address} address - The address of the company.
 */

/**
 * @typedef {Object} User
 * @property {number} id - Unique identifier for the user.
 * @property {string} firstName - User's first name.
 * @property {string} lastName - User's last name.
 * @property {string} maidenName - User's maiden name.
 * @property {number} age - User's age.
 * @property {string} gender - User's gender.
 * @property {string} email - User's email address.
 * @property {string} phone - User's phone number.
 * @property {string} username - User's username.
 * @property {string} birthDate - User's birth date.
 * @property {string} image - URL to the user's profile image.
 * @property {string} bloodGroup - User's blood group.
 * @property {number} height - User's height in centimeters.
 * @property {number} weight - User's weight in kilograms.
 * @property {string} eyeColor - User's eye color.
 * @property {string} ip - User's IP address.
 * @property {string} country - User's country.
 * @property {string} macAddress - User's MAC address.
 * @property {string} university - User's university.
 * @property {Company} company - The company information of the user.
 */

/**
 * @typedef {Object} Comment
 * @property {number} id - Unique identifier for the comment.
 * @property {string} body - The content of the comment.
 * @property {number} postId - The identifier of the post to which the comment belongs.
 * @property {number} likes - Total number of likes for the comment.
 * @property {User} user - The user who made the comment.
 */
/**
 * Fetches comments for a specific post.
 * @param {number} postid - The identifier of the post for which to fetch comments.
 * @returns {Promise<Array<Comment>>} A promise that resolves to an array of comment objects.
 * @throws {Error} Throws an error if the fetch request is not successful.
 */
export async function GetComments(postid) {
    const res = await fetch(`${BASE}/comments/post/${postid}`);
    if (!res.ok) throw new Error('No comments?');
    return (await res.json()).comments;
}
/**
 * @param {*} limit 
 * @returns {Promise<Array<Post>>}
 */

//https://dummyjson.com/posts?limit=10&skip=0
export async function GetPosts(limit = 1, skip=0) {
    const res = await fetch(`${BASE}/posts?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    return (await res.json()).posts;
}
export async function GetPost(id = 1) {
    const res = await fetch(`${BASE}/posts/${id}`);
    if (!res.ok) throw new Error('Failed to fetch post');
    return res.json();
}

export async function GetUserById(id) {
    const res = await fetch(`${BASE}/users/${id}`);
    //filter?key=hair.color&value=Brown
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
}




