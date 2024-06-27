import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import {LinkButton} from '@/components/LinkButton'
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.root}>
      <View style={styles.content}>
        <LinkButton to="/stocks" text='Котировки'/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});