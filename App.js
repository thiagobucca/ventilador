/* eslint-disable no-shadow */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [toggleFan, setToggleFan] = useState(false);
  const colorStyles = {
    backgroundColor: toggleFan ? Colors.white : Colors.black,
    color: toggleFan ? Colors.black : Colors.white,
  };

  const toggleRequest = async () => {
    let url = `http://192.168.10.79/cm?cmnd=Power%20${
      toggleFan ? 'OFF' : 'TOGGLE'
    }`;
    const response = await fetch(url);

    const body = await response.json();
    setToggleFan((toggleFan) => !toggleFan);

    return body;
  };

  return (
    <>
      <StatusBar barStyle={toggleFan ? 'dark-content' : 'light-content'} />
      <TouchableWithoutFeedback onPress={() => toggleRequest()}>
        <SafeAreaView style={[styles.container, colorStyles]}>
          <Text style={[styles.text, colorStyles]}>
            {toggleFan ? 'Ligado' : 'Desligado'}
          </Text>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    color: Colors.black,
    marginBottom: 60,
  },
});

export default App;
