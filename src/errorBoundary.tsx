import React from 'react'

// TODO! use that modal from vite as default
export default class ErrorBoundary extends React.Component<{ renderError?: (error: Error) => React.FC }, { error: Error | undefined }> {
    override state = {
        error: undefined,
    }

    override componentDidCatch(error) {
        this.setState({ error })
    }

    override render() {
        if (this.state.error) return this.props.renderError ? this.props.renderError(this.state.error) : <h1>App Crashed!</h1>

        return this.props.children
    }
}
