import { useVideoPlayer, VideoSource, VideoView } from 'expo-video';
import { useCallback, useRef, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import TitledSwitch from '@/components/TitledSwitch';
import Button from '@/components/Button';

import { bigBuckBunnySource, elephantsDreamSource } from '@/constants/VideoSources';
import VolumeSlider from '@/components/VolumeSlider';
import PlaybackSpeedControl from '@/components/PlaybackSpeedControl';

const videoSources: VideoSource[] = [bigBuckBunnySource, elephantsDreamSource];
const playbackRates: number[] = [0.25, 0.5, 1, 1.5, 2, 8];

export default function ControlsScreen() {
  const ref = useRef<VideoView>(null);
  const [showNativeControls, setShowNativeControls] = useState(true);
  const [requiresLinearPlayback, setRequiresLinearPlayback] = useState(false);
  const [loop, setLoop] = useState(false);
  const [playbackRateIndex, setPlaybackRateIndex] = useState(2);
  const [volume, setVolume] = useState(1);
  const [currentSource, setCurrentSource] = useState(videoSources[0]);

  const player = useVideoPlayer(currentSource, (player) => {
    player.volume = volume;
    player.loop = loop;
    player.play();
  });

  const togglePlayer = useCallback(() => {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  }, [player]);

  const changeSource = useCallback(() => {
    if (currentSource == videoSources[0]) {
      setCurrentSource(videoSources[1]);
    } else {
      setCurrentSource(videoSources[0]);
    }
  }, [player]);

  const seekBy = useCallback(() => {
    player.seekBy(10);
  }, [player]);

  const replay = useCallback(() => {
    player.replay();
  }, [player]);

  const updateLoop = useCallback(
    (loop: boolean) => {
      player.loop = loop;
      setLoop(loop);
    },
    [loop, player]
  );

  const onVolumeChange = useCallback(
    (volume: number) => {
      player.volume = volume;
      setVolume(volume);
    },
    [player]
  );

  const onRateChange = useCallback(
    (playbackRate: number) => {
      player.playbackRate = playbackRate;
    },
    [player]
  );

  return (
    <View style={styles.contentContainer}>
      <View>
        <VideoView
          ref={ref}
          style={styles.video}
          player={player}
          nativeControls={showNativeControls}
          contentFit="contain"
          contentPosition={{ dx: 0, dy: 0 }}
          allowsFullscreen={false}
          showsTimecodes={false}
          requiresLinearPlayback={requiresLinearPlayback}
          allowsPictureInPicture={false}
        />
      </View>
      <ScrollView style={styles.controlsContainer}>
        <View style={{ padding: 10 }}>
          <Button buttonStyle={styles.button} onPress={togglePlayer} title={'Play/Pause'} />
          <Button
            buttonStyle={styles.button}
            onPress={changeSource}
            title={'Change video source'}></Button>
          <Button buttonStyle={styles.button} onPress={seekBy} title={'Seek by 10 seconds'} />
          <Button buttonStyle={styles.button} onPress={replay} title={'Replay'} />
        </View>
        <VolumeSlider
          volume={volume}
          onVolumeChange={onVolumeChange}
          titleStyle={styles.sliderTitle}
        />
        <PlaybackSpeedControl
          selectedIndex={playbackRateIndex}
          setSelectedIndex={setPlaybackRateIndex}
          playbackRates={playbackRates}
          onRateChange={onRateChange}
        />
        <View style={styles.row}>
          <TitledSwitch
            title="Show native controls"
            value={showNativeControls}
            setValue={setShowNativeControls}
            style={styles.switch}
            titleStyle={styles.switchTitle}
          />
          <TitledSwitch
            title="Requires linear playback"
            value={requiresLinearPlayback}
            setValue={setRequiresLinearPlayback}
            style={styles.switch}
            titleStyle={styles.switchTitle}
          />
        </View>
        <View style={styles.row}>
          <TitledSwitch
            title="Loop playback"
            value={loop}
            setValue={updateLoop}
            style={styles.switch}
            titleStyle={styles.switchTitle}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  controlsContainer: {
    alignSelf: 'stretch',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  picker: {
    alignSelf: 'stretch',
    backgroundColor: '#e0e0e0',
  },
  switch: {
    flex: 1,
    flexDirection: 'column',
  },
  switchTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.5,
    fontSize: 12,
  },
  sliderTitle: {
    marginBottom: -3,
  },
  video: {
    width: 300,
    height: 225,
  },
  button: {
    alignSelf: 'stretch',
    margin: 5,
  },
});
