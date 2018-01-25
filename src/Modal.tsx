import * as React from 'react'
import * as ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')!

interface Props {
    isOpen: boolean
}

export default class Modal extends React.Component<Props, {}> {
    el: HTMLElement

    constructor(props: Props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        modalRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        modalRoot.removeChild(this.el);
    }

    render() {
        return this.props.isOpen ? ReactDOM.createPortal(
            this.props.children,
            this.el,
        ) : null;
    }
}