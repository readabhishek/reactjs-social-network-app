import React, {Component} from 'react';
import PostsList from "./PostsList";

class Home extends Component {
    render() {
        return (
                <PostsList posts={this.props.posts} />
                );
    }
}

export default Home;
