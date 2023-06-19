import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingScreen from '../screens/SettingScreen';
import CustomDrawer from '../components/CustomDrawer';
import OncomingScreen from '../screens/OncomingScreen';

import { Feather } from '@expo/vector-icons';
import AppMenuList from './AppMenuList';

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
            <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} 
                    screenOptions={{ headerShown:false, 
                    drawerActiveBackgroundColor: '#4daf84',
                    drawerActiveTintColor: '#fff',
                    drawerInactiveTintColor: '#333',
                    drawerLabelStyle: { marginLeft: -15 }}}>
                <Drawer.Screen name="Home" component={HomeScreen} options={{ 
                     title: 'หน้าแรก' ,
                    drawerIcon: ({color}) => (
                        <Feather name="home" size={22} color={color} />
                    )
                 }} />
                <Drawer.Screen name="Profile" component={ProfileScreen} options={{ 
                    title: 'ข้อมูลส่วนตัว' , 
                    drawerIcon: ({color}) => (
                        <Feather name="user" size={22} color={color} />
                    )
                 }} />
                <Drawer.Screen name="HomeVisit" component={OncomingScreen} options={{ 
                    title: 'ข้อมูลการเยี่ยมบ้าน' ,
                    drawerIcon: ({color}) => (
                        <Feather name="clipboard" size={22} color={color} />
                    )
                 }} />
                <Drawer.Screen name="Setting" component={OncomingScreen} options={{ 
                    title: 'ตั้งค่า' ,
                    drawerIcon: ({color}) => (
                        <Feather name="settings" size={22} color={color} />
                    )
                 }} />
            </Drawer.Navigator>
        );
    };

export default AppStack;