//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image,Dimensions } from 'react-native';
//import { registerForPushNotificationsAsync } from '../configs/token';
import { useState } from 'react';
import { Form } from '../components/Form/Form';
import { FinanceService } from '../services/financeService';
import { colorBlack } from '../constant/styles';
const width2 = Dimensions.get("screen").width
const iconSizeButton = 30

interface Props{
  handleBack?:() => void;
}

export const  Add = ({ handleBack = () => {} }:Props) => {

  const financeService = new FinanceService();
 
  const handleSave = async (data:any) =>{
    try {      
      const response = await financeService.post(data);
      if(response.objectId) handleBack()
      console.log(response.objectId)
    } catch (error) {
      alert("Error :"+error)
      console.log("Error add ",error)
    }
  }

  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width: width2-40, backgroundColor:'transparent',  marginTop:20, marginBottom:20}}>
            <TouchableOpacity onPress={()=>handleBack()}>
                <Image source={require('../assets/images/actions/back.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton }} />
            </TouchableOpacity>
            <Text style={styles.titleMonth}>Registrar </Text>
            <TouchableOpacity>
                <Image source={require('../assets/images/actions/add.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton, tintColor:'transparent' }} />
            </TouchableOpacity>
        </View>
      <Form onSuccess={(data: any) => handleSave(data)} visible={false}/>
  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    //justifyContent: 'center',
  },
  titleMonth:{
    fontFamily:'FontMedium',
    fontSize:26,
    color:colorBlack,
    marginBottom:10
  },
});
