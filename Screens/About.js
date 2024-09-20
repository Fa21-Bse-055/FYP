import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

export default function About({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.navigationButtons}>
        <Button title="Home" onPress={() => navigation.navigate('Home')} />
        <Button title="Pricing" onPress={() => navigation.navigate('Pricing')} />
        <Button title="Contact Us" onPress={() => navigation.navigate('ContactUs')} />
        <Button title="Login" onPress={() => navigation.navigate('Login')} />
      </View>

      <Text style={styles.title}>About Us</Text>
      <Text style={styles.content}>This is the About Us page.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#0f4c81', // Bluish background color
  },
  navigationButtons: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  redLine: {
    position: 'absolute',
    width: '100%',
    height: 5,
    backgroundColor: '#ff4c4c', // Red line color
    top: 100,
  },
  content: {
    fontSize: 18,
    color: '#ffffff',
  },
});
