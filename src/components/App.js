import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/posts";
import { Home, Navbar, Page404, Login, Signup } from "./index";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
        </div>

        <Switch>
          <Route
            exact
            path="/"
            render={(props) => {
              return <Home {...props} posts={posts} />;
            }}
          ></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <Route component={Page404}></Route>
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps({posts}) {
  return {
    posts,
  };
}

App.protoType = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
