import { Howl } from 'howler';

const samples = {
  '176-15': {
    name: 'space lander',
    howl: new Howl({
      src: ['/sounds/Casio-VZ-10M-Space-Lander-C2.wav']
    }),
    status: 'ready',
    on: false
  },
  '67': {
    name: 'oooh',
    howl: new Howl({
      src: ['/sounds/Alesis-Fusion-Voice-Oohs-C4.wav']
    }),
    status: 'ready',
    on: false
  },
  '66': {
    name: 'dark pad',
    howl: new Howl({
      src: ['/sounds/Ensoniq-ESQ-1-Omen-Pad-C2.wav']
    }),
    status: 'ready',
    on: false
  },
  '176-18': {
    name: 'atari crunch',
    howl: new Howl({
      src: ['/sounds/M-Audio-Venom-Atari-C2.wav']
    }),
    status: 'ready',
    on: false
  },
  '52': {
    name: 'kick',
    howl: new Howl({
      src: ['/sounds/Bass-Drum-1.wav']
    }),
    status: 'ready',
    on: false
  },
  '55': {
    name: 'snare',
    howl: new Howl({
      src: ['/sounds/Ensoniq-ESQ-1-Snare.wav']
    }),
    status: 'ready',
    on: false
  },
  '54': {
    name: 'closed hat',
    howl: new Howl({
      src: ['/sounds/Closed-Hi-Hat-1.wav']
    }),
    status: 'ready',
    on: false
  },
  '53': {
    name: 'crash',
    howl: new Howl({
      src: ['/sounds/Crash-Cymbal-1.wav']
    }),
    status: 'ready',
    on: false
  },
  '123': {
    name: 'breakdown loop',
    howl: new Howl({
      src: ['/sounds/Casio-MT-600-Disco-2.wav']
    }),
    status: 'ready',
    on: false
  },
  '177-12': {
    name: 'disco loop',
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-Disco.wav']
    }),
    status: 'ready',
    on: false
  },
  '177-13': {
    name: 'swing loop',
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-Beguine.wav']
    }),
    status: 'ready',
    on: false
  },
  '177-14': {
    name: "80's party",
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-16-Beat.wav']
    }),
    status: 'ready',
    on: false
  },
  '177-99': {
    name: 'disco loop',
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-Disco.wav']
    }),
    status: 'ready',
    on: false
  },
  '177-98': {
    name: 'swing loop',
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-Beguine.wav']
    }),
    status: 'ready',
    on: false
  },
  '177-97': {
    name: "80's party",
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-16-Beat.wav']
    }),
    status: 'ready',
    on: false
  },
  '177-96': {
    name: "80's party",
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-16-Beat.wav']
    }),
    status: 'ready',
    on: false
  }
};

const initialState = {
  samples: samples
};

const controllerReducer = (state = initialState, action) => {
  return state;
};

export default controllerReducer;
