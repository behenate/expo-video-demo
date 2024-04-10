import { Text, View, StyleSheet } from 'react-native';
import SegmentedControl, {
  SegmentedControlProps,
} from '@react-native-segmented-control/segmented-control';

type PlaybackSpeedControlProps = {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  playbackRates: number[];
  onRateChange: (rate: number) => void;
} & SegmentedControlProps;
export default function PlaybackSpeedControl({
  selectedIndex,
  setSelectedIndex,
  playbackRates,
  onRateChange,
  ...props
}: PlaybackSpeedControlProps) {
  return (
    <View>
      <Text style={styles.text}>Playback Speed: </Text>
      <SegmentedControl
        values={playbackRates.map((speed) => `${speed}x`)}
        selectedIndex={selectedIndex}
        onValueChange={(value) => {
          setSelectedIndex(playbackRates.indexOf(parseFloat(value)));
          onRateChange(parseFloat(value));
        }}
        backgroundColor="#e5e5e5"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    opacity: 0.5,
    fontSize: 12,
    marginBottom: 5,
  },
});
