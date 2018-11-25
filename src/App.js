import React, { Component } from 'react';
import { connect } from 'react-redux';

import ProfilePic from './images/profile.jpg';

import Controller from './controller/Controller';

import WebMidi from 'webmidi';

import './App.css';

const eventTypes = ['midimessage'];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      midiEnabled: false,
      controllerName: '(Not Connected)'
    };
  }

  componentDidMount() {
    WebMidi.enable(err => {
      if (err) console.log(err);

      WebMidi.inputs.map(input => {
        return console.log(input.name);
      });

      // const name = 'Traktor Kontrol S4 MK2 Input';
      const name = 'Midi Fighter 3D̨w';
      const midiInput = WebMidi.getInputByName('Midi Fighter 3D ̨w');
      if (midiInput) {
        eventTypes.map(type => {
          midiInput.addListener(type, 'all', this.handleMIDI.bind(this));

          return console.log('added ', type, ' listener');
        });

        this.setState({
          midiEnabled: midiInput.state === 'connected',
          controllerName: name
        });
      } else {
        console.log('not found?');
      }
    });
  }

  handleMIDI(event) {
    const isActive = event.data[0] === 146;
    const button = event.data[1];

    console.log('button: ', button, 'is active: ', isActive);

    if (this.props.samples[button]) {
      if (isActive) {
        this.props.samples[button].howl.play();
      } else {
        if (button === 67 || button === 66) {
          this.props.samples[button].howl.stop();
        }
      }

      return this.setState({
        [button]: isActive
      });
    } else {
      console.log(event.type, ', undefined input: ', button);
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <div className="wrapper">
            <nav>
              <div>
                <span className="title">(Web) MIDI Fighter 3D</span>
              </div>
            </nav>
          </div>
        </header>

        <section
          id="home"
          ref={section => {
            this.home = section;
          }}
        >
          <div className="wrapper">
            <div className="row row-2">
              <div>
                <p>
                  Connect any MIDI instrument to your computer and play live on
                  on the web.
                </p>

                <h3>MIDI Controller</h3>
                <div className="panel">
                  <p>
                    Status:{' '}
                    {this.state.midiEnabled ? 'Connected!' : '(Not Connected)'}
                  </p>
                </div>

                <h3>Select Audio Sample Pack</h3>
                <div className="panel">
                  <p>Load samples</p>
                </div>
              </div>

              <div>
                <Controller />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    samples: state.controller.samples
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
