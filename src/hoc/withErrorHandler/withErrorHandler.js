import React, { Component } from 'react';
import { Modal } from './../../components/UI/Modal/Modal';
import Auxilliary from './../Auxilliary/Auxilliary';

export const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null,
      showModal: false,
    };

    componentWillMount() {
      this.requestInterceptor = axios.interceptors.request.use((req) => {
        this.setState({ error: null, showModal: false });
        return req;
      });
      this.responseInterceptor = axios.interceptors.response.use(
        (res) => res,
        (error) => {
          this.setState({ error, showModal: true });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor);
      axios.interceptors.response.eject(this.responseInterceptor);
    }

    setShowModal() {
      this.setState((prevState) => ({ showModal: !prevState.showModal }));
    }

    render() {
      this.setShowModal = this.setShowModal.bind(this);
      const { error, showModal } = this.state;
      return (
        <Auxilliary>
          <Modal showModal={showModal} setShowModal={this.setShowModal}>
            <h2>Something went wrong!</h2>
            <p style={{ fontWeight: 700, color: 'red' }}>
              {error && error.message}
            </p>
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxilliary>
      );
    }
  };
};
