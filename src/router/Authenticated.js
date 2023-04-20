import React from 'react';
import {View, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Routes from 'src/router/Routes';

// Screens Name

import Home from 'src/screens/Authenticated/HomeScreen';
import Search from 'src/screens/Authenticated/SearchScreen';
import Chat from 'src/screens/Authenticated/ChatScreen';

const Stack = createStackNavigator();

const navigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={__DEV__ ? Routes.Home : Routes.Home}
            screenOptions={({navigation}) => ({
                headerTitleAlign: 'center',
            })}>
            <Stack.Screen
                name={Routes.Home}
                component={Home}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={Routes.Search}
                component={Search}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={Routes.Chat}
                component={Chat}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default navigator;
