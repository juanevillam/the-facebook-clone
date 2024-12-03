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
  showControls?: boolean;
  showFullHeight?: boolean;
  url: string;
};

export const VideoPlayer = ({
  showControls = true,
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

  const togglePlayPause = () => setPlaying(!playing);

  const toggleMute = () => setMuted(!muted);

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

  const handleSeekEnd = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[]
  ) => setPlaying(true);

  const handleSeekStart = () => setPlaying(false);

  const handleVolumeChange = (_: Event, newValue: number | number[]) => {
    const newVolume = typeof newValue === 'number' ? newValue : newValue[0];

    setVolume(newVolume);
    setMuted(newVolume === 0);
  };

  const togglePlaybackMenu = () => setShowPlaybackMenu(!showPlaybackMenu);

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
        {showControls && (
          <>
            <button
              className="absolute inset-0 z-10 cursor-pointer"
              onClick={togglePlayPause}
              type="button"
            />
            <div className="flex-center absolute bottom-0 z-10 w-full bg-neutral-900 bg-opacity-50 p-1 md:p-2">
              <IconButton
                className="mr-1 size-9 hover:bg-neutral-700 hover:bg-opacity-50 md:mr-1.5"
                icon={{
                  className: 'fill-white size-full',
                  Component: playing ? PauseIcon : PlayIcon,
                  name: playing ? 'pause' : 'play',
                }}
                onClick={togglePlayPause}
              />
              <p className="primary-text-dark mr-4 w-20 text-center font-mono text-xs md:mr-6">
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
                onChangeCommitted={handleSeekEnd}
                onMouseDown={handleSeekStart}
                step={0.1}
                value={played}
              />
              <div className="group relative ml-2 text-center md:ml-3">
                <button
                  aria-label={t('change-playback-rate')}
                  className="primary-transition primary-text-dark w-14 rounded-md py-1.5 font-bold hover:bg-neutral-700 hover:bg-opacity-50 md:w-16"
                  onClick={togglePlaybackMenu}
                  type="button"
                >
                  {playbackRate}x
                </button>
                {showPlaybackMenu && (
                  <div
                    className="card-bg absolute -left-2 bottom-10 rounded-md p-2 shadow-lg"
                    role="menu"
                  >
                    {[0.5, 1, 1.5, 2].map((rate) => (
                      <button
                        key={rate}
                        aria-label={t('change-playback-rate-to', { rate })}
                        className={classNames(
                          'primary-text hover:primary-bg primary-transition w-14 rounded-md py-1.5 md:w-16',
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
                  className="size-9 hover:bg-neutral-700 hover:bg-opacity-50"
                  icon={{
                    className: 'fill-white size-full',
                    Component: muted ? SpeakerXMarkIcon : SpeakerWaveIcon,
                    name: muted ? 'unmute' : 'mute',
                  }}
                  onClick={toggleMute}
                />
                <Slider
                  aria-label={t('volume')}
                  className="primary-transition absolute bottom-14 ml-0.5 hidden h-14 scale-90 text-white opacity-0 group-hover:scale-100 group-hover:opacity-100 md:block"
                  max={1}
                  min={0}
                  onChange={handleVolumeChange}
                  orientation="vertical"
                  step={0.01}
                  value={volume}
                />
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};
