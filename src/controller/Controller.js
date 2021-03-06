import React, { Component } from 'react';
import KeyToggleHandler, { KEYDOWN, KEYUP, KEYPRESS } from 'react-key-handler';
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
      showKeys: false,
      pads: padArray,

      axisEnabled: false,
      xTransform: 0,
      yTransform: 0
    };
  }

  componentDidMount() {
    this.enableMIDI();

    this.mapSamples();
  }

  mapSamples() {
    // set up pads => samples
    this.state.pads.forEach((pad, index) => {
      pad.sample = this.props.samples[index];
    });
  }

  enableMIDI() {
    WebMidi.enable(err => {
      if (err) console.log(err);

      this.getController();
    });
  }

  getController() {
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
        controllerName: 'MIDIFighter 3D'
      });
    } else {
      console.log('controller not found. retrying in 5 sec');
      setTimeout(() => {
        this.getController();
      }, 5000);
    }
  }

  handleMIDI(event) {
    // get MIDI data
    let [active, note, velocity] = [...event.data];
    // console.log('input:', active, note, velocity);

    // catch y position signals
    if (note === 0 || note === 2) {
      const scaledUp = velocity * (126 / 180);
      const sign = note === 2 ? 1 : -1;
      const yTransform = scaledUp * sign;

      // console.log('y:', yTransform);
      return this.setState({ yTransform: yTransform });
    }

    // catch x position signals
    if (note === 1 || note === 3) {
      const scaledUp = velocity * (126 / 180);
      const sign = note === 3 ? -1 : 1;
      const xTransform = scaledUp * sign;

      // console.log('x:', xTransform);
      return this.setState({ xTransform: xTransform });
    }

    // catch 3d active signals
    if (note === 17 || note === 18) {
      return console.log('3d ', note === 17 ? 'on' : 'off');
    }

    // catch pad signals
    if (note >= 36 && note <= 51) {
      // map to pad
      const padPosition = note - 36;
      const isStarting = active === 146;

      console.log(padPosition, isStarting ? 'on' : 'off');
      return this.updateAudio(padPosition, isStarting, true);
    }

    console.log('uncaught input:', active, note, velocity);
    return;
  }

  keyPadPress(event) {
    event.preventDefault();
    // set on/off

    // find position
    let padPosition = 0;
    padArray.forEach((pad, index) => {
      if (pad.keyPressKey === event.key) {
        padPosition = index;
      }
    });

    this.updateAudio(padPosition, true, false);
  }

  toggleSpacbar(event) {
    event.preventDefault();

    if (!this.state.showKeys && event.type === 'keydown') {
      this.setState({ showKeys: true });
    }

    if (this.state.showKeys && event.type === 'keyup') {
      this.setState({ showKeys: false });
    }
  }

  handleClick(event) {
    event.preventDefault();
    const control = event.target.id;
    this.updateAudio(parseInt(control), true, false);
  }

  updateAudio(padPosition, isStarting, willStop) {
    // debugger;
    if (isStarting) {
      this.state.pads[padPosition].sample.howl.play();
      this.padActive(padPosition, true);

      // we dont get a stop signal from 'click' events, so
      // we'll just let it play out and then turn it off
      if (!willStop) {
        this.state.pads[padPosition].sample.howl.on('end', () => {
          this.padActive(padPosition, false);
        });
      }
    } else {
      // stop signal unless sample has 'hold' enabled
      if (!this.state.pads[padPosition].holdSample) {
        this.state.pads[padPosition].sample.howl.stop();
        this.padActive(padPosition, false);
      }
    }
  }

  padActive(padPosition, isActive) {
    this.setState(prevState => {
      const pads = [...prevState.pads];
      pads[padPosition] = { ...pads[padPosition], on: isActive };
      return { pads };
    });
  }

  setCoordinates() {
    return {
      transform:
        `rotateX(${this.state.xTransform + 25}deg)` +
        ` rotateY(${this.state.yTransform + -10}deg) rotateZ(10deg)`
    };
  }

  reArrangePads(pads) {
    return [
      pads[12],
      pads[13],
      pads[14],
      pads[15],
      pads[8],
      pads[9],
      pads[10],
      pads[11],
      pads[4],
      pads[5],
      pads[6],
      pads[7],
      pads[0],
      pads[1],
      pads[2],
      pads[3]
    ];
  }

  render() {
    return (
      <div className="app-grid">
        <div className="controller-wrapper">
          <KeyToggleHandler
            keyEventName={KEYPRESS}
            keyValue={keyPressTargets}
            onKeyHandle={this.keyPadPress.bind(this)}
          />

          <KeyToggleHandler
            keyEventName={KEYDOWN}
            code="Space"
            onKeyHandle={this.toggleSpacbar.bind(this)}
          />

          <KeyToggleHandler
            keyEventName={KEYUP}
            code="Space"
            onKeyHandle={this.toggleSpacbar.bind(this)}
          />

          <div className="stage">
            <div className="scene">
              <div className="cube" style={this.setCoordinates()}>
                <div className="cube__face cube__face--front" />
                <div className="cube__face cube__face--back" />
                <div className="cube__face cube__face--right" />
                <div className="cube__face cube__face--left" />
                <div className="cube__face cube__face--top">
                  <div className="controller">
                    {this.reArrangePads(this.state.pads).map(pad => {
                      return (
                        <div className="pad-area" key={pad.keyPressKey}>
                          <button
                            className={
                              (this.state.pads[pad.position].on
                                ? 'pad-active '
                                : '') + 'pad'
                            }
                            key={pad.position}
                            id={pad.position}
                            onClick={this.handleClick.bind(this)}
                          >
                            {this.state.showKeys
                              ? pad.keyPressKey
                              : this.props.samples[pad.position].name}
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

        <div className="control-panel">
          <p className="heading">Controller</p>
          <div className={this.state.midiEnabled ? 'panel enabled' : 'panel'}>
            <p>
              {this.state.midiEnabled
                ? this.state.controllerName
                : '(Not Connected)'}
            </p>
          </div>

          <p>Hold Spacebar to see keyboard shortcuts</p>
        </div>
      </div>
    );
  }
}

export default Controller;
