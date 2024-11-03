import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Alert } from 'react-native';
import { useState } from 'react';
import { colorBlack, colorExpense, colorIncome, colorSaving, radioCurve } from '../../constant/styles';
import { convertMoney } from '../../utils/convertMoney';
import { IFinance } from '../../interface/IFinance';

const width2 = Dimensions.get("screen").width

type Props = {
  data:IFinance;
  removeData: (value: string)  => void;
  key?: number;
};

const category:any = {
  INCOME: {
    color: colorIncome,
    image: require('../../assets/images/icons/income.png')
  },
  EXPENSE: {
    color: colorExpense,
    image: require('../../assets/images/icons/expense.png')
  },
  SAVING: {
    color: colorSaving,
    image: require('../../assets/images/icons/saving.png')
  },
}


export const ItemFinance = ({data, removeData = () => {}, key = 0}: Props) => {

  const [ showDelete, setShowDelete ] = useState(false);

  const confirmDelete = async () => {
    Alert.alert(
        "Eliminar "+data.name,
        "¿Estás seguro de que quieres eliminar?",
        [
          {
            text: "Si",
            onPress: () => removeData(data.objectId)
          },
          {
            text: "No",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          }, 
        ]
      );
}
  
  return (
    <View style={styles.boxItem} key={data.objectId}>
        <View style={styles.headerBalance}>
            <View style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                <View style={[styles.iconCircle,{ backgroundColor: category[data.concept]?.color }]}>
                  <Image source={category[data.concept]?.image} resizeMode="contain" style={{width:28, height:28, tintColor:"#646464"}}/>
                </View>
                <View>
                  <Text style={styles.subtitles}>{data.name} </Text>
                  <Text style={styles.number}>{convertMoney(data.amount)} </Text>
                </View>
            </View>
            {
              !showDelete? 
              <TouchableOpacity onPress={()=>setShowDelete(true)}>
                <Image source={require('../../assets/images/actions/more.png')} resizeMode="contain" style={{width:24, height:24, tintColor:colorBlack}}/>
              </TouchableOpacity>
              :
              <View style={{flexDirection:'row'}}>
                <TouchableOpacity onPress={()=>confirmDelete()}>
                  <Image source={require('../../assets/images/actions/trash.png')} resizeMode="contain" style={{width:24, height:24, tintColor:colorBlack}}/>
                </TouchableOpacity>
                <View style={{width:10}} />
                <TouchableOpacity onPress={()=>setShowDelete(false)}>
                  <Image source={require('../../assets/images/actions/close.png')} resizeMode="contain" style={{width:24, height:24, tintColor:colorBlack}}/>
                </TouchableOpacity>
              </View>
            }
        </View> 
    </View>
  );
}

const styles = StyleSheet.create({
  boxItem: {
    //flex: 1,
    width: width2-40,
    backgroundColor: 'white',
    paddingVertical:6,
    paddingHorizontal:15,
    borderRadius: radioCurve,
    marginTop:10,
  },
  subtitles:{
    fontFamily:'FontLight',
    fontSize:20,
    color:"#646464",
  },
  number:{
    fontFamily:'FontMedium',
    fontSize:20,
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
  },
  iconCircle:{
    width:42, height:42, borderRadius:50, alignItems:'center', justifyContent:'center',
    marginRight:5
  }
});
