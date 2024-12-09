//import { StatusBar } from 'expo-status-bar';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
//import { registerForPushNotificationsAsync } from '../configs/token';
import { useEffect, useState } from "react";
import { FinanceService } from "../services/financeService";
import {
  colorExpense,
  colorExpenseChart,
  colorGrayLight,
  colorIncome,
  colorIncomeChart,
  colorSaving,
  colorSavingChart,
} from "../constant/styles";
const width2 = Dimensions.get("screen").width;
const iconSizeButton = 30;
import Svg, { Path, Circle } from "react-native-svg";
import DonutsChart from "../components/DonutsChart/DonutsChart";
import { monthsArray } from "../constant/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../storage/rootReducer";
import { IDate } from "../interface/IDate";
import { convertMoney } from "../utils/convertMoney";
import { colorBlack } from '../constant/styles';

export const Report = () => {
  const financeService = new FinanceService();
  const dispatch = useDispatch();

  const [isShowCalendar, setIsShowCalendar] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { month, year, finances } = useSelector(
    (state: RootState) => state.financeData
  );
  const [dataCharts, setDataCharts] = useState([]);

  useEffect(() => {
    getFinanceChart();
  }, []);

  const getFinanceChart = async () => {
    const totalExpense = finances
      .filter((item) => item.concept === "EXPENSE") // Filtrar por concepto
      .reduce((sum, item) => sum + item.amount, 0);

    const totalSaving = finances
      .filter((item) => item.concept === "SAVING") // Filtrar por concepto
      .reduce((sum, item) => sum + item.amount, 0);

    const totalIncome = finances
      .filter((item) => item.concept === "INCOME") // Filtrar por concepto
      .reduce((sum, item) => sum + item.amount, 0);

    const totalAll = totalExpense + totalIncome + totalSaving;

    const newData:any = [
      {
        label: "Ingresos",
        value: totalIncome,
        percentage: (totalIncome / totalAll) * 100,
        color: colorIncomeChart,
      },
      {
        label: "Ahorros",
        value: totalSaving,
        percentage: (totalSaving / totalAll) * 100,
        color: colorSavingChart,
      },
      {
        label: "Gastos",
        value: totalExpense,
        percentage: (totalExpense / totalAll) * 100,
        color: colorExpenseChart,
      },
    ];
    setDataCharts(newData);
  };

  const data = [
    { percentage: 50, color: colorIncomeChart },
    { percentage: 20, color: colorSavingChart },
    { percentage: 30, color: colorExpenseChart },
  ];

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: width2 - 40,
          backgroundColor: "transparent",
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity>
          <Image
            source={require("../assets/images/actions/back.png")}
            resizeMode="contain"
            style={{
              width: iconSizeButton,
              height: iconSizeButton,
              tintColor: "transparent",
            }}
          />
        </TouchableOpacity>
        <Text style={styles.titleMonth}>Reporte </Text>
        <TouchableOpacity>
          <Image
            source={require("../assets/images/actions/calendar.png")}
            resizeMode="contain"
            style={{ width: iconSizeButton, height: iconSizeButton }}
          />
        </TouchableOpacity>
      </View>

      <View style={{backgroundColor:'white', alignItems:'center'}}>
        <DonutsChart data={dataCharts} radius={120} strokeWidth={40} />

        <View>
        {
          dataCharts.map((item:any)=>{
            return(
              <View style={{flexDirection:'row', margin:10, alignItems:'center'}}>
                <View style={{backgroundColor:item.color, borderRadius:50, width:42, height: 42, flexDirection:'row', justifyContent:'center', alignItems: 'center' }}>
                  <View style={{backgroundColor:'white', borderRadius:50, width:37, height: 37,  flexDirection:'row', justifyContent:'center', alignItems: 'center' }}>
                    <Text>{item.percentage?.toFixed(1)}%</Text>
                  </View>
                </View>
                <View style={{width:10}}/>
                <View>
                  <Text style={styles.subtitles}>{item.label}</Text>
                  <Text style={styles.number}>{convertMoney(item.value)}</Text>
                </View>
              </View>
            )
          })
        }
        </View>
        <View style={{height:20}}/>
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    //justifyContent: 'center',
  },
  container2: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  titleMonth: {
    fontFamily: "FontMedium",
    fontSize: 26,
    color: colorBlack,
    marginBottom: 10,
  },
  subtitles:{
    fontFamily:'FontLight',
    fontSize:20,
    color:colorGrayLight,
  },
  number:{
    fontFamily:'FontMedium',
    fontSize:20,
    color:colorBlack
  },
});
