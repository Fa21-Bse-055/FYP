import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import SvgComponent from '../assets/SVG';

const screenHeight = Dimensions.get('window').height;

export default function Home({ navigation }) {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    if (result.type === 'success') {
      console.log(result);
    } else {
      console.log('User cancelled document picker');
    }
  };

  const styles = getDynamicStyles(theme);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.navigationButtons}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text style={styles.navButton}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('About')}>
          <Text style={styles.navButton}>About</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Pricing')}>
          <Text style={styles.navButton}>Pricing</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
          <Text style={styles.navButton}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.navButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('TryForFree')}>
          <Text style={styles.navButton}>Try for free</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.themeToggleContainer}>
        <TouchableOpacity onPress={toggleTheme} style={styles.themeToggleButton}>
          <Text style={styles.themeToggleText}>
            Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.textContainer}>
        <View style={styles.imageContainer}>
          <SvgComponent></SvgComponent>
        </View>
        <Text style={styles.subtitle}>Authenticity you can trust</Text>
        <Text style={styles.title}>
          Instantly verify the{'\n'}
          authenticity of your{'\n'}
          documents
        </Text>
        <Text style={styles.description}>
          Is the document that you have authentic?{'\n'}
          Has it been falsely modified?{'\n'}
          Check here in just a few seconds.
        </Text>

        <TouchableOpacity style={styles.verifyButton} onPress={pickDocument}>
          <Text style={styles.buttonText}>Verify your document</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryText}>Verify multiple documents</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.additionalContent}>
        <Text style={styles.moreText}>Why Blockchain Verified</Text>
        <Text style={styles.additionalText}>
          Globally, billions of PDF documents such as Certificates, Contracts, and Test Reports,{'\n'}
          etc., are being published and shared under the impression that they are not able to{'\n'}
          be changed, updated, or falsified. Even password-protected PDF documents with digital{'\n'}
          signatures and E-Seals can easily be modified and appear authentic.
        </Text>
        <Text style={styles.additionalText}>
          Blockchain Verified’s unique solution identifies directly if the document that you have{'\n'}
          received is indeed the same as the original document or if its contents have been modified.
        </Text>
        <Text style={styles.additionalText}>
          Our mission is to minimize the number of falsified documents globally, making documentation{'\n'}
          more reliable, verifiable, and trustworthy.
        </Text>
        <Text style={styles.additionalText}>
          Blockchain Verified’s registered trademark on your document is a recognized Mark of Authenticity.
        </Text>
      </View>

      <View style={styles.howItWorksContainer}>
  <Text style={styles.howItWorksTitle}>How does it work?</Text>
  <View style={styles.stepsContainer}>
    <View style={styles.step}>
      <Text style={styles.icon}>🔗</Text>
      <Text style={styles.stepTitle}>Attest</Text>
      <Text style={styles.stepDescription}>
        The fingerprint or DNA of the document is attested to a block on the Ethereum Blockchain via a smart contract.
      </Text>
    </View>
    <View style={styles.step}>
      <Text style={styles.icon}>🔒</Text>
      <Text style={styles.stepTitle}>Attested</Text>
      <Text style={styles.stepDescription}>
        The document becomes immutable and it cannot be changed. This gives a subsequent reference point for comparison.
      </Text>
    </View>
    <View style={styles.step}>
      <Text style={styles.icon}>🛡️</Text>
      <Text style={styles.stepTitle}>Confidential</Text>
      <Text style={styles.stepDescription}>
        The document contents are not placed on the blockchain, thus the documents remain confidential, secure, and not in the public domain.
      </Text>
    </View>
    <View style={styles.step}>
      <Text style={styles.icon}>✔️</Text>
      <Text style={styles.stepTitle}>Authenticity Check</Text>
      <Text style={styles.stepDescription}>
        Now the authenticity of the document can be checked here by clicking the 'Verify your document' button above.
      </Text>
    </View>
  </View>
