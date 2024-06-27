import { Link, Stack } from 'expo-router';
import { StyleSheet, Text } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <Text>Page not found</Text>
    </>
  );
}

const styles = StyleSheet.create({
});
