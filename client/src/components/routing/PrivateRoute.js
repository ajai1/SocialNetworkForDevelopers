import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  const pageToLoad = (props) => {
    if (!isAuthenticated && !loading) {
      return <Redirect to="/login" />;
    } else {
      return <Component {...props} />;
    }
  };
  return <Route {...rest} render={(props) => pageToLoad(props)} />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
