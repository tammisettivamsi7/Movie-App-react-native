import React from 'react';
import { View, Text, Button, StyleSheet, Image,ScrollView,TouchableOpacity } from 'react-native';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { movieId, movieName, movieImage ,movieDescription,movieCast,movieCrew} = route.params;

  const movie = {
    id: movieId,
    title: movieName,
    image: movieImage,
    description:movieDescription,
    cast:movieCast,
    crew:movieCrew
  };

  return (
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>{movie.title}</Text>
      <Image source={{ uri: movie.image }} style={styles.image} />
      <Text style={styles.description}>{movie.description}</Text>

      <Text style={styles.heading}>Cast:</Text>
      {movie.cast.map((castMember, index) => (
        <View key={index} style={styles.detailsBox}>
          <Text style={styles.names}>{castMember}</Text>
        </View>
      ))}

      <Text style={styles.heading}>Cast:</Text>
      {movie.crew.map((crewMember,index)=>{
        return(
        <View key={index} style={styles.detailsBox}>
        <Text style={styles.names}>{crewMember}</Text>
        </View>
        )
      })

      }
      </ScrollView>
       <TouchableOpacity onPress={() => navigation.navigate('Booking', { movieId: movie.id ,movieName: movie.title,movieImage:movie.image})} style={styles.button}>
       <Text style={styles.book}>Book Now</Text>
       </TouchableOpacity>
      
      </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'#222'
  },
  title: {
    fontSize: 24,
    marginBottom: 8,
    color:'white',
    textAlign:'center'
  },
  description: {
    fontSize: 16,
    marginBottom: 16,
    color:'white',
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 8, 
    resizeMode:'contain',
  },
  names:{
    color:'white',
  },
  detailsBox: {
    padding: 2,
    color:'white',

  },
  heading:{
    color:'yellow',
  },
  button: {
    backgroundColor: 'orange',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20,
    padding: 10,
    borderRadius:10,
  },
  book: {
    color: 'white',
  },
  
});

export default MovieDetailsScreen;