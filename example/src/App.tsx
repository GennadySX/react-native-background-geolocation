import * as React from 'react';

import { StyleSheet, View, Text, InteractionManager } from 'react-native';
import BackgroundGeolocation from '../../src';

export default function App() {
  const [result, setResult] = React.useState<boolean>(false);

  React.useEffect(() => {
    BackgroundGeolocation.configure({
      postTemplate: {
        lat: '@latitude',
        lon: '@longitude',
        geoTest: 'coords' // you can also add your own properties
      }
    });
    InteractionManager.runAfterInteractions(() => {
      BackgroundGeolocation.checkStatus(({ isRunning }) => {
        if (isRunning) {
          BackgroundGeolocation.start(); // service was running -> rebind all listeners
          setResult(true)
        }
      });
    })

  }, []);

  return (
      <View style={styles.container}>
        <Text>Geolocation is running: {`${result}`}</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
