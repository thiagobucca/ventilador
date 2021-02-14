/* eslint-disable no-shadow */
/**
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableWithoutFeedback,
  ActivityIndicator
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';

const App: () => React$Node = () => {
  const [toggleFan, setToggleFan] = useState(false);
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const baseURL = 'http://192.168.10.79/cm?cmnd=';

  const colorStyles = {
    backgroundColor: toggleFan ? Colors.white : Colors.black,
    color: toggleFan ? Colors.black : Colors.white,
  };

  const getSwitchState = async () => {
    let url = `${baseURL}STATE`;
    const response = await fetch(url);

    const body = await response.json();
    setLoading(false);
    if (body.POWER === 'ON') {
      setToggleFan(true);
    }
    return body;
  };

  if (!mounted) {
    setTimeout(() => {
      getSwitchState()
    }, 400);
  }

  useEffect(() => {
    setMounted(true)
  }, [])



  const toggleRequest = async () => {
    let url = `${baseURL}Power%20${toggleFan ? 'OFF' : 'TOGGLE'
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
          {loading && (
            <ActivityIndicator style={styles.spinner} size='large' />
          )}
          {!loading && (
            <Text style={[styles.text, colorStyles]}>
              {toggleFan ? 'Ligado' : 'Desligado'}
            </Text>
          )}
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
  spinner: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 60
  }
});

export default App;
