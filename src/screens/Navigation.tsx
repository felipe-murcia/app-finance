
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Main } from "./Main"
import { useFonts } from 'expo-font';
import { Add } from './Add';
import { Report } from './Report';
import { NavBar } from '../components/NavBar/NavBar';
import { useState } from 'react';

export const Navigation = () => {

    const [ menu, setMenu ] = useState<number>(1)

    const [loaded] = useFonts({
        FontLight: require('../assets/fonts/SofiaProLightAz.otf'),
        FontMedium: require('../assets/fonts/SofiaProMediumAz.otf'),
    });
    
    if (!loaded) {
        return null;
    }
    
  return (
    <View style={{ backgroundColor: '#f1f3f2', flex:1}}>
        <ScrollView>
            <View style={styles.container}>
                {
                    menu == 1 ? <Main handleAdd={()=>setMenu(2)}/> 
                    : menu == 2 ? <Add handleBack={()=>setMenu(1)}/>
                    : menu == 3 ? <Report />
                    : <Text>Not avalaible</Text>
                }
            </View>
        </ScrollView>
        <NavBar onClickMenu={(value:number)=>setMenu(value)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,
    backgroundColor: '#f1f3f2',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
