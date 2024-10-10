import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Entypo } from '@expo/vector-icons';

import HomeScreen from './screens/HomeScreen.js';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import BookingScreen from './screens/BookingScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import Payment from './screens/Payment';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator>
              <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false,
tabBarLabel: 'Home',
tabBarIcon: () => (
        <Icon name="home" color={'orange'} size={25} />
      ) }} />
              <Tab.Screen name="MyBookings" component={MyBookingsScreen} options={{ headerShown: false ,
          tabBarLabel: 'Bookings',
           tabBarIcon: () => (
              <Entypo name="ticket" size={24} color="orange" /> 
             )}} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="Payment" component={Payment} />
        <Stack.Screen name="Confirmation" component={ConfirmationScreen} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;