import React, { useState } from 'react';

export const PostForm = ({ posts, setPosts }) => {

    const [state, setState] = useState('')

    return (
        <form onSubmit={(e) => setPosts(prevState => [state, ...prevState])}>
            <input
                type="text"
                value={state}
                name="post"
                placeholder="what's on your mind?"
                onChange={e => { setState(e.target.value) }}
                required
            />
            <br />
            <button>Post</button>
        </form>
    )

}