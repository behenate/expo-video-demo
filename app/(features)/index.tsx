import React from 'react';
import { Platform, StyleSheet, ViewStyle } from 'react-native';

import { View } from '@/components/Themed';
import { Link } from 'expo-router';
import Button from '@/components/Button';

type NavigationButtonProps = {
  title: string;
  style?: ViewStyle;
  href: string;
};

const NavigationButton = ({ href, title, ...props }: NavigationButtonProps) => (
  <Link href={href} asChild>
    <Button title={title} buttonStyle={styles.button} {...props} />
  </Link>
);

export default function FeaturesList() {
  return (
    <View style={styles.container}>
      <NavigationButton title={'Playback Controls'} href={'/(features)/controls'} />
      <NavigationButton
        title={'Fullscreen and Picture in Picture'}
        href={'/(features)/fullscreen-and-pip'}
      />
      {Platform.OS != 'web' && (
        <>
          <NavigationButton title={'Events'} href={'/(features)/events'} />
          <NavigationButton title={'Background Playback'} href={'/(features)/background'} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 5,
    alignSelf: 'stretch',
    width: 300,
  },
});
