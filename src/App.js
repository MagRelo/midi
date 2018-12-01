import React, { Component } from 'react';
import { connect } from 'react-redux';

import './App.css';

import Controller from './controller/Controller';

class App extends Component {
  render() {
    return (
      <div className="App">
        <section id="home">
          <header>
            <h1 className="title">WebMIDI Fighter 3D</h1>
            <p>
              Connect your{' '}
              <a
                href="https://www.midifighter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                MIDIFighter 3D
              </a>{' '}
              to your computer and play live on on the web.
            </p>
          </header>

          <Controller samples={this.props.samples} />
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    samples: state.controller.samples,
    controllerEnabled: state.controller.controllerEnabled,
    controllerName: state.controller.controllerName
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // cancelBid: index => {
    //   dispatch(cancelBid(index));
    // }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
