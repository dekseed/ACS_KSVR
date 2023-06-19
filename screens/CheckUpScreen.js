import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { AuthContext } from '../context/AuthContext';

import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';


 const CheckUpScreen = ({ navigation }) => {

    const {userToken, userInfo, userCheckupMain, userCheckupDetail} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {

            setRefreshing(true);

            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken

            }

            fetch(`${BASE_URL}/data_checkup`, {
                method: 'POST',
                headers: headers,
            })
            .then(response => response.json())
                .then(data => {
                    setIsLoading(true);

                    let userCheckupMain = data.data_check_up_main;
                    let userCheckupDetail = data.data_check_up_detail;

                    AsyncStorage.removeItem('userCheckupMain');
                    AsyncStorage.removeItem('userCheckupDetail');
                    AsyncStorage.setItem('userCheckupMain', JSON.stringify(userCheckupMain));
                    AsyncStorage.setItem('userCheckupDetail', JSON.stringify(userCheckupDetail));
                    AsyncStorage.getItem('userCheckupMain');
                    AsyncStorage.getItem('userCheckupDetail');

                    setIsLoading(false);
                }) .catch((e) => {
                    console.log(`ระบบขัดข้อง ${e}`);
                })

            setTimeout(() => {
              setRefreshing(false);
            }, 2000);
          }, []);

    const onLoad  = () => {
   
            setIsLoading(true);

            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': userToken
            }

            fetch(`${BASE_URL}/data_checkup`, {
                method: 'POST',
                headers: headers,
            })
            .then(response => response.json())
                .then(data => {
                    let userCheckupMain = data.data_check_up_main;
                    // let userCheckupDetail = data.data_check_up_detail;
                    
                    AsyncStorage.removeItem('userCheckupMain');
                    AsyncStorage.removeItem('userCheckupDetail');
                    AsyncStorage.setItem('userCheckupMain', JSON.stringify(userCheckupMain));
                    AsyncStorage.setItem('userCheckupDetail', JSON.stringify(userCheckupDetail));
                    AsyncStorage.getItem('userCheckupMain');
                    AsyncStorage.getItem('userCheckupDetail');

                }) .catch((e) => {
                    console.log(`ระบบขัดข้อง ${e}`);
                })

            setIsLoading(false);

          }

    useEffect(() => {

            onLoad();

    }, []);
    
    return (
        
        <SafeAreaView style={{ flex: 1 }}>
            <View 
                style={{
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    backgroundColor: '#FFF',
                    height: 80,

                }}
            >
                <TouchableOpacity 
                    onPress={() => navigation.goBack()}
                    style={{ marginRight: 'auto' }}
                    >
                    <View style={styles.action}>
                        <Feather name='arrow-left' size={22} color="#094c37" />
                    </View>
                </TouchableOpacity>
                <Text style={{fontWeight:'bold', fontSize:22,  bottom: 10, right:90, }}>ข้อมูลตรวจสุขภาพประจำปี</Text>
            </View>

            <ScrollView 
                        contentContainerStyle={styles.container}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
            >

                {userCheckupMain.map(
                ({ created_date, year, result_1, result_2, result_3, result_4, result_5, result_6, result_7, result_8, result_9, result_10}, index) => {
                    return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                        // handle onPress
                        }}>
                        <View style={styles.card}>
                            <View style={styles.cardBody}>
                                <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>ปี {year+543}</Text>
                                <Text style={styles.cardDuration}>
                                  ข้อมูลวันที่ {created_date}
                                </Text>
                                </View>
                                <View style={styles.cardRowItem}>
                                    <View style={styles.item}>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_1} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                                ผลการตรวจปกติ
                                            </Text>
                                        </View>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_2} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                                น้ำตาลในเลือดสูง	
                                            </Text>
                                        </View>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_3} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                            กรดยูริคสูง
                                            </Text>
                                        </View>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_4} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                            ตับผิดปกติ
                                            </Text>
                                        </View>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_5} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                            ไขมันในเลือดสูง	
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.item}>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_6} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                            ไตผิดปกติ	
                                            </Text>
                                        </View>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_7} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                            ปัสสาวะผิดปกติ
                                            </Text>
                                        </View>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_8} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                            โลหิตจาง
                                            </Text>
                                        </View>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_9} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                            อุจจาระผิดปกติ	
                                            </Text>
                                        </View>
                                        <View style={styles.cardRowItem}>
                                            <MaterialIcons name={result_10} size={24} color="#4daf84" />
                                            <Text style={styles.cardDescription}>
                                            ความดันโลหิตสูง	
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.cardPrice}>
                                    <Text style={{  fontSize: 12,
                                                    fontWeight: '700',
                                                    color: '#173153',
                                                    
                                                    marginRight: 5}}>
                                        รายละเอียด 
                                        
                                    </Text>
                                    <Feather name="chevrons-right" size={14} color="#4daf84" />
                                </View>
                               
                            </View>
                        </View>
                    </TouchableOpacity>
                    );
                },
                )}
                </ScrollView>
        </SafeAreaView>
        
        );
    };
    
export default CheckUpScreen;

const styles = StyleSheet.create({
    container:{
        // backgroundColor: '#fff',
        paddingVertical: 24,
    },
    checkbox: {
        alignSelf: 'center',
      },
      item: {
        width: '50%', // is 50% of container width
       
      },
      cardPrice: {
        flexDirection: 'row',
        // paddingHorizontal: 2,
       
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        top: 10,
        marginLeft: 'auto',
      },
      cardRowItem: {
        flexDirection: 'row',
        // paddingHorizontal: 2,
       
        flexWrap: 'wrap',
        alignItems: 'flex-start' // if you want to fill rows left to right
      },
    action: {
        width: 48,
        height: 48,
        borderRadius: 12,
        marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#e9f9f2',
    },
    cardRowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
  },
      card: {
        marginHorizontal: 12,
        padding: 12,
        borderRadius: 24,
        marginBottom: 24,
        backgroundColor: '#fff',
      },
      cardBody: {
        paddingVertical: 12,
        paddingHorizontal: 12,
      },
      cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
      },
      cardTitle: {
        fontSize: 19,
        fontWeight: '700',
        color: '#222',
      },
      cardDuration: {
        fontSize: 12,
        color: '#6a6bff',
      },
      cardDescription: {
        marginLeft: 5,
        fontSize: 12,
        letterSpacing: 0.25,
        lineHeight: 22,
        fontWeight: '500',
        color: '#545454',
      },
    });