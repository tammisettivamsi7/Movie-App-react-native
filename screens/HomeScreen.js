import React, { useState,useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput ,Image,ScrollView,StatusBar,TouchableOpacity} from 'react-native';
import axios from 'axios';
import sampleMovies from './movie.json';

const HomeScreen = ({ navigation }) => {
  

  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState(sampleMovies[0]);

  // useEffect(()=>{
  //    const fetchMovies = async () => {
  //       try {
  //           const response = await axios.get('http://localhost:3000/0');
  //           setMovies(response.data);
  
  //       } catch (error) {
  //           console.error(error);
  //       }
  //   };
  //   fetchMovies();
  // },[])

  const filteredMovies = {
  trending: movies.trending.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase())),
  upcoming: movies.upcoming.filter(movie => movie.title.toLowerCase().includes(searchQuery.toLowerCase())),
};

  return (
    
    <View style={styles.container}>
    <ScrollView showsVerticalScrollIndicator={false} >
    <Text style={styles.heading}>MovieBooking</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search movies..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Text style={styles.sectionTitle}>Trending Movies</Text>
      <FlatList
        data={filteredMovies.trending}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', 
              { movieId: item.id,
              movieName: item.title,
              movieImage: item.url,
              movieDescription:item.description,
              movieCast:item.cast,
              movieCrew:item.crew }) }>
             <Image source={ {uri:item.url }} style={styles.image} />
            </TouchableOpacity>
            <View style={styles.ratingItem}>
              <Image source ={{uri:item.star}} style={styles.star}/>
              <Text>{item.rating}</Text>
            </View>
           
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />

      <Text style={styles.sectionTitle}>Upcoming Movies</Text>
      <FlatList
        data={filteredMovies.upcoming}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MovieDetails', 
              { movieId: item.id,
              movieName: item.title,
              movieImage: item.url,
              movieDescription:item.description,
              movieCast:item.cast,
              movieCrew:item.crew }) }>
             <Image source={ {uri:item.url }} style={styles.image} />
            </TouchableOpacity>
            
            
          </View>
        )}
        horizontal
      />
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:16,
    paddingTop:StatusBar.currentHeight,
    backgroundColor: '#222',
  },
  searchBar: {
    marginBottom: 20,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 14,
    backgroundColor:'white'
  },
  item: {
    margin: 16,
  },
  title: {
    fontSize: 18,
    color:'white',
    textAlign:'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    color:'orange',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 8,
    borderRadius:15, 
  },
  heading:{
    textAlign:'center',
    fontSize:30,
    fontWeight:'bold',
    color:'#FB8117',
    marginBottom:10,
  },
  ratingItem:{
    borderRadius:5,
    width:50,
    backgroundColor:'white',
    flexDirection:'row',
    justifyContent:'space-around'
    
  },
  star:{
    height:20,
    width:20,
  }
});

export default HomeScreen;