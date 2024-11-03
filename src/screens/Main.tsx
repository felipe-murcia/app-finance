//import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Image,Dimensions, Alert } from 'react-native';
//import { registerForPushNotificationsAsync } from '../configs/token';
import { useEffect, useState } from 'react';
import { Balance } from '../components/Balance/Balance';
import { ItemFinance } from '../components/ItemFinance/ItemFinance';
import { FinanceService } from '../services/financeService';
import { IFinance } from '../interface/IFinance';
import { useDispatch, useSelector } from 'react-redux';
import { colorBlack } from '../constant/styles';
import { monthsArray } from '../constant/data';
import { RootState } from '../storage/rootReducer';
import { IDate } from '../interface/IDate';
import PickerMonth from '../components/PickerMonth/PickerMonth';
const width2 = Dimensions.get("screen").width
const iconSizeButton = 30

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
  } from 'react-native-indicators';

//<Image source={require('../assets/images/logo.png')} resizeMode="contain" style={{width:100, height:50 }} />

interface Props{
    handleAdd?:() => void;
}

export const  Main = ({ handleAdd = () => {} }:Props) => {

    const [ isShowCalendar, setIsShowCalendar ] = useState(false);
    const [ isLoading, setLoading ] = useState(false);
    const { month, year, finances }   = useSelector((state:RootState) => state.financeData);
 
    const dispatch = useDispatch(); 

    const financeService = new FinanceService();

    useEffect(()=>{
        getFinance({month,year})
    },[])

    const getMonth = ():string => {
        const filterMonth:any = monthsArray.filter((item)=>item.value==month);
        let stringMonth = filterMonth[0]?.label || "Error";
        return stringMonth.substring(0, 3);
      }

    const getFinance = async (date:IDate) => {
        try {
            setLoading(true);
            let listFinance:any = await financeService.get(`?where=%7B%20%22month%22%3A%20${date.month}%2C%20%22year%22%3A%20${date.year}%7D`);
            if(listFinance.results)  dispatch({ type: 'SET_FINANCES', payload: listFinance.results }); 
            //console.log('response',listFinance)
        } catch (error) {
            console.log('GET FINANCE',error)
        } finally {
            setLoading(false);
        }
    }

    const onSetCalendar = (date:IDate) =>{
        dispatch({ type: 'SET_MONTH', payload: date.month }); 
        dispatch({ type: 'SET_YEAR', payload: date.year });
        getFinance(date)
    }

    const removeData = async (objectId:string) => {        
        try {
            let res:any = await financeService.delete(objectId); 
            getFinance({ month, year})
        } catch (error) {
            console.log('DELETE FINANCE',error)
        }
    }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity onPress={()=>handleAdd()}>
                <Image source={require('../assets/images/actions/add.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton }} />
            </TouchableOpacity>

            <Text style={styles.titleMonth}>{getMonth()} {year} </Text>
            <TouchableOpacity onPress={()=>setIsShowCalendar(!isShowCalendar)}>
                <Image source={require('../assets/images/actions/calendar.png')} resizeMode="contain" style={{width:iconSizeButton, height:iconSizeButton }} />
            </TouchableOpacity>
        </View>

        <PickerMonth visible={isShowCalendar} onClose={()=>setIsShowCalendar(false)} onConfirm={(date: IDate)=>onSetCalendar(date)} />

        <Balance />
 

      {
        isLoading ? <View style={{padding:50}}>
                <WaveIndicator color={colorBlack} />
            </View>
        :finances?.map((item:IFinance,i)=>{
            return(
                <ItemFinance data={item} removeData={(value:string)=>removeData(value)} />
            )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    paddingBottom:80
    //justifyContent: 'center',
  },
  titleMonth:{
    fontFamily:'FontMedium',
    fontSize:26,
    color:colorBlack,
    marginBottom:10
  },
  header:{
    flexDirection:'row', 
    justifyContent:'space-between', 
    width: width2-40, 
    backgroundColor:'transparent',  
    marginTop:20, 
    marginBottom:10
  }
});
