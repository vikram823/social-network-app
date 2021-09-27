import React from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/posts";
import { Home, Navbar, Page404, Login, Signup } from "./index";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import * as jwt_decode from 'jwt-decode';
import jwt_decode from "jwt-decode";
import { authenticateUser } from "../actions/auth";
import { Redirect } from "react-router";

const Settings = () => {
  return <div>Settings</div>;
};

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;

  return (
    <Route
      path={path}
      render={(props) => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />;
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());

    const token = localStorage.getItem("token");

    if (token) {
      const user = jwt_decode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }

  render() {
    const { posts, auth } = this.props;
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
          <PrivateRoute
            path="/settings"
            component={Settings}
            isLoggesdIn={auth.isLoggesdIn}
          ></PrivateRoute>
          <Route component={Page404}></Route>
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps({ posts, auth }) {
  return {
    posts,
    auth,
  };
}

App.protoType = {
  posts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(App);
