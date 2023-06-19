import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, Image, ScrollView, RefreshControl, TouchableOpacity, Alert, Switch } from 'react-native';

import { AuthContext } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import CustomSwitch from '../components/CustomSwitch';
import ListItemGeneralProfile from '../components/ListItemGeneralProfile';
import ListItemMedicalProfile from '../components/ListItemMedicalProfile';


import { BASE_URL } from '../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useDataPatientFetch from '../hook/useDataPatientFetch';

const PROFILE_AVATAR = 'https://ksvrhospital.go.th/rt-smart-heart-ksvr/media/images/avatars/default.jpg';


 const ProfileScreen = ({ navigation }) => {

    const [profileTab, setProfileTab] = useState(1);

    const onSelectSwitch = value => {
        setProfileTab(value);
      };

    const {userToken, userInfo} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    // const {userInfo, isLoading, error} = useDataPatientFetch;

    const onRefresh = React.useCallback(() => {

            setRefreshing(true);

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
                    setIsLoading(true);

                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.setItem('userDetail', JSON.stringify(data));
                    
                    setIsLoading(false);
                }) .catch((e) => {
                    console.log(`ระบบขัดข้อง ${e}`);
                })

            setTimeout(() => {
              setRefreshing(false);
              setIsLoading(false);
            }, 3000);
          }, []);

    const onLoad  = () => {
   
            setIsLoading(true);

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
                    AsyncStorage.removeItem('userDetail');
                    AsyncStorage.setItem('userDetail', JSON.stringify(userDetail));

                }) .catch((e) => {
                    console.log(`ระบบขัดข้อง ${e}`);
                })

            setTimeout(() => {
                    setIsLoading(false);
                  }, 3000);
          }

    useEffect(() => {

            onLoad();
           
    }, []);

    return (
        
        <SafeAreaView style={{ flex: 1, }}>
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    // paddingHorizontal: 10,
                    // paddingVertical: 10,
                    backgroundColor: '#FFFFFF',
                    height: 90,

                }}
            >
                <TouchableOpacity 
                    onPress={() => navigation.openDrawer()}
                    style={{ marginRight: 'auto' }}
                    >
                    <View style={styles.action}>
                        <Feather name='menu' size={22} color="#094c37" />
                    </View>
                </TouchableOpacity>
                <Text style={{fontWeight:'bold', fontSize:22, marginRight: 'auto', right: 30, bottom: 10}}>ข้อมูลส่วนตัว</Text>
            </View>
            <ScrollView 
                        contentContainerStyle={styles.container}
                        refreshControl={
                            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
            >
                <View style={ styles.profile }>
                    <TouchableOpacity
                        onPress={() => {

                        }}>
                            <View style={styles.profileAvatarWrapper}>
                                <Image
                                    source={{ uri: PROFILE_AVATAR }}
                                    style={styles.profileAvatar}
                                />
                            </View>
                        </TouchableOpacity>
                    <Text style={styles.profileName}>{userInfo.name}</Text>
                    <Text style={styles.profileAddress}>HN: {userInfo.hn}</Text>
                </View>
                <View style={{marginVertical: 20, marginHorizontal: 8 }}>
                    <CustomSwitch
                        selectionMode={1}
                        option1="ข้อมูลทั่วไป"
                        option2="ข้อมูลทางการแพทย์"
                        onSelectSwitch={onSelectSwitch}
                    />
                </View>

                {profileTab == 1 && <ListItemGeneralProfile />}
                {profileTab == 2 && <ListItemMedicalProfile />}

                
            </ScrollView>
        </SafeAreaView>
        
        );
    };
    
export default ProfileScreen;

const styles = StyleSheet.create({
    container:{
        // backgroundColor: '#fff',
        paddingVertical: 24,
    },
    profile: {
        
      padding: 24,
      alignItems: 'center',
      justifyContent: 'center'
    },
    profileName: {
     marginTop: 20,
     fontSize: 19,
     fontWeight: '600',
     color: '#414d63',
     textAlign: 'center',
    },
    profileAddress: {
        marginTop: 5,
        fontSize: 16,
        color: '#989898',
        textAlign: 'center',
    },
    profileAvatar: {
      width: 72,
      height: 72,
      borderRadius: 9999,
      borderWidth: 1,
      borderColor: '#ccc',
      marginRight: 'auto',
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
    content:{
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#e3e3e3',
    },
   
  
 
  });