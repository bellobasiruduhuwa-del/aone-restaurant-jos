import React from "react";

/**
 * Catches any crash in the component tree below it and shows a friendly
 * message with a reload button, instead of leaving the customer staring
 * at a blank white screen with no explanation.
 *
 * This can only be a class component — React's error-boundary feature
 * (getDerivedStateFromError / componentDidCatch) isn't available as a hook.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // Logged to the browser console so it's still possible to diagnose
    // from a screen-share or remote debugging session, even though there's
    // no error-tracking service wired up yet.
    console.error("Unhandled error caught by ErrorBoundary:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-cream text-ink">
          <div className="text-center max-w-sm">
            <p className="text-4xl mb-4">😕</p>
            <h1 className="font-display text-2xl mb-2">Something went wrong</h1>
            <p className="text-ink/60 text-sm mb-6">
              Sorry about that — please reload the page and try again. If this keeps happening,
              let us know.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-jollof text-cream px-6 py-2.5 rounded-full text-sm hover:bg-jollof-dark"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
