import React,{ useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView,Alert } from 'react-native';

const MyBookingsScreen = ({ route }) => {
  const { movieName, movieImage, seats, price, date, time } =route?.params || {};

 


  if (!movieName) {
    return (
      <View style={styles.placeholderContainer}>
        <Text style={styles.placeholderText}>No booking details available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>My Booking</Text>
      <View style={styles.ticketBox}>
        <View style={styles.imageBox}>
          <Image source={{ uri: movieImage }} style={styles.image} />
        </View>
        <View style={styles.detailsBox}>
          <Text style={styles.details}>{movieName}</Text>
          <Text style={styles.details}>Seats: {seats?.join(', ')}</Text>
          <Text style={styles.details}>Total Amount: {price}</Text>
          <Text style={styles.details}>Date: {date}</Text>
          <Text style={styles.details}>Time: {time}</Text>
        </View>
      </View>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingTop: 30,
    backgroundColor: '#f5f5f5',
    margin:20,
  },
  ticketBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection:'row',
    justifyContent:'space-between'
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    height: 150,
    width: 150,
    borderRadius: 8,
    marginBottom: 16,
  },
  placeholderContainer:{
    flexGrow: 1,
    paddingTop: 30,
    backgroundColor: '#f5f5f5',
    margin:20,
  },
  placeholderText:{
    textAlign:'center',
  }
  
});

export default MyBookingsScreen;