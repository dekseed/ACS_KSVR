import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import CustomDrawer from '../components/CustomDrawer';
import OncomingScreen from '../screens/OncomingScreen';

import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

const Stack = createNativeStackNavigator();

const AppStack = () => {
    return (
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} 
                    screenOptions={{ headerShown:false, 
                    drawerActiveBackgroundColor: '#60e972',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: { marginLeft: -15 }}}>
                <Drawer.Screen name="Home" component={HomeScreen} options={{ 
                     title: 'หน้าแรก' ,
                    drawerIcon: ({color}) => (
                        <Ionicons name="home-outline" size={22} color={color} />
                    )
                 }} />
                <Drawer.Screen name="Profile" component={OncomingScreen} options={{ 
                    title: 'ข้อมูลส่วนตัว' ,
                    drawerIcon: ({color}) => (
                        <Ionicons name="person-outline" size={22} color={color} />
                    )
                 }} />
                <Drawer.Screen name="Setting" component={OncomingScreen} options={{ 
                    title: 'ตั้งค่า' ,
                    drawerIcon: ({color}) => (
                        <Ionicons name="settings-outline" size={22} color={color} />
                    )
                 }} />
            </Drawer.Navigator>
            
        );
    };

export default AppStack;