import React, { PropsWithChildren } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableHighlightProps,
  View,
  ViewStyle,
} from 'react-native';

import Colors from '@/constants/Colors';

type Props = PropsWithChildren<
  TouchableHighlightProps & {
    loading?: boolean;
    title?: string;
    buttonStyle?: ViewStyle;
  }
>;

const Button = React.forwardRef(
  ({ disabled, loading, title, onPress, onPressIn, style, buttonStyle, children }: Props, ref) => (
    <View style={[styles.container, style]}>
      <TouchableHighlight
        style={[styles.button, disabled && styles.disabledButton, buttonStyle]}
        disabled={disabled || loading}
        onPressIn={onPressIn}
        onPress={onPress}
        underlayColor={Colors.light.highlightColor}>
        {children ||
          (loading ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <Text style={styles.label}>{title}</Text>
          ))}
      </TouchableHighlight>
    </View>
  )
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: Colors.light.tint,
  },
  disabledButton: {
    backgroundColor: Colors.light.disabled,
  },
  label: {
    color: '#ffffff',
    fontWeight: '700',
  },
});

export default Button;
