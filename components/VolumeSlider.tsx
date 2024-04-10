import { StyleSheet, Text, TextStyle, View } from 'react-native';
import Slider, { SliderProps } from '@react-native-community/slider';

type VolumeSliderProps = {
  titleStyle?: TextStyle;
  volume: number;
  onVolumeChange: (volume: number) => void;
} & SliderProps;

export default function VolumeSlider({
  volume,
  onVolumeChange,
  titleStyle,
  ...props
}: VolumeSliderProps) {
  return (
    <View>
      <Text style={[styles.text, titleStyle]}>Playback Volume:</Text>
      <Slider
        style={{ alignSelf: 'stretch' }}
        minimumValue={0}
        maximumValue={1}
        value={volume}
        onValueChange={onVolumeChange}
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
