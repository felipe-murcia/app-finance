import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
  TextInput,
} from "react-native";
import { useState } from "react";
import {
  colorBlack,
  colorExpense,
  colorIncome,
  colorSaving,
  radioCurve,
} from "../../constant/styles";
import { convertMoney } from "../../utils/convertMoney";
import { FinanceService } from "../../services/financeService";
import PickerMonth from "../PickerMonth/PickerMonth";
import { useDispatch, useSelector } from "react-redux";
import { IDate } from "../../interface/IDate";
import { RootState } from "../../storage/rootReducer";
import { monthsArray } from "../../constant/data";
import { WaveIndicator } from "react-native-indicators";

const width2 = Dimensions.get("screen").width;

const concepts = [
  {
    label: "Ingreso",
    value: "INCOME",
  },
  {
    label: "Egreso",
    value: "EXPENSE",
  },
  {
    label: "Ahorro",
    value: "SAVING",
  },
];

interface Props {
  visible: boolean;
  onSuccess: (data:any) => void; 
}

export const Form = ({ onSuccess }:Props) => {
  //const dispatch = useDispatch();

  const dataRedux = useSelector((state: RootState) => state.financeData);

  const [quantity, setQuantity] = useState<any>();
  const [concept, setConncept] = useState("EXPENSE");
  const [month, setMonth] = useState(dataRedux.month);
  const [year, setYear] = useState(dataRedux.year);
  const [name, setName] = useState();

  const [isShowCalendar, setIsShowCalendar] = useState(false);

  const handleSave = async () => {

    try {

      let amount = quantity.replace(/,/g, "");
      amount = amount.replace(/\$/g, "");
  
      const data: any = {
        name,
        concept,
        amount: parseInt(amount),
        month,
        year,
      };
  
      onSuccess(data)
      
    } catch (error) {
      console.log(error)
    }
 
 
  };

  const onSetCalendar = (date: IDate) => {
    setMonth(date.month);
    setYear(date.year);
  };

  const getMonth = (): string => {
    const filterMonth: any = monthsArray.filter((item) => item.value == month);
    let stringMonth = filterMonth[0]?.label || "Error";
    return stringMonth;
  };

  return (
    <View style={styles.boxBalance}>
      <PickerMonth
        month={month}
        year={year}
        visible={isShowCalendar}
        onClose={() => setIsShowCalendar(false)}
        onConfirm={(date: IDate) => onSetCalendar(date)}
      />
 

      <Text style={styles.subtitles2}>Nombre</Text>
      <TextInput
        style={styles.input}
        placeholder=""
        value={name}
        onChangeText={(value: any) => setName(value)}
      />

      <Text style={styles.subtitles2}>Concepto</Text>

      <View
        style={{
          backgroundColor: "#f1f3f2",
          borderRadius: 8,
          padding: 2,
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        {concepts.map((item, i) => {
          let isValue = item.value === concept;
          return (
            <TouchableOpacity onPress={() => setConncept(item.value)} key={i}>
              <View
                style={{
                  borderRadius: 8,
                  padding: 10,
                  backgroundColor: isValue ? colorBlack : "transparent",
                  paddingHorizontal: 20,
                }}
              >
                <Text
                  style={{
                    color: isValue ? "white" : colorBlack,
                    fontFamily: isValue ? "FontMedium" : "FontLight",
                    fontSize: 20,
                  }}
                >
                  {item.label}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.subtitles2}>Fecha</Text>

      <TouchableOpacity onPress={() => setIsShowCalendar(!isShowCalendar)}>
        <View
          style={[styles.input, { flexDirection: "row", alignItems: "center" }]}
        >
          <Image
            source={require("../../assets/images/actions/calendar.png")}
            resizeMode="contain"
            style={{ width: 20, height: 20, tintColor: colorBlack }}
          />
          <View style={{ width: 5 }} />
          <Text style={styles.textDate}>
            {getMonth()} {year}
          </Text>
        </View>
      </TouchableOpacity>

      <Text style={styles.subtitles2}>Valor cantidad</Text>
      <TextInput
        style={styles.input}
        placeholder="$"
        value={quantity}
        keyboardType="numeric"
        onChangeText={(value: any) => {
          let newValue = convertMoney(value);
          setQuantity(newValue);
        }}
      />

      <View style={{ height: 20 }}></View>

      <TouchableOpacity onPress={() => handleSave()}>
        <View
          style={{
            backgroundColor: colorBlack,
            borderRadius: 8,
            padding: 10,
            alignItems: "center",
          }}
        >
          <Text
            style={{ color: "white", fontFamily: "FontMedium", fontSize: 20 }}
          >
            Guardar
          </Text> 
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  boxBalance: {
    //flex: 1,
    width: width2 - 40,
    backgroundColor: "white",
    padding: 15,
    borderRadius: radioCurve,
  },
  subtitles: {
    fontFamily: "FontLight",
    fontSize: 20,
    color: "#646464",
  },
  titleMonth: {
    fontFamily: "FontLight",
    fontSize: 16,
    color: colorBlack,
    marginBottom: 5,
  },
  titleNumber: {
    fontFamily: "FontMedium",
    fontSize: 26,
    color: colorBlack,
    marginBottom: 10,
  },
  subCard: {
    flex: 16,
    padding: 8,
    borderRadius: radioCurve / 2,
    marginTop: 10,
  },
  subtitles2: {
    fontFamily: "FontLight",
    fontSize: 20,
    color: "#646464",
    marginTop: 10,
  },
  subtitleNumber: {
    fontFamily: "FontMedium",
    fontSize: 24,
    color: colorBlack,
  },
  input: {
    width: width2 - 70,
    backgroundColor: "#f1f3f2",
    height: 45,
    paddingLeft: 14,
    borderRadius: 8,
    fontSize: 24,
    marginTop: 5,
    fontFamily: "FontLight",
  },
  textDate: {
    fontFamily: "FontLight",
    fontSize: 22,
  },
});
