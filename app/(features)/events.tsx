import { useVideoPlayer, VideoPlayerStatus, VideoView } from 'expo-video';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { bigBuckBunnySource } from '@/constants/VideoSources';
import VolumeSlider from '@/components/VolumeSlider';
import Button from '@/components/Button';

const malformedSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BadBunny.mp4';

export default function ControlsScreen() {
  const [currentStatus, setCurrentStatus] = useState<VideoPlayerStatus>('loading');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volumeEvent, setVolumeEvent] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [volume, setVolume] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const player = useVideoPlayer(bigBuckBunnySource, (player) => {
    player.staysActiveInBackground = false;
    player.play();
  });

  const onVolumeChange = useCallback(
    (volume: number) => {
      setVolume(volume);
      player.volume = volume;
    },
    [player]
  );

  const toggleMalformedSource = useCallback(() => {
    if (error) {
      player.replace(bigBuckBunnySource);
    } else {
      player.replace(malformedSource);
    }
  }, [player, error]);

  useEffect(() => {
    const statusChangeSubscription = player.addListener('statusChange', (newValue, _, error) => {
      setCurrentStatus(newValue);
      setError(error?.message ?? null);
    });
    const playingChangeSubscription = player.addListener('playingChange', (newValue) => {
      setIsPlaying(newValue);
    });
    const volumeChangeSubscription = player.addListener('volumeChange', (newValue) => {
      setVolumeEvent(newValue.volume);
    });
    const rateChangeSubscription = player.addListener('playbackRateChange', (newValue) => {
      setPlaybackRate(newValue);
    });

    return () => {
      statusChangeSubscription.remove();
      playingChangeSubscription.remove();
      volumeChangeSubscription.remove();
      rateChangeSubscription.remove();
    };
  }, [player]);

  return (
    <View style={styles.contentContainer}>
      <View>
        <VideoView
          style={styles.video}
          player={player}
          contentFit="contain"
          contentPosition={{ dx: 0, dy: 0 }}
          allowsFullscreen={false}
          showsTimecodes={false}
          allowsPictureInPicture={true}
        />
      </View>
      <View style={styles.controlsContainer}>
        <VolumeSlider
          volume={volume}
          onVolumeChange={onVolumeChange}
          titleStyle={styles.sliderTitle}
        />
        <Button
          title={`Use ${error ? 'working' : 'malformed'} source`}
          onPress={toggleMalformedSource}
          style={styles.button}
        />
        <Text style={styles.eventText}>Current status: {currentStatus}</Text>
        <Text style={styles.eventText}>Is playing: {isPlaying.toString()}</Text>
        <Text style={styles.eventText}>Volume: {Math.round(volumeEvent * 100) / 100}</Text>
        <Text style={styles.eventText}>Playback speed: {playbackRate}</Text>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        )}
      </View>
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
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  switch: {
    flex: 1,
    flexDirection: 'column',
  },
  eventText: {
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.5,
    fontSize: 13,
    marginVertical: 2,
  },
  sliderTitle: {
    marginBottom: -3,
  },
  video: {
    width: 300,
    height: 225,
    zIndex: 10,
  },
  button: {
    alignSelf: 'stretch',
    marginBottom: 10,
  },
  errorContainer: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'red',
    marginTop: 10,
  },
  errorText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
