import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can customize the fallback UI here
      return <div className='text-center'><h1>Something went wrong.</h1></div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
