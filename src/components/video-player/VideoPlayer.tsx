'use client';

import React, { useEffect, useRef, useState } from 'react';

import { Slider } from '@mui/material';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import ReactPlayer from 'react-player';

import {
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@/assets/icons';

import { IconButton } from '../buttons';
import { formatSecondsToVideoTime } from './helpers/formatSecondsToVideoTime';

type VideoPlayerProps = {
  showFullHeight?: boolean;
  url: string;
};

export const VideoPlayer = ({
  showFullHeight = true,
  url,
}: VideoPlayerProps) => {
  const playerRef = useRef<ReactPlayer>(null);
  const [hasWindow, setHasWindow] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showPlaybackMenu, setShowPlaybackMenu] = useState(false);
  const t = useTranslations('video-player');

  const togglePlayPause = () => setPlaying((prev) => !prev);

  const toggleMute = () => setMuted((prev) => !prev);

  const handleDuration = (duration: number) => setDuration(duration);

  const handleProgress = (state: { played: number }) =>
    setPlayed(state.played * 100);

  const handleSeekChange = (_: Event, newValue: number | number[]) => {
    if (playerRef.current) {
      const newPlayed = typeof newValue === 'number' ? newValue : newValue[0];

      setPlayed(newPlayed);
      playerRef.current.seekTo(newPlayed / 100, 'fraction');
    }
  };

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const newVolume = typeof newValue === 'number' ? newValue : newValue[0];

    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const togglePlaybackMenu = () => setShowPlaybackMenu((prev) => !prev);

  const changePlaybackRate = (rate: number) => {
    setPlaybackRate(rate);
    setShowPlaybackMenu(false);
  };

  useEffect(() => {
    typeof window !== 'undefined' && setHasWindow(true);
  }, []);

  return (
    hasWindow && (
      <div
        className={classNames('relative h-full', {
          'md:h-[500px]': !showFullHeight,
        })}
      >
        <ReactPlayer
          height="100%"
          loop
          muted={muted}
          onDuration={handleDuration}
          onProgress={handleProgress}
          playbackRate={playbackRate}
          playing={playing}
          ref={playerRef}
          url={url}
          volume={volume}
          width="100%"
        />
        <button
          className="absolute inset-0 z-10 cursor-pointer"
          onClick={togglePlayPause}
          type="button"
        />
        <div
          aria-labelledby="video-player-controls-title"
          className="flex-align-center absolute bottom-0 z-10 w-full bg-neutral-900 bg-opacity-50 p-1 md:p-2"
          role="group"
        >
          <h2 id="video-player-controls-title" className="sr-only">
            {t('controls')}
          </h2>
          <IconButton
            className="mr-1 size-9 md:mr-1.5"
            icon={{
              ariaLabel: playing ? 'pause-video' : 'play-video',
              className: 'fill-white size-full',
              Component: playing ? PauseIcon : PlayIcon,
            }}
            onClick={togglePlayPause}
          />
          <p className="text-primary-dark mr-4 w-20 text-center font-mono text-xs md:mr-6">
            <strong>
              {formatSecondsToVideoTime((played / 100) * duration)}
            </strong>{' '}
            / {formatSecondsToVideoTime(duration)}
          </p>
          <Slider
            aria-label={t('seek')}
            className="mt-1 flex-1 text-white"
            max={100}
            min={0}
            onChange={handleSeekChange}
            step={0.1}
            value={played}
          />
          <div className="group relative ml-2 text-center md:ml-3">
            <button
              aria-label={t('change-playback-rate')}
              className="text-primary-dark transition-bg w-14 rounded-md py-1.5 font-bold duration-300 ease-in-out hover:bg-neutral-700 hover:bg-opacity-50 md:w-16"
              onClick={togglePlaybackMenu}
              type="button"
            >
              {playbackRate}x
            </button>
            {showPlaybackMenu && (
              <div
                className="bg-card absolute -left-2 bottom-10 rounded-md p-2 shadow-lg"
                role="menu"
              >
                {[0.5, 1, 1.5, 2].map((rate) => (
                  <button
                    key={rate}
                    aria-label={t('change-playback-rate-to', { rate })}
                    className={classNames(
                      'text-primary hover:bg-primary w-14 rounded-md py-1.5 md:w-16',
                      {
                        'font-bold': rate === playbackRate,
                      }
                    )}
                    onClick={() => changePlaybackRate(rate)}
                    role="menuitem"
                  >
                    {rate}x
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="group">
            <IconButton
              className="size-9 transition-transform duration-300 ease-in-out hover:scale-110"
              icon={{
                ariaLabel: muted ? 'unmute-video' : 'mute-video',
                className: 'fill-white size-full',
                Component: muted ? SpeakerXMarkIcon : SpeakerWaveIcon,
              }}
              onClick={toggleMute}
            />
            <Slider
              aria-label={t('volume')}
              className="absolute bottom-14 ml-0.5 hidden h-14 scale-90 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100 md:block"
              max={1}
              min={0}
              onChange={handleVolumeChange}
              orientation="vertical"
              step={0.01}
              value={volume}
            />
          </div>
        </div>
      </div>
    )
  );
};
