import { Stack } from 'expo-router';

export default function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true, title: 'Features ' }} />
      <Stack.Screen name="controls" options={{ headerShown: true, title: 'Controls' }} />
      <Stack.Screen
        name="fullscreen-and-pip"
        options={{ headerShown: true, title: 'Fullscreen' }}
      />
      <Stack.Screen name="events" options={{ headerShown: true, title: 'Events' }} />
      <Stack.Screen
        name="background"
        options={{ headerShown: true, title: 'Background Playback' }}
      />
    </Stack>
  );
}
