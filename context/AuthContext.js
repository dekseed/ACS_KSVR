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
    const [userDetail, setUserDetail] = useState(null);
    const [userCheckupMain, setUserCheckupMain] = useState(null);
    const [userCheckupDetail, setUserCheckupDetail] = useState(null);
    
    const login = (username, password) => {
        
        setIsLoading(true);

        axios.post(`${BASE_URL}/login`, {
            username,
            password
        })
        .then(res => {
            
            let userInfo = res.data;
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
        setUserInfo(null);
        setUserDetail(null);
        setUserCheckupMain(null);
        setUserCheckupDetail(null);
        AsyncStorage.removeItem('userInfo');
        AsyncStorage.removeItem('userCheckupMain');
        AsyncStorage.removeItem('userCheckupDetail');
        AsyncStorage.removeItem('userDetail');
        AsyncStorage.removeItem('userToken');

        setIsLoading(false);
        
    }

    const isLoggedIn = async () => {
        try{
            setIsLoading(true);
            
            let userToken = await AsyncStorage.getItem('userToken');

            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken
            }

            fetch(`${BASE_URL}/user_update`, {
                method: 'POST',
                headers: headers,
            })
            .then(response => response.json())
                .then(data => {
                    let userDetail = data;
                    AsyncStorage.setItem('userDetail', JSON.stringify(userDetail));

                }) .catch((e) => {
                    console.log(`ระบบขัดข้อง ${e}`);
            })

            fetch(`${BASE_URL}/data_checkup`, {
                method: 'POST',
                headers: headers,
            })
            .then(response => response.json())
                .then(data => {
                    let userCheckupMain = data.data_check_up_main;
                    let userCheckupDetail = data.data_check_up_detail;
                    AsyncStorage.setItem('userCheckupMain', JSON.stringify(userCheckupMain));
                    AsyncStorage.setItem('userCheckupDetail', JSON.stringify(userCheckupDetail));
                }) .catch((e) => {
                    console.log(`ระบบขัดข้อง ${e}`);
            })

            
            let userInfo = await AsyncStorage.getItem('userInfo');
            let userCheckupMain = await AsyncStorage.getItem('userCheckupMain');
            let userCheckupDetail = await AsyncStorage.getItem('userCheckupDetail');
            let userDetail = await AsyncStorage.getItem('userDetail');
            userInfo = JSON.parse(userInfo);
            userCheckupMain = JSON.parse(userCheckupMain);
            userCheckupDetail = JSON.parse(userCheckupDetail);
            userDetail = JSON.parse(userDetail);

            
            if( userInfo ){
                setUserInfo(userInfo);
                setUserDetail(userDetail);
                setUserCheckupMain(userCheckupMain);
                setUserCheckupDetail(userCheckupDetail);
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
        <AuthContext.Provider value={{ login, logout, isLoading, userToken, userInfo, userDetail, userCheckupMain, userCheckupDetail }}>
            {children}
        </AuthContext.Provider>
    );
}