import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Svg, Circle, Path } from 'react-native-svg';
import { SofiaProLightAz } from '../../constant/fonts';

// Definimos el tipo para cada segmento de datos
type DonutSegment = {
  percentage: number;
  color: string;
};

// Props para el componente DonutChart
interface DonutChartProps {
  data: DonutSegment[];
  radius?: number;
  strokeWidth?: number;
}

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  radius = 100,
  strokeWidth = 20,
}) => {
  const circleCircumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;
  //radius = 180

  return (
    <View style={styles.container}>
       
      <Svg 
        height={(radius + strokeWidth) * 2}
        width={(radius + strokeWidth) * 2}
        viewBox={`0 0 ${(radius + strokeWidth) * 2} ${(radius + strokeWidth) * 2}`}
    >
       
 
        {data.map((segment, index) => {
          const percentage = segment.percentage;
          const strokeDashoffset =
            circleCircumference -
            (circleCircumference * percentage) / 100;
          const rotation = (cumulativePercentage * 360) / 100; // Rotación acumulada
          cumulativePercentage += percentage; // Actualizar el porcentaje acumulado

          return (
            <Circle
              key={index}
              cx={(radius + strokeWidth)}
              cy={(radius + strokeWidth)}
              r={radius}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
              strokeDasharray={circleCircumference}
              strokeDashoffset={strokeDashoffset}
              fill="none"
              rotation={-90 + rotation}
              //origin={`${radius}, ${radius}`}
              origin={`${radius + strokeWidth}, ${radius + strokeWidth}`}
            />
          );
        })}
      </Svg>
      <Text style={{ fontWeight:'bold', fontSize:48, position:'absolute', top: radius+10, left: radius}}>
            100%
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor:'white',
    borderRadius:10,
    //padding:10
    //justifyContent: 'center',
    //alignItems: 'center', 
  },
});
 

export default DonutChart;
