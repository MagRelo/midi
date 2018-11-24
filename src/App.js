import React, { Component } from 'react';
import { connect } from 'react-redux';

import scrollToComponent from 'react-scroll-to-component';

import ProfilePic from './images/profile.jpg';

import Controller from './controller/Controller';

import WebMidi from 'webmidi';

import './App.css';

const eventTypes = ['midimessage'];

const scrollOptions = {
  duration: 700,
  ease: 'inOutCube'
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      midiEnabled: false,
      controllerName: 'N/A'
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
              <ul />

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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Consequatur ipsa doloremque ea. Nobis, est. Similique quisquam
                  facilis maxime fuga pariatur expedita porro ad molestias
                  nobis! Placeat nisi culpa veritatis? Iusto.
                </p>

                <h3>Control Status</h3>
                <p>MIDI Enabled: {this.state.midiEnabled ? 'Yes' : 'No'}</p>
                <p>Controller: {this.state.controllerName}</p>

                <h3>Audio Samples</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iste
                  facilis officia eius rerum perferendis, illum vero eos sunt
                  cumque. Quo, reprehenderit. Quisquam vel perferendis sapiente
                  harum alias excepturi aut voluptatem.
                </p>
              </div>
              <div>
                <Controller />
              </div>
            </div>
          </div>
        </section>

        <div className="wrapper">
          <footer>
            <div>
              <h4>About this project</h4>
              <p>
                This project is an expirement in using participation and
                responsibility to create meaning.
              </p>
            </div>
            <div>
              <img
                style={{ border: 'solid 1px #393939', borderRadius: '50%' }}
                src={ProfilePic}
                alt="profile pic of matt lovan"
              />
              <p>@mattlovan</p>
              <p>mattlovan@gmail.com</p>
            </div>
          </footer>
        </div>
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
