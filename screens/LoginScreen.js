import React, { useState, useEffect, useContext } from 'react';
import { ActivityIndicator, TextInput, View, Text, Button, StyleSheet, StatusBar, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native';

import * as Animatable from 'react-native-animatable';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import { AuthContext } from '../context/AuthContext';

const LoginScreen = () => {

    const {login} = useContext(AuthContext);

    const [data, setData] = React.useState({
        username: '',
        password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        isValidUser: true,
        isValidPassword: true,
    });

    // const dispatch = useDispatch();
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    const textInputChange = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false,
                isValidUser: false
            });
        }
    }

    const handlePasswordChange = (val) => {
        if (val.trim().length >= 8) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const handleValidUser = (val) => {
        if (val.trim().length >= 4) {
            setData({
                ...data,
                isValidUser: true
            });
        } else {
            setData({
                ...data,
                isValidUser: false
            });
        }
    }

 
    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
    }

    const loginHandle = (username, password) => {
        // headleMessage(null);
        if (data.username.length == 0 || data.password.length == 0) {
            Alert.alert('ป้อนข้อมูลผิด!', 'ช่องรหัสผู้ใช้หรือรหัสผ่านต้องไม่เป็นค่าว่าง', [
                { text: 'Okay' }
            ]);
            return;
        }else{
            
        fetch('https://ksvrhospital.go.th/ksvr-fast-track/api/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "username": username, "password": password })
        }).then(res => res.json())
            .then(foundUser => {
               
                if (foundUser[0].result == 'false') {
                    Alert.alert('ไม่มีข้อมูล!', 'รหัสผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', [
                        { text: 'Okay' }
                    ]);
                    return;
                }
                const Token = String(foundUser[0].userToken);
                // const userName = String(foundUser[0].username);
                const Detail_1 = JSON.stringify(foundUser[0].user_details);
                const Detail_2 = JSON.stringify(foundUser[0].detail);
              console.log(Detail_1);
                // console.log(userName);
                // console.log(userDetails); 
                // console.log(Detail); 
            
                //    AsyncStorage.setItem('userToken', userToken);
                //    AsyncStorage.setItem('userName', userName);
                //    AsyncStorage.setItem('userDetails', userDetails);
                //    AsyncStorage.setItem('Detail', Detail);
                   dispatch(Login(Token, Detail_1, Detail_2));
           
                
            });

            
        }
    }

    return (
        <View style={ styles.container }>
     
            <Text style={{  fontWeight:'bold', textAlign: 'center', fontSize: 30, marginTop: 50 }}>ยืนยันตัวตน!</Text>

            <Text type={messageType}>{message}</Text>
            <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        size={20}
                    />
                    <TextInput style={[styles.textInput, {
                            fontSize: 16,
                        }]}
                        autoCapitalize="none"
                        placeholderTextColor="#666666"
                        placeholder="เบอร์โทรศัพท์ / อีเมล์" 
                        onChangeText={(val) => textInputChange(val)}
                        onEndEditing={(e) => handleValidUser(e.nativeEvent.text)}
                     />
                     {data.check_textInputChange ?
                        <Animatable.View
                            animation="bounceIn"
                        >
                            <Feather
                                name="check-circle"
                                color="green"
                                size={20}
                            />
                        </Animatable.View>
                        : null}
            </View>
            {data.isValidUser ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>เบอร์โทรศัพท์ / อีเมล์ ตัวอักษรต้องมากกว่า 4 ตัวขึ้นไป</Text>
                    </Animatable.View>
                }

            <View style={styles.action}>
                    <Feather
                        name="lock"
                        // color={colors.text}
                        size={20}
                    />
                    <TextInput style={[styles.textInput, {
                            // color: colors.text,  
                            fontSize: 16,
                        }]}
                        autoCapitalize="none"
                        placeholderTextColor="#666666"
                        placeholder="รหัสผ่าน" 
                        secureTextEntry={data.secureTextEntry ? true : false}
                        onChangeText={(val) => handlePasswordChange(val)}
         
                     />
                     <TouchableOpacity
                        onPress={updateSecureTextEntry}
                    >
                        {data.secureTextEntry ?
                            <Feather
                                name="eye-off"
                                color="grey"
                                size={20}
                            />
                            :
                            <Feather
                                name="eye"
                                color="grey"
                                size={20}
                            />
                        }
                    </TouchableOpacity>
                    
            </View>
            {data.isValidPassword ? null :
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>รหัสผ่านของคุณต้องมากกว่า 8 ตัวขึ้นไป</Text>
                    </Animatable.View>
                }

            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 40 }} >
                <TouchableOpacity onPress={() => { login(data.username, data.password) }}

                    style={{ backgroundColor: '#4caf50', padding: 10, width: 300,
                       borderRadius:10 }}
                    >
                    <Text style={{ fontWeight:'bold', textAlign: 'center', color: '#FFF',  fontSize: 22}}>เข้าสู่ระบบ</Text>
                    </TouchableOpacity>
                    {/* <Text style={{ marginTop:20, color: '#087f23' ,fontWeight: 'bold', ...FONTS.Normal}}>ลืมรหัสผ่านใช่หรือไม่?</Text> */}
            </View>

            
        </View>
        );
    };
    
export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding:30

    },
    action: {
        flexDirection: 'row',
        marginTop: 40,
        borderBottomWidth: 1,
        padding:20,
        borderBottomColor: '#f2f2f2',
        alignItems: 'center' 
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
        marginTop: 2, 
        borderBottomColor: '#ddd', 
        backgroundColor: '#fff',
        
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18,
        
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
        marginLeft: 20,
        marginTop: 5,
    },
});
      