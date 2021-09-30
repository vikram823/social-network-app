import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/posts";
import { Home, Navbar, Page404, Login, Signup, Settings } from "./index";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { Redirect } from "react-router";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import UserProfile from "./UserProfile";
import { fetchUserFriends } from "../actions/friends";

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = getAuthTokenFromLocalStorage();

    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchUserFriends());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;
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
              return (
                <Home
                  {...props}
                  posts={posts}
                  friends={friends}
                  isLoggedIn={auth.isLoggedIn}
                />
              );
            }}
          ></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route exact path="/signup" component={Signup}></Route>
          <PrivateRoute
            path="/settings"
            component={Settings}
            isLoggedIn={auth.isLoggedIn}
          />
          <PrivateRoute
            path="/user/:userId"
            component={UserProfile}
            isLoggedIn={auth.isLoggedIn}
          />
          <Route component={Page404}></Route>
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps({ posts, auth, friends }) {
  return {
    posts,
    auth,
    friends
  };
}

App.protoType = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
