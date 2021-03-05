import React, { Component } from "react";
import axios from "axios";

import AddPost from "../components/AddPost/AddPost";
import PostsList from "../components/PostsList/PostsList";
import FindPeople from "../components/FindPeople/FindPeople";
import RefreshButton from "../components/SharedUi/RefreshButton/RefreshButton";

import withContexts from "../hocs/withContexts";
import catchErrors from "../utils/catchErrors";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.fetchNewsFeed = this.fetchNewsFeed.bind(this);

    this.state = { posts: null };
  }

  async fetchNewsFeed() {
    this.props.appUi.startLoading();
    try {
      const response = await axios({
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/posts/newsfeed`,
        headers: {
          Authorization: `Bearer ${this.props.appAuth.token}`,
        },
      });

      this.props.appUi.stopLoading();
      this.setState({ posts: response.data.data.newsfeed });
    } catch (err) {
      this.props.appUi.stopLoading();
      catchErrors(err, this.props.appAuth);
    }
  }

  componentDidMount() {
    this.fetchNewsFeed();
  }

  render() {
    return (
      <div className="app">
        <main>
          <AddPost refresh={this.fetchNewsFeed} />
          <RefreshButton onClick={this.fetchNewsFeed} />
          {this.state.posts && <PostsList posts={this.state.posts} refresh={this.fetchNewsFeed} />}
        </main>
        <FindPeople />
      </div>
    );
  }
}

export default withContexts(HomePage);
