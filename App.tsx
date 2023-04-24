/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
// import type {PropsWithChildren} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import 'react-native-gesture-handler';
import Home from './src/Home';
import Cart from './src/Cart';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          name="Home"
          component={Home}
          options={({navigation, route}) => ({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <Image
                  style={{width: 30, height: 30, margin: 10}}
                  source={require('./src/img/shopping-cart.png')}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <Drawer.Screen name="Cart" component={Cart} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