</View>

          <View style={styles.footerContainer}>
        <View style={styles.footerLeft}>
          <Text style={styles.footerText}>
            Start today with safely securing and verifying your documents
          </Text>
          <TouchableOpacity style={styles.footerButton}>
            <Text style={styles.footerButtonText}>Start your free trial now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footerRight}>
          <TouchableOpacity onPress={() => navigation.navigate('About')}>
            <Text style={styles.footerNav}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Pricing')}>
            <Text style={styles.footerNav}>Pricing</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('ContactUs')}>
            <Text style={styles.footerNav}>Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('CookiePolicy')}>
            <Text style={styles.footerNav}>Cookie Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('TermsOfService')}>
            <Text style={styles.footerNav}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
        </View>   
        
    </ScrollView>
  );
}

const getDynamicStyles = (theme) => StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
    backgroundColor: theme === 'dark' ? '#001833' : '#FFFFFF',
    minHeight: screenHeight,
  },
  navigationButtons: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  navButton: {
    fontSize: 16,
    color: theme === 'dark' ? '#00eaff' : '#001833',
    marginHorizontal: 10,
  },
  themeToggleContainer: {
    position: 'absolute',
    top: 70,
    right: 20,
  },
  themeToggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    backgroundColor: theme === 'dark' ? '#00eaff' : '#001833',
  },
  themeToggleText: {
    fontSize: 16,
    color: theme === 'dark' ? '#001833' : '#FFFFFF',
  },
  textContainer: {
    marginTop: 150,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 14,
    color: theme === 'dark' ? '#b0c7d9' : '#555555',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
    textAlign: 'left',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#00eaff' : '#001833',
    marginBottom: 30,
    textAlign: 'left',
    lineHeight: 62,
  },
  description: {
    fontSize: 16,
    color: theme === 'dark' ? '#b0c7d9' : '#555555',
    textAlign: 'left',
    marginBottom: 30,
    lineHeight: 24,
  },
  verifyButton: {
    backgroundColor: theme === 'dark' ? '#00eaff' : '#001833',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    marginBottom: 20,
    alignSelf: 'flex-start',
  },
  buttonText: {
    fontSize: 16,
    color: theme === 'dark' ? '#001833' : '#FFFFFF',
  },
  secondaryButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  secondaryText: {
    fontSize: 16,
    color: theme === 'dark' ? '#00eaff' : '#001833',
  },
  additionalContent: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  moreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#00eaff' : '#001833',
    marginBottom: 20,
  },
  additionalText: {
    fontSize: 16,
    color: theme === 'dark' ? '#b0c7d9' : '#555555',
    marginBottom: 15,
    lineHeight: 24,
  },
  howItWorksContainer: {
    marginTop: 50,
    paddingHorizontal: 20,
  },
  howItWorksTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#00eaff' : '#001833',
    marginBottom: 20,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  step: {
    alignItems: 'center',
    width: '23%',
  },
  icon: {
    fontSize: 40,
    marginBottom: 10,
    color: theme === 'dark' ? '#00eaff' : '#001833',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme === 'dark' ? '#00eaff' : '#001833',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: 14,
    color: theme === 'dark' ? '#b0c7d9' : '#555555',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: theme === 'dark' ? '#00003d' : '#f5f5f5',
  },
  footerLeft: {
    width: '60%',
  },
  footerText: {
    fontSize: 16,
    color: theme === 'dark' ? '#FFFFFF' : '#001833',
    marginBottom: 10,
  },
  footerButton: {
    backgroundColor: theme === 'dark' ? '#00eaff' : '#001833',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  footerButtonText: {
    fontSize: 16,
    color: theme === 'dark' ? '#001833' : '#FFFFFF',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerNav: {
    fontSize: 16,
    color: theme === 'dark' ? '#00eaff' : '#001833',
    marginHorizontal: 10,
  },
  imageContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
    opacity: 0.9,
  },
});

