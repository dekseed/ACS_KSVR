import React, {createContext, useEffect, useState} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { BASE_URL } from '../config';
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState(null);
    const [userInfo, setUserInfo] = useState(null);

    const login = (username, password) => {
        
        setIsLoading(true);

        axios.post(`${BASE_URL}/login`, {
            username,
            password
        })
        .then(res => {
            // console.log(res);
            
            let userInfo = res.data;
            console.log(userInfo.result);
            console.log('Token : ' +userInfo.userToken);

            if (userInfo.result == 'false') {
                Alert.alert('ไม่มีข้อมูล!', 'รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', [
                    { text: 'Okay' }
                ]);
                return;
            }

            setUserInfo(userInfo);
            setUserToken(userInfo.userToken);

            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            AsyncStorage.setItem('userToken', userInfo.userToken);
     
            
        })
        .catch((e) => {
            console.log(`ตรวจสอบสิทธิขัดข้อง ${e}`);
        })

        setIsLoading(false);

    }

    const logout = () => {

        setIsLoading(true);
        setUserToken(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userToken');
        setIsLoading(false);
        
    }

    const isLoggedIn = async () => {
        try{
            setIsLoading(true);
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userToken = await AsyncStorage.getItem('userToken');
            userInfo = JSON.parse(userInfo);

            if( userInfo ){
                setUserInfo(userInfo);
                setUserToken(userToken);
            } 
            
            setIsLoading(false);

        } catch (e){
            console.log(`isLogged in error ${e}`);
        }
    }

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
}