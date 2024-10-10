import React from 'react'
import {View,Text,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView,Platform} from 'react-native';
import { useState } from 'react';
import { RadioButton } from 'react-native-paper'; 
import Icon from 'react-native-vector-icons/MaterialIcons';

const Payment =({route,navigation})=>{
  const {movieId, movieName, movieImage, price, seats,date,time}= route.params;
  const [selectedValue, setSelectedValue] = useState('option1');
  const [details,setDetails] = useState({
    cardNumber:'',
    cardName:'',
    expireDate:'',
    cvv:''
  })
  const [upiId,setUpiId] = useState('');
  const [errors,setErrors] = useState({
    cardNumber:'',
    cardName:'',
    expireDate:'',
    cvv:'',
    upiId: ''
  })
  

  

  const handleInputChange = (name, value) => {
    setDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
    
    if(name === "cardNumber" )

    {
      if(value.length != 16 && value.length != 0)
      {
      setErrors((prevState) => ({
        ...prevState,
        cardNumber: 'cardNumber must be 16 Numbers.',
      }))
      
    }
    
    
    else{
      setErrors(prevState => ({
        ...prevState,
        cardNumber: '',
      }));
    }
  }

  else if(name === "cardName")
    {
      if(value.length < 3 && value.length != 0)
      {
       setErrors((prevState) => ({
        ...prevState,
        cardName: 'Cardholder Name must be atleast 3 characters.',
      }))
    }
    else{
        setErrors(prevState => ({
        ...prevState,
        cardName: '',
      }));
    }
    }

    else if(name === "cvv")
    {
      if(value.length != 3 && value.length != 0)
      {
        setErrors((prevState) => ({
        ...prevState,
        cvv: 'CVV must be 3 numbers.',
      }))
      }
      else
      {
        setErrors((prevState) => ({
        ...prevState,
        cvv: '',
      }))
      }
    }

    
  };

  const handleExpirationDateChange = (text) => {
  let newText = text.replace(/[^0-9]/g, '');
  if (newText.length >= 2) {
    const month = parseInt(newText.substring(0, 2), 10); 
    if (month < 1 || month > 12) {
      return; 
    }
  }
  if (newText.length > 2) {
    newText = newText.substring(0, 2) + '/' + newText.substring(2, 4);
  }
  newText = newText.substring(0, 5);
   handleInputChange('expireDate', newText);
  
}

const validateUpiId = (newUpiId) => {
  setUpiId(newUpiId); 
  const upiRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/; 
 if (!upiRegex.test(newUpiId) && (newUpiId.length != 0)) {
    setErrors(prevErrors => ({ ...prevErrors, upiId: 'Invalid UPI ID.' }));
  } else {
    setErrors(prevErrors => ({ ...prevErrors, upiId: '' })); 
  }
};

const handleSubmit = () => {

  if (selectedValue === "option1") {
    const { cardNumber, cardName, expireDate, cvv } = details;
    const errorValues = Object.values(errors);
    const hasErrors = errorValues.some(error => error !== '');

    if (!cardNumber || !cardName || !expireDate || !cvv || hasErrors) {
      alert("Please fill all the fields correctly.");
      return;
    }
  }

  if (selectedValue === "option2") {
  
    if (!upiId || errors.upiId)
    { 
    alert("Please enter your UPI ID correctly.");
    return;
    }
  }
  
  navigation.navigate('Confirmation', {
    movieName,
    movieImage,
    price,
    seats,
    date,
    time
  });
};


return(
 <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      
  <Text style={styles.heading}>Payment Details</Text>

  <View style={styles.radioGroup}> 
    <View style={styles.radioButton}> 
      <RadioButton.Android 
        value="option1"
        status={selectedValue === 'option1' ?  
                'checked' : 'unchecked'} 
                onPress={() => setSelectedValue('option1')} 
                color="orange" /> 
      <Text style={styles.radioLabel}>Card Payment</Text>
    </View>
  
    <View style={styles.radioButton}> 
      <RadioButton.Android 
        value="option2"
        status={selectedValue === 'option2' ?  
        'checked' : 'unchecked'} 
        onPress={() => setSelectedValue('option2')} 
        color="orange"/> 
      <Text style={styles.radioLabel}>UPI</Text> 
    </View> 
  </View>

   { selectedValue === "option1" && (
   <View>
   <Text style={styles.text}>Card Number</Text>
   <TextInput style={styles.inputText} 
   keyboardType="numeric" value={details.cardNumber} 
    onChangeText={(value) => handleInputChange('cardNumber', value)} />
     {errors.cardNumber && <Text style={styles.error}>{errors.cardNumber}</Text>}

   <Text style={styles.text}>Cardholder Name</Text>
   <TextInput style={styles.inputText} value={details.cardName} 
    onChangeText={(value) => handleInputChange('cardName', value)}/>
    {errors.cardName && <Text style={styles.error}>{errors.cardName}</Text>} 

   <Text style={styles.text}>Expiration Date(MM/YY) </Text>
   <TextInput style={styles.inputText} keyboardType="numeric" 
   value={details.expireDate} 
   onChangeText={handleExpirationDateChange}/>
   

   <Text style={styles.text} >CVV Code</Text>
   <TextInput style={styles.inputText} keyboardType="numeric" 
   value={details.cvv} 
   onChangeText={(value) => handleInputChange('cvv', value)} />
   {errors.cvv && <Text style={styles.error}>{errors.cvv}</Text>}
   </View>
   )
   }

   {selectedValue === "option2" && (
     <View style={styles.upiBox}>
     <Text style={styles.text}>UPI ID</Text>
     <TextInput style={styles.inputText} value={upiId} 
     onChangeText={validateUpiId} />
     {errors.upiId && <Text style={styles.error}>{errors.upiId}</Text>}
     </View>
   )
   }

   <TouchableOpacity onPress={handleSubmit} style={styles.buttonContainer}>
  <Text style={styles.textButton}>Pay ₹{price}</Text>
</TouchableOpacity>
   <View style={styles.secureBox}>
   <Icon name="https" size={10} color="green" />
   <Text style={styles.secureText}>Your payment details are secure and encrypted </Text>
   </View>

</KeyboardAvoidingView>
)
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 16,
    backgroundColor:'#222'
  },
  inputText:{
    width:'100%',
    borderRadius:10,
    backgroundColor:'#444',
    height:40,
    marginBottom:10,
    color:'white',
    padding:10,
  },
  heading:{
    color:'white',
    fontSize:20,
    fontFamily:'bold',
    marginBottom:20,
  },

  buttonContainer:{
    backgroundColor:'orange',
    width:200,
    height:40,
    borderRadius:10,
    alignSelf:'center',
    justifyContent:'center',
    marginVertical:10,
  },
  textButton:{
    color:'white',
    textAlign:'center',
  },
  text:{
    color:'white',
    marginBottom:5,
  },
  secureBox:{
    flexDirection:'row',
    justifyContent:'center',
  },
  secureText:{
    fontSize:10,
    color:'green',
  },
  radioGroup: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-around',  
        borderRadius: 8, 
        backgroundColor: 'white', 
        padding: 16, 
        elevation: 4, 
        marginBottom:10,
    }, 
    radioButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    }, 
    radioLabel: { 
        marginLeft: 8, 
        fontSize: 16, 
        color: '#333', 
    }, 
    error: {
    color: 'red',
    fontSize: 12,
  },

})


export default Payment;