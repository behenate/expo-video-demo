import { useVideoPlayer, VideoView } from 'expo-video';
import { useCallback, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import TitledSwitch from '@/components/TitledSwitch';
import Button from '@/components/Button';

import { bigBuckBunnySource } from '@/constants/VideoSources';

export default function ControlsScreen() {
  const ref = useRef<VideoView>(null);
  const [allowsFullscreen, setAllowsFullscreen] = useState(true);
  const [allowsPiP, setAllowsPiP] = useState(true);
  const [isInPiP, setIsInPiP] = useState(false);
  const [autoStartPiP, setAutoStartPiP] = useState(false);

  const player = useVideoPlayer(bigBuckBunnySource, (player) => {
    player.play();
  });

  const togglePictureInPicture = useCallback(() => {
    if (!isInPiP) {
      ref.current?.startPictureInPicture();
    } else {
      ref.current?.stopPictureInPicture();
    }
  }, [ref.current, isInPiP]);

  const enterFullscreen = useCallback(() => {
    ref.current?.enterFullscreen();
  }, [ref.current]);

  return (
    <View style={styles.contentContainer}>
      <VideoView
        ref={ref}
        style={styles.video}
        player={player}
        nativeControls={true}
        contentFit="contain"
        contentPosition={{ dx: 0, dy: 0 }}
        allowsFullscreen={allowsFullscreen}
        showsTimecodes={false}
        requiresLinearPlayback={false}
        allowsPictureInPicture={allowsPiP}
        onPictureInPictureStart={() => setIsInPiP(true)}
        onPictureInPictureStop={() => setIsInPiP(false)}
        startsPictureInPictureAutomatically={autoStartPiP}
      />
      <ScrollView style={styles.controlsContainer}>
        <View style={{ padding: 10 }}>
          <Button
            buttonStyle={styles.button}
            onPress={togglePictureInPicture}
            title={`${isInPiP ? 'Exit' : 'Enter'} Picture in Picture`}
          />
          <Button
            buttonStyle={styles.button}
            onPress={enterFullscreen}
            title={'Enter Fullscreen'}
          />
        </View>
        <View style={styles.row}>
          <TitledSwitch
            title="Allow Picture in Picture"
            value={allowsPiP}
            setValue={setAllowsPiP}
            style={styles.switch}
            titleStyle={styles.switchTitle}
          />
          <TitledSwitch
            title="Allow Fullscreen"
            value={allowsFullscreen}
            setValue={setAllowsFullscreen}
            style={styles.switch}
            titleStyle={styles.switchTitle}
          />
        </View>
        <View style={styles.row}>
          <TitledSwitch
            title="Enter Picture in Picture automatically"
            value={autoStartPiP}
            setValue={setAutoStartPiP}
            style={styles.switch}
            titleStyle={styles.switchTitle}
          />
        </View>
        {Platform.OS == 'ios' && (
          <Text>
            Note: Picture In Picture (PiP) functionality is not available in iOS Simulators. Please
            use a physical iOS device or an iPadOS simulator.
          </Text>
        )}
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
  video: {
    width: 300,
    height: 225,
  },
  button: {
    alignSelf: 'stretch',
    marginVertical: 5,
  },
});
