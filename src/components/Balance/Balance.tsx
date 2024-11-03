import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from 'react-native';
import { useState } from 'react';
import { colorBlack, colorExpense, colorIncome, colorSaving, radioCurve } from '../../constant/styles';
import { useSelector } from 'react-redux';
import { monthData, monthsArray } from '../../constant/data';
import { IFinance } from '../../interface/IFinance';
import { RootState } from '../../storage/rootReducer';
import { convertMoney } from '../../utils/convertMoney';

const width2 = Dimensions.get("screen").width

export const  Balance = () => {

    const { month, year, finances }   = useSelector((state:RootState) => state.financeData);

    const getValueTotal = (concept:string) => {
        // Filtrar ingresos y sumar
        const totalValue = finances
        .filter((item:IFinance) => item.concept === concept)  
        .reduce((sum, item) => sum + item.amount, 0);  
        return totalValue
    }

  let totalIncome  = getValueTotal("INCOME")
  let totalExpense = getValueTotal("EXPENSE")
  let totalSaving  = getValueTotal("SAVING")

  return (
    <View style={styles.boxBalance}>
        <View style={styles.headerBalance}>
            <View>
                <Text style={styles.subtitles}>Total Balance </Text>
                <Text style={styles.titleNumber}>{convertMoney(totalIncome-(totalExpense+totalSaving))} </Text>
            </View>
            <View style={{alignItems:'flex-end'}}>
                
                <Image source={require('../../assets/images/icons/wallet.png')} resizeMode="contain" style={{width:30, height:30, tintColor:"#646464"}}/>
            </View>
        </View>

        <View style={styles.headerBalance}>
            <View style={[styles.subCard,{ backgroundColor:colorIncome}]}>
                <View style={styles.headerBalance}>
                    <Text style={styles.subtitles2}>Ingresos</Text>
                    <Image source={require('../../assets/images/icons/income.png')} resizeMode="contain" style={{width:18, height:18}}/>
                </View>
                <Text style={styles.subtitleNumber}>{convertMoney(totalIncome)} </Text>
            </View>
            <View style={{flex:1}} />
            <View style={[styles.subCard,{ backgroundColor:colorExpense}]}>
                <View style={styles.headerBalance}>
                    <Text style={styles.subtitles2}>Gastos</Text>
                    <Image source={require('../../assets/images/icons/expense.png')} resizeMode="contain" style={{width:18, height:18}}/>
                </View>
                <Text style={styles.subtitleNumber}>{convertMoney(totalExpense)}</Text>
            </View>
        </View>

        <View style={styles.headerBalance}>

            <View style={[styles.subCard,{ backgroundColor:colorSaving}]}>
                <View style={styles.headerBalance}>
                    <Text style={styles.subtitles2}>Ahorro</Text>
                    <Image source={require('../../assets/images/icons/saving.png')} resizeMode="contain" style={{width:18, height:18}}/>
                </View>
                <Text style={styles.subtitleNumber}>{convertMoney(totalSaving)} </Text>
            </View>
        </View>

    </View>
  );
}

const styles = StyleSheet.create({
    boxBalance: {
    //flex: 1,
    width: width2-40,
    backgroundColor: 'white',
    padding:15,
    borderRadius: radioCurve
  },
  subtitles:{
    fontFamily:'FontLight',
    fontSize:20,
    color:"#646464"
  },
  titleMonth:{
    fontFamily:'FontLight',
    fontSize:16,
    color: colorBlack,
    marginBottom:5
  },
  titleNumber:{
    fontFamily:'FontMedium',
    fontSize:36,
    color:colorBlack
  },
  headerBalance:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  subCard:{
    flex:16,
    padding:8,
    borderRadius: radioCurve/2,
    marginTop:10
  },
  subtitles2:{
    fontFamily:'FontLight',
    fontSize:20,
    color:"#646464"
  },
  subtitleNumber:{
    fontFamily:'FontMedium',
    fontSize:24,
    color:colorBlack
  }
});
