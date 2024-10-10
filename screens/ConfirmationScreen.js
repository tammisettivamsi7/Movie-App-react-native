import React from 'react';
import { View, Text, StyleSheet,Image,ImageBackground,TouchableOpacity} from 'react-native';
import confirm1 from '../verified-account.gif';

const ConfirmationScreen = ({ navigation,route }) => {
  const { movieId, movieName,movieImage,seats,price,date,time } = route.params;

  return (
    <View style={styles.container}>
    
     <Image source = {confirm1} style={styles.gif}/>
     <Text style={styles.title}>Booking Confirmed!</Text>

     <View style={styles.ticketBox}>
     <Image source={{ uri: movieImage }} style={styles.image} />
     
     <ImageBackground source={{uri:'https://cdn1.iconfinder.com/data/icons/multimedia-1-2/128/32-512.png'}} imageStyle= 
{{opacity:0.2}} resizeMode='contain' style={styles.backimage}>
      <Text style={styles.movieTitle}>{movieName}(U/A)</Text>
      <Text style={styles.details}>Seats: {seats.join(', ')} </Text>
      <Image source={{uri:'https://th.bing.com/th/id/R.5dd740df07b9b71c1900fe1f009b5845?rik=hHyjsZ4cGmg%2b4g&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f2%2fQR-Code-PNG-Photo.png&ehk=Fz4%2f2JKWiq5HEusCABN9aJeWXYaoxhsfzPgiDfEtdSc%3d&risl=&pid=ImgRaw&r=0'}} style={{height:80,width:80}} />
      <Text style={styles.details}>{date} | {time}</Text>
      </ImageBackground>
      <View style={styles.cancelBox}>
      <Text style={styles.cancelText}>Cancellation unavailable : cut-off time of 4 hrs before showtime has passed</Text>
      </View>
      <Text style={styles.amountBox}>Total amount: {price}</Text>
    
      </View>
      <TouchableOpacity onPress={()=>navigation.navigate('MyBookings',{
      movieName,
      movieImage,
      seats,
      price,
      date,
      time

      })} style={styles.myBookingButton}>
      <Text style={styles.bookText}>Back To Bookings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#222',
  },
  
  title: {
    fontSize: 24,
    marginBottom: 16,
    color:'green'
  },
  details: {
    fontSize: 18,
    marginBottom: 8,
    color:'black',
    fontFamily:'monospace',
  },
  image:{
    height:150,
    width:150,
    borderRadius:8,
    elevation:10,
    shadowColor:'black',
    resizeMode:'contain',
  },
  gif:{
    height:80,
    width:80,
  },
  ticketBox:{
    height:450,
    width:300,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation:8,
    shadowColor: 'red',
    alignItems:'center',
    justifyContent:'center',
    marginBottom:20,
  },
  movieTitle:{
    fontSize: 20,
    marginBottom: 8,
    color:'black',
    fontFamily:'monospace',
    fontWeight:'bold',
  },
  backimage:{
    justifyContent:'center',
    alignItems:'center',
  },
  cancelBox:{
    width:300,
    backgroundColor:'#CECECE',
    marginBottom:20,
  },
  cancelText:{
    fontSize:12,
    alignSelf:'center'
  },
  amountBox:{
    fontSize: 18,
    fontWeight:'bold',
  },
  myBookingButton:{
    backgroundColor:'orange',
    borderRadius:10,
    height:40,
    width:150,
    justifyContent:'center',
  },
  bookText:{
    color:'white',
    textAlign:'center',
    fontWeight:'bold',
  }
  
});

export default ConfirmationScreen;
