import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppDrawer from './AppDrawer';
import AppMenuList from './AppMenuList';

const Stack = createNativeStackNavigator();


const AppStack = () => {
    return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Drawer"
                    component={AppDrawer}
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="MenuList" 
                    component={AppMenuList} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    };

export default AppStack;