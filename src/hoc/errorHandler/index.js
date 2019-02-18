import React, { Component } from 'react';

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
            return (
                <Wrapper>
                    {/* Handle error */}
                    <WrappedComponent {...this.props} />
                </Wrapper>
            )
        }

    }
}