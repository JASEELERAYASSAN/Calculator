import React, { useState } from 'react'
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function App() {

  const [resultTexts, setResultText] = useState('')
  const [calcText, setCalcText] = useState('')

  const onClickButton = (text) => {
    if (text === '=') {
      return calculation();
    }
    setResultText(resultTexts + text)
  }

  const calculation = () => {
    try {
      // Use JavaScript's built-in Function constructor to evaluate the expression
      const result = new Function('return ' + resultTexts)();

      // Check if the result is a valid number
      if (isNaN(result) || !isFinite(result)) {
        setCalcText('Invalid Expression');
      } else {
        setCalcText(result);
      }
    } catch (error) {
      // If an error occurs during evaluation, display "Invalid Expression"
      setCalcText('Invalid Expression');
    }
  };


  const onClickOperation = (text) => {
    let operations = ['DEL', 'C', '+', '-', '*', '/']
    if (text === 'C') {
      setResultText('')
      setCalcText('')
      return;
    }
    if (text === 'DEL') {
      return setResultText(resultTexts.toString().substring(0, resultTexts.length - 1))
    }
    if (operations.includes(resultTexts.toString().split('').pop())) return
    setResultText(resultTexts + text)
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={require('./src/assets/background.jpg')}
        resizeMode='center' style={styles.backgroundImage}>
        <View style={styles.result}>
          <Text style={styles.resultText}>{calcText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>{resultTexts}</Text>
        </View>
        <View style={styles.buttonContainerView}>
          <View style={styles.numberContainerView}>
            <View style={styles.operationContainerView}>
              <TouchableOpacity onPress={() => { onClickOperation('C') }} style={styles.operationButton}>
                <Text style={styles.operationText}>C</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onClickOperation('DEL') }} style={styles.operationButton}>
                <Text style={styles.operationText}>DEL</Text>
              </TouchableOpacity>
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => { onClickOperation('%') }} style={styles.operationButton}>
                  <Text style={styles.operationText}>%</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => { onClickOperation('/') }} style={styles.operationButton}>
                <Text style={styles.operationText}>/</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.operationContainerView}>
              <TouchableOpacity onPress={() => onClickButton(7)} style={styles.operationButton}>
                <Text style={styles.numbersText}>7</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClickButton(8)} style={styles.operationButton}>
                <Text style={styles.numbersText}>8</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClickButton(9)} style={styles.operationButton}>
                <Text style={styles.numbersText}>9</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onClickOperation('*') }} style={styles.operationButton}>
                <Text style={styles.operationText}>x</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.operationContainerView}>
              <TouchableOpacity onPress={() => onClickButton(4)} style={styles.operationButton}>
                <Text style={styles.numbersText}>4</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClickButton(5)} style={styles.operationButton}>
                <Text style={styles.numbersText}>5</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClickButton(6)} style={styles.operationButton}>
                <Text style={styles.numbersText}>6</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onClickOperation('-') }} style={styles.operationButton}>
                <Text style={styles.operationText}>–</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.operationContainerView}>
              <TouchableOpacity onPress={() => onClickButton(1)} style={styles.operationButton}>
                <Text style={styles.numbersText}>1</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClickButton(2)} style={styles.operationButton}>
                <Text style={styles.numbersText}>2</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClickButton(3)} style={styles.operationButton}>
                <Text style={styles.numbersText}>3</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onClickOperation('+') }} style={styles.operationButton}>
                <Text style={styles.operationText}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.operationContainerView}>
              <TouchableOpacity onPress={() => { onClickButton('0') }} style={styles.operationButton}>
                <Text style={styles.numbersText}>0</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onClickButton('00') }} style={styles.operationButton}>
                <Text style={styles.numbersText}>00</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { onClickButton('.') }} style={styles.operationButton}>
                <Text style={styles.numbersText}>.</Text>
              </TouchableOpacity>
              <View style={styles.operationEqualContainer}>
                <TouchableOpacity onPress={() => { onClickButton('=') }} style={styles.operationEqualButton}>
                  <Text style={styles.operationEqualText}>=</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
  },
  result: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: hp('25'),
    width: wp('100'),
  },
  resultText: {
    fontSize: hp('3.5'),
    fontWeight: '400',
    color: 'white',
    marginRight: wp('10')
  },
  calculation: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: hp('22.5'),
    width: wp('100'),
  },
  calculationText: {
    fontSize: hp('2.5'),
    color: 'white',
    fontWeight: '400',
    marginRight: wp('10')
  },
  buttonContainerView: {
    flexDirection: 'row',
    marginBottom: hp('7.5'),
    position: 'relative',
    height: hp('45'),
    width: wp('100'),
  },
  numberContainerView: {
    height: hp('45'),
    width: wp('100'),
  },
  operationContainerView: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  operationButton: {
    height: hp('5'),
    width: wp('20'),
  },
  operationEqualContainer: {
    height: hp('5'),
    width: wp('20'),
    alignItems: 'center'
  },
  operationEqualButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'green'
  },
  operationText: {
    fontSize: hp('3.5'),
    color: 'green',
    textAlign: 'center',
    fontWeight: '400',
  },
  operationEqualText: {
    fontSize: hp('3.5'),
    color: 'white',
    textAlign: 'center',
    fontWeight: '400',
  },
  numbersText: {
    fontSize: hp('3.5'),
    color: 'white',
    textAlign: 'center',
    fontWeight: '900'
  },
})
