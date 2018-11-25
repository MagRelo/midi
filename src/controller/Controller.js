import React, { Component } from 'react';
import { connect } from 'react-redux';

import './controller.css';

class Controller extends Component {
  constructor(props) {
    super(props);

    this.state = {
      midiEnabled: false,
      controllerName: 'N/A'
    };
  }

  handleClick(event) {
    const control = event.target.id;
    const isActive = true;

    if (control) {
      this.props.samples[control].on = true;
      this.props.samples[control].howl.play();

      setTimeout(() => {
        this.props.samples[control].on = false;
        return this.setState({
          [control]: isActive
        });
      }, 150);

      return this.setState({
        [control]: isActive
      });
    }
  }

  createPad(sample) {
    return (
      <div className="pad-area">
        <button
          className={
            (this.props.samples[sample].on ? 'pad-active ' : '') + 'pad'
          }
          key={sample}
          id={sample}
          onClick={this.handleClick.bind(this)}
        >
          u
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="controller-wrapper">
        <div className="stage">
          <div className="scene">
            <div className="cube">
              <div className="cube__face cube__face--front" />
              <div className="cube__face cube__face--back" />
              <div className="cube__face cube__face--right" />
              <div className="cube__face cube__face--left" />
              <div className="cube__face cube__face--top">
                <div className="controller">
                  {Object.keys(this.props.samples).map(sample =>
                    this.createPad(sample)
                  )}
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
