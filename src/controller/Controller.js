import React, { Component } from 'react';
import { connect } from 'react-redux';
import KeyHandler, { KEYPRESS } from 'react-key-handler';
import WebMidi from 'webmidi';

import './controller.css';

const eventTypes = ['midimessage'];
const keyPressTargets = [
  'u',
  'i',
  'o',
  'p',
  'j',
  'k',
  'l',
  ';',
  'q',
  'w',
  'e',
  'r',
  'a',
  's',
  'd',
  'f'
];
function buildPadArray() {
  let array = [];

  for (let i = 0; i < 16; i++) {
    array.push({
      position: i,
      keyPressKey: keyPressTargets[i],
      on: false,
      sample: null
    });
  }

  return array;
}
const padArray = buildPadArray();

class Controller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      midiEnabled: false,
      controllerName: 'N/A',
      pads: padArray
    };
  }

  componentDidMount() {
    WebMidi.enable(err => {
      if (err) console.log(err);

      WebMidi.inputs.map(input => {
        return console.log(input.name);
      });

      // const name = 'Traktor Kontrol S4 MK2 Input';
      const name = 'Midi Fighter 3D ̨w';

      const midiInput = WebMidi.getInputByName(name);
      if (midiInput) {
        // add listeners for event types
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

    // set up pads => samples
    this.setState({});
  }

  handleMIDI(event) {
    const isActive = event.data[0] === 146;
    const button = event.data[1];

    console.log('button: ', button, 'is active: ', isActive);

    if (this.props.samples[button]) {
      return this.setState({
        [button]: isActive
      });
    } else {
      console.log(event.type, ', undefined input: ', button);
    }
  }

  handleKeyPress(event) {
    event.preventDefault();

    let padPosition = 0;

    padArray.forEach((pad, index) => {
      if (pad.keyPressKey === event.key) {
        padPosition = index;
      }
    });

    this.updateAudio(padPosition, true);
  }

  handleClick(event) {
    event.preventDefault();
    const control = event.target.id;
    this.updateAudio(control, true);
  }

  updateAudio(padPosition, isStarting) {
    if (isStarting) {
      this.props.samples[padPosition].howl.stop();

      // this.setState({
      //   pads[padPosition][on]: true
      // })

      // callback to turn off for click(?)
    } else {
      // stop signal unless sample has 'hold' enabled
      if (!this.props.samples.holdSample) {
        this.props.samples[padPosition].howl.stop();
        this.props.samples[padPosition].on = false;
      }
    }
  }

  render() {
    return (
      <div className="controller-wrapper">
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue={keyPressTargets}
          onKeyHandle={this.handleKeyPress.bind(this)}
        />

        <div className="stage">
          <div className="scene">
            <div className="cube">
              <div className="cube__face cube__face--front" />
              <div className="cube__face cube__face--back" />
              <div className="cube__face cube__face--right" />
              <div className="cube__face cube__face--left" />
              <div className="cube__face cube__face--top">
                <div className="controller">
                  {this.state.pads.map(pad => {
                    return (
                      <div className="pad-area" key={pad.keyPressKey}>
                        <button
                          className={
                            (this.props.samples[pad.position].on
                              ? 'pad-active '
                              : '') + 'pad'
                          }
                          key={pad.position}
                          id={pad.position}
                          onClick={this.handleClick.bind(this)}
                        >
                          {false
                            ? this.props.samples[pad.position].name
                            : pad.keyPressKey}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="cube__face cube__face--bottom" />
            </div>
          </div>
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
)(Controller);
