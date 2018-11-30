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
            <h1 className="title">(Web) MIDI Fighter 3D</h1>
            <p>
              Connect any MIDI instrument to your computer and play live on on
              the web.
            </p>
          </header>

          <div className="app-grid">
            <Controller />

            <div className="control-panel">
              <div>
                <h3>MIDI Controller</h3>
                <div className="panel">
                  <p>
                    Status:{' '}
                    {this.props.midiEnabled ? 'Connected!' : '(Not Connected)'}
                  </p>
                </div>

                <h3>Audio Samples</h3>
                <div className="panel">
                  <p>Load samples</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {};
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
