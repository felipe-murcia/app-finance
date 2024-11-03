//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image,Dimensions } from 'react-native';
//import { registerForPushNotificationsAsync } from '../configs/token';
import { useState } from 'react';
import { FinanceService } from '../services/financeService';
import { colorBlack } from '../constant/styles';
const width2 = Dimensions.get("screen").width
const iconSizeButton = 30

export const  Report = () => {

  const financeService = new FinanceService();

  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', justifyContent:'space-between', width: width2-40, backgroundColor:'transparent',  marginTop:20, marginBottom:20}}>
            <TouchableOpacity >
                <Image source={require('../assets/images/actions/back.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton, tintColor:'transparent' }} />
            </TouchableOpacity>
            <Text style={styles.titleMonth}>Reporte </Text>
            <TouchableOpacity>
                <Image source={require('../assets/images/actions/calendar.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton }} />
            </TouchableOpacity>
        </View> 
  
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
