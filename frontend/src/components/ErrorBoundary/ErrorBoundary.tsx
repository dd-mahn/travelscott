import React, { Component, ErrorInfo, ReactNode } from "react";
import NotFoundPage from "src/pages/404";

// Define the props interface
interface Props {
  children: ReactNode;
}

// Define the state interface
interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  // Initialize state
  public state: State = {
    hasError: false
  };

  // Update state when an error is thrown
  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // Log error information
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  // Render fallback UI if an error is caught
  public render() {
    if (this.state.hasError) {
      return <NotFoundPage />;
    }

    // Render children components if no error is caught
    return this.props.children;
  }
}

export default ErrorBoundary;
