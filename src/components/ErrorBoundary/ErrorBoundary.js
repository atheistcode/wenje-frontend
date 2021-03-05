import React, { Component } from "react";

import "./ErrorBoundary.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h1>Oops!</h1>
          <h2>We can't seem to find the page you are looking for.</h2>
          <img src={require("./404.png")} alt="404 error" className="error-boundary__image"></img>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;
