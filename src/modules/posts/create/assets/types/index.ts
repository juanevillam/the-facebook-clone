import { feelings } from '../feelings';

type Step = 'default' | 'feelings' | 'media' | 'check-in' | 'gifs';

type Media = {
  file: string | null;
  type: 'image' | 'video' | null;
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
  name: 'photo-video' | 'feeling-activity' | 'check-in' | 'gif';
  onClick: VoidFunction;
};

export type { Step, Media, Feeling, Location, GIF, GIFUnparsed, CardItem };
