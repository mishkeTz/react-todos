import React, { Component } from 'react';

import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';
import Button from 'react-bootstrap/Button';

import Wrapper from '../wrapper';

// Can hook be used here?
const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: false,
        }

        componentWillMount () {
            this.reqInterceptor = axios
                .interceptors.request.use(request => {
                    this.setState({
                        error: false
                    });

                    return request;
                });

            this.resInterceptor = axios
                .interceptors.response.use(res => res, error => {
                    this.setState({
                        error: error
                    });
                });
        }

        componentWillUnmount () {
            axios
                .interceptors.request.eject(this.reqInterceptor);

            axios
                .interceptors.response.eject(this.resInterceptor);
        }

        render () {

            let error = null;

            if (this.state.error) {
                error = (
                    <Modal.Dialog>
                        <Modal.Header closeButton>
                            <Modal.Title>Modal title</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <p>Modal body text goes here.</p>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="secondary">Close</Button>
                            <Button variant="primary">Save changes</Button>
                        </Modal.Footer>
                    </Modal.Dialog>
                );
            }

            return (
                <Wrapper>
                    {error}
                    <WrappedComponent {...this.props} />
                </Wrapper>
            )
        }

    }
}

export default errorHandler;