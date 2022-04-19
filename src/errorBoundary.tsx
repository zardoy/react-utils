import React from 'react'

type Props = {
    children?: React.ReactNode
    renderError?: (error: Error) => React.ReactNode
}

// TODO! use that modal from vite as default
export default class ErrorBoundary extends React.Component<Props, { error: Error | undefined }> {
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
