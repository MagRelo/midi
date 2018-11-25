import { Howl } from 'howler';

const samples = [
  {
    name: 'space lander',
    howl: new Howl({
      src: ['/sounds/Casio-VZ-10M-Space-Lander-C2.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'oooh',
    howl: new Howl({
      src: ['/sounds/Alesis-Fusion-Voice-Oohs-C4.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'dark pad',
    howl: new Howl({
      src: ['/sounds/Ensoniq-ESQ-1-Omen-Pad-C2.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'atari crunch',
    howl: new Howl({
      src: ['/sounds/M-Audio-Venom-Atari-C2.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'kick',
    howl: new Howl({
      src: ['/sounds/Bass-Drum-1.wav']
    }),
    status: 'ready',
    on: false,
    type: 'drum'
  },
  {
    name: 'snare',
    howl: new Howl({
      src: ['/sounds/Ensoniq-ESQ-1-Snare.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'closed hat',
    howl: new Howl({
      src: ['/sounds/Closed-Hi-Hat-1.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'crash',
    howl: new Howl({
      src: ['/sounds/Crash-Cymbal-1.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'breakdown loop',
    howl: new Howl({
      src: ['/sounds/Casio-MT-600-Disco-2.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'disco loop',
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-Disco.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'swing loop',
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-Beguine.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: "80's party",
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-16-Beat.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'disco loop 3',
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-Disco.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: 'swing loop 2',
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-Beguine.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: "80's party 2",
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-16-Beat.wav']
    }),
    status: 'ready',
    on: false
  },
  {
    name: "80's party 3",
    howl: new Howl({
      src: ['/sounds/Casio-MT-45-16-Beat.wav']
    }),
    status: 'ready',
    on: false
  }
];

const sampleTemplate = {
  name: '',
  howl: null
};

const initialState = {
  samples: samples
};

const controllerReducer = (state = initialState, action) => {
  return state;
};

export default controllerReducer;
