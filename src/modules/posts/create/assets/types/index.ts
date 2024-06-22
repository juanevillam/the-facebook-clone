import { feelings } from '../feelings';

type Step = 'default' | 'feelings' | 'media' | 'gif' | 'check-in' | 'gifs';

type Media = {
  file: string | ArrayBuffer | null;
  playing: boolean;
  type: string | null;
};

type Feeling = (typeof feelings)[number];

type Location = google.maps.places.AutocompletePrediction;

type GIF = {
  height: number;
  id: string;
  title: string;
  url: string;
  width: number;
};

type unparsedGIF = {
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

export type { Step, Media, Feeling, Location, GIF, unparsedGIF };
