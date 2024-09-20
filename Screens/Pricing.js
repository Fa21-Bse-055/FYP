import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Image } from 'react-native';

export default function PricingPage() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => setIsDarkTheme(!isDarkTheme);

  const styles = createStyles(isDarkTheme);

  return (
    <View style={styles.container}>
      {/* Top navigation bar */}
      <View style={styles.navbar}>
        <Text style={styles.logo}>BLOCKCHAIN VERIFIED®</Text>
        <View style={styles.navLinks}>
          <Text style={styles.navItem}>Home</Text>
          <Text style={styles.navItem}>About</Text>
          <Text style={styles.navItem}>Pricing</Text>
          <Text style={styles.navItem}>Contact Us</Text>
          <Text style={styles.navItem}>Login</Text>
          <Text style={styles.tryForFree}>Try for free</Text>
        </View>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          thumbColor={isDarkTheme ? '#00eaff' : '#f4f3f4'}
          trackColor={{ false: '#767577', true: '#00eaff' }}
        />
      </View>

      {/* Pricing content */}
      <View style={styles.pricingContainer}>
        {/* Starter Plan */}
        <View style={styles.pricingCard}>
          <Text style={styles.pricingTitle}>Pay as you go Starter</Text>
          <Text style={styles.pricingDescription}>
            High level of security, traceability, and quality
          </Text>
          <View style={styles.priceBox}>
            <Text style={styles.pricingDetail}>200 credits - US$ 1,000</Text>
            <Text style={styles.pricingSubDetail}>Effective price: US$ 5 per document</Text>
          </View>
          <View style={styles.priceBox}>
            <Text style={styles.pricingDetail}>500 credits - US$ 2,000</Text>
            <Text style={styles.pricingSubDetail}>Effective price: US$ 4 per document</Text>
          </View>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact us</Text>
          </TouchableOpacity>
        </View>

        {/* Business Plan */}
        <View style={styles.pricingCard}>
          <Text style={styles.pricingTitle}>Pay as you go Business</Text>
          <Text style={styles.pricingDescription}>
            All the benefits of Starter, plus:
          </Text>
          <View style={styles.priceBox}>
            <Text style={styles.pricingDetail}>2000 credits - US$ 4,000</Text>
            <Text style={styles.pricingSubDetail}>Effective price: US$ 2 per document</Text>
          </View>
          <Text style={styles.feature}>Custom branding</Text>
          <Text style={styles.feature}>Multi-identity certification</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact us</Text>
          </TouchableOpacity>
        </View>

        {/* Enterprise Plan */}
        <View style={styles.pricingCard}>
          <Text style={styles.pricingTitle}>Enterprise</Text>
          <Text style={styles.pricingDescription}>
            Bespoke service individually tailored to Enterprise Customer requirements
          </Text>
          <Text style={styles.feature}>Custom branding</Text>
          <Text style={styles.feature}>Multi-identity certification</Text>
          <Text style={styles.feature}>Service level agreement</Text>
          <TouchableOpacity style={styles.contactButton}>
            <Text style={styles.contactButtonText}>Contact us</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footerContainer}>
      {/* Footer Main Section */}
      <View style={styles.footerMain}>
        <Text style={styles.footerTitle}>Start today with safely securing and verifying your documents</Text>
        <TouchableOpacity style={styles.footerButton}>
          <Text style={styles.footerButtonText}>Start your free trial now</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Links Section */}
      <View style={styles.footerLinks}>
        <Text style={styles.footerLinkText}>About</Text>
        <Text style={styles.footerLinkText}>Pricing</Text>
        <Text style={styles.footerLinkText}>Contact Us</Text>
        <Text style={styles.footerLinkText}>Cookie policy</Text>
        <Text style={styles.footerLinkText}>Terms of service</Text>
      </View>
    </View>
    </View>
  );
}

const createStyles = (isDarkTheme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: isDarkTheme ? '#001833' : '#f5f5f5',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: isDarkTheme ? '#001833' : '#fff',
    paddingHorizontal: 20,
  },
  logo: {
    color: isDarkTheme ? '#00eaff' : '#001833',
    fontWeight: 'bold',
    fontSize: 24,
  },
  navLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    color: isDarkTheme ? '#00eaff' : '#001833',
    marginHorizontal: 10,
    fontSize: 16,
  },
  tryForFree: {
    color: isDarkTheme ? '#00eaff' : '#001833',
    borderColor: isDarkTheme ? '#00eaff' : '#001833',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  pricingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  pricingCard: {
    backgroundColor: isDarkTheme ? '#002b5c' : '#fff',
    padding: 20,
    borderRadius: 10,
    width: '30%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: isDarkTheme ? '#00eaff' : '#001833',
  },
  pricingTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: isDarkTheme ? '#00eaff' : '#001833',
    marginBottom: 10,
  },
  pricingDescription: {
    fontSize: 14,
    color: isDarkTheme ? '#b0c7d9' : '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  priceBox: {
    backgroundColor: isDarkTheme ? '#001233' : '#d9e8f2',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  pricingDetail: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkTheme ? '#00eaff' : '#001833',
  },
  pricingSubDetail: {
    fontSize: 14,
    color: isDarkTheme ? '#b0c7d9' : '#333',
  },
  feature: {
    fontSize: 14,
    color: isDarkTheme ? '#00eaff' : '#001833',
    marginBottom: 10,
  },
  contactButton: {
    backgroundColor: isDarkTheme ? '#00eaff' : '#001833',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    color: isDarkTheme ? '#001833' : '#fff',
    fontWeight: 'bold',
  },
  footerContainer: {
    backgroundColor: '#001833', // Dark blue background color
    padding: 30,
    alignItems: 'center',
  },
  footerMain: {
    alignItems: 'center',
    marginBottom: 30,
  },
  footerLogo: {
    width: 80, // Set width as per your logo dimensions
    height: 80, // Set height as per your logo dimensions
    resizeMode: 'contain',
    marginBottom: 20,
  },
  footerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 20,
  },
  footerButton: {
    backgroundColor: '#00eaff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  footerButtonText: {
    fontSize: 16,
    color: '#001833', // Dark blue text color
    fontWeight: 'bold',
  },
  footerLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%', // Adjust the width according to the screen size
  },
  footerLinkText: {
    color: '#00eaff', // Cyan link color
    fontSize: 16,
  },
  freeTrialButton: {
    backgroundColor: '#00eaff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  freeTrialButtonText: {
    fontSize: 16,
    color: '#001833',
    fontWeight: 'bold',
  },
});
