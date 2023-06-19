import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CheckUpScreen from '../screens/CheckUpScreen';
import OncomingScreen from '../screens/OncomingScreen';

const Stack = createNativeStackNavigator();

const AppMenuList = () => {
    return (
            <Stack.Navigator screenOptions={{ headerShown:false }}>
                <Stack.Screen 
                                name="CheckUp" 
                                component={CheckUpScreen}
                    />
                 <Stack.Screen 
                                name="Coming" 
                                component={OncomingScreen}
                    />
            </Stack.Navigator>

        );
    };

export default AppMenuList;

      



