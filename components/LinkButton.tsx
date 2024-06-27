import React from 'react';
import { StyleProp, TextStyle, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

type LinkProps = {
  style?: StyleProp<TextStyle>;
  to?: string;
  text: string;
};

export function LinkButton({ style = styles.link, to = '/', text }: LinkProps) {
  return <Link style={style} href={to}>{text}</Link>;
}

const styles = StyleSheet.create({
  link:{
    padding: 24,
    backgroundColor: 'blue',
    borderRadius: 40,
    color: 'white',
    fontSize: 24
  }
});