import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet,Alert } from 'react-native';

const BookingScreen = ({ navigation, route }) => {
  const { movieId, movieName, movieImage } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const seatRows = [
    ['A1', 'A2', 'A3', 'A4', 'A5', 'A6'],
    ['B1', 'B2', 'B3', 'B4', 'B5', 'B6'],
    ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    ['D1', 'D2', 'D3', 'D4', 'D5', 'D6'],
    ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
  ];

  const timings = ['10:30 AM', '2:30 PM', '6:30 PM', '9:30 PM'];

  const toggleSeatSelection = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      setSelectedSeats([...selectedSeats, seat]);
    }
  };


  //selectedSeats[e1,e2]
  //seat=e1 s=e2
  //filter[e2]
  //selectedSeats[e2]

  const generateNextDates = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toLocaleDateString());
    }
    return dates;
  };
 const dates = generateNextDates();

  
  const calculateTotalPrice = () => {
    const pricePerSeat = 200; 
    return selectedSeats.length * pricePerSeat;
  };

  const validate = () => {
    if(selectedSeats.length === 0)
    {
      Alert.alert("Selection Error", "Please select at least one seat before proceeding.");
    }
    else if(!selectedDate)
    {
      Alert.alert("Selection Error","please select the date");
    }
    else if(!selectedTime)
    {
      Alert.alert("Selection Error","please select the Time");
    }
    else{
      navigation.navigate('Payment',{   movieId, 
      movieName, 
      movieImage, 
      price: calculateTotalPrice(), 
      seats: selectedSeats,
      time:selectedTime,
      date:selectedDate,
      })
    }

  }
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Screen This Side</Text>
      <View
        style={{
          borderBottomColor: 'white',
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 20,
        }}
      />
      <FlatList
        data={seatRows}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            {item.map((seat) => (
              <TouchableOpacity
                key={seat}
                style={[
                  styles.seat,
                  selectedSeats.includes(seat) ? styles.selectedSeat : styles.availableSeat,
                ]}
                onPress={() => toggleSeatSelection(seat) }
              >
                <Text style={styles.seatText}>{seat}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

      <View style={styles.dateContainer}>
        <FlatList
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.dateButton,
                selectedDate === item && styles.selectedDateButton,
              ]}
              onPress={() => setSelectedDate(item)}
            >
              <Text style={styles.dateText}>{item}</Text>
            </TouchableOpacity>
          )}
          horizontal={true} 
        />
      </View>


      <View style={styles.timeContainer}>
        {timings.map((time) => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeButton,
              selectedTime === time && styles.selectedTimeButton,
            ]}
            onPress={() => setSelectedTime(time)}
          >
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.price}>Total Price: ₹{calculateTotalPrice()}</Text>

      
      <TouchableOpacity onPress={ validate } 
style={styles.buttonContainer} >
      <Text style={styles.book}>Confirm Booking</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#222',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  seat: {
    width: 40,
    height: 40,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  availableSeat: {
    backgroundColor: '#444',
  },
  selectedSeat: {
    backgroundColor: '#ff7f50',
  },
  seatText: {
    color: '#fff',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },

  dateButton: {
    padding: 10,
    margin: 4,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  selectedDateButton: {
    backgroundColor: '#ff7f50',
  },
  dateText: {
    color: '#fff',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timeButton: {
    padding: 10,
    margin: 4,
    borderRadius: 4,
    backgroundColor: '#444',
  },
  selectedTimeButton: {
    backgroundColor: '#ff7f50',
  },
  timeText: {
    color: '#fff',
  },
  price: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  buttonContainer:{
    height:40,
    width:200,
    backgroundColor:'orange',
    borderRadius:10,
    justifyContent:'center',
    alignSelf:'center'

  },
  book:{
    textAlign:'center',
    color:'white',
  }
});

export default BookingScreen;
