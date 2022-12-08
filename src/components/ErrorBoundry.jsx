import { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        const { hasError } = this.state;
        const { children } = this.props;

        if (hasError) {
            return <h1>Your app crashed, Babul ! Dont code like a nonsense !!</h1>;
        }

        return children;
    }
}

export default ErrorBoundary;
