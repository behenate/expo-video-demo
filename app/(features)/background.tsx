import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { bigBuckBunnySource } from '@/constants/VideoSources';
import TitledSwitch from '@/components/TitledSwitch';

export default function ControlsScreen() {
  const [staysActiveInBackground, setStaysActiveInBackground] = useState<boolean>(true);

  const player = useVideoPlayer(bigBuckBunnySource, (player) => {
    player.staysActiveInBackground = staysActiveInBackground;
    player.play();
  });

  const updateStayActiveInBackground = useCallback(
    (value: boolean) => {
      setStaysActiveInBackground(value);
      player.staysActiveInBackground = value;
    },
    [player]
  );

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
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <TitledSwitch
            title="Play in background"
            value={staysActiveInBackground}
            setValue={updateStayActiveInBackground}
            style={styles.switch}
            titleStyle={styles.switchTitle}
          />
        </View>
        <Text style={{ textAlign: 'justify' }}>
          When you minimize the app or lock the phone the playback will{' '}
          {staysActiveInBackground ? 'continue' : 'stop'}!
        </Text>
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
  infoContainer: {
    flex: 1,
    alignSelf: 'stretch',
    paddingTop: 20,
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
    zIndex: 10,
  },
  button: {
    alignSelf: 'stretch',
    margin: 10,
  },
});
