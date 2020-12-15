import {UPDATE_POSTS} from './actionTypes'

export function fetchPosts() {

    return function (dispatch) {
        const url = `http://codeial.com:8000/api/v2/posts?page=1&limit=5`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log('API Result: ', data);
                // dispatch action to save search results in store
                dispatch(updatePosts(data.data.posts));
            });
    };
}

export function updatePosts(posts) {
    /*console.log("Update");*/
    return {
        type: UPDATE_POSTS,
        payload: posts
    }
}