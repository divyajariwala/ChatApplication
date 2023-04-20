import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Routes from 'src/router/Routes';

// Screens Name

import Login from 'src/screens/UnAuthenticated/LoginScreen';
import Register from 'src/screens/UnAuthenticated/RegisterScreen';

const Stack = createStackNavigator();

const navigator = () => {
    return (
        <Stack.Navigator
            initialRouteName={Routes.Login}
            screenOptions={({navigation}) => ({
                headerTitleAlign: 'center',
            })}>
            <Stack.Screen
                name={Routes.Login}
                component={Login}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name={Routes.Register}
                component={Register}
                options={{headerShown: false}}
            />
        </Stack.Navigator>
    );
};

export default navigator;
