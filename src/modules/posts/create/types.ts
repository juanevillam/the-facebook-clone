import { feelings } from './assets/feelings';

type Step = 'default' | 'feelings' | 'media' | 'check-in' | 'gifs';

type Feeling = (typeof feelings)[number];

type Location = google.maps.places.AutocompletePrediction;

type GIF = {
  height: number;
  id: string;
  title: string;
  url: string;
  width: number;
};

type GIFUnparsed = {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
      width: number;
      height: number;
    };
  };
};

type CardItem = {
  active: boolean;
  disabled?: boolean;
  name: 'photo-video' | 'feeling' | 'check-in' | 'gif';
  onClick: VoidFunction;
};

export type { Step, Feeling, Location, GIF, GIFUnparsed, CardItem };
