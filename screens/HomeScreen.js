import React, { useState, useEffect, useContext } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  Linking, 
  TouchableOpacity, 
  Alert, 
  FlatList, 
  Animated, 
  StyleSheet,
  ImageBackground
} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import { icons } from '../constants';

import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import { BASE_URL } from '../config';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';
import { Feather } from '@expo/vector-icons';
import { MotiView } from 'moti';
import { Easing, color } from 'react-native-reanimated';

const _size = 100;
const _color = '#FF0000';

const HomeScreen = ({ navigation }) => {
    
const {userInfo, userDetail} = useContext(AuthContext);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
      const dialCall = async () => {
       
        NetInfo.fetch().then(state => {

                if (state.isConnected == false) {
                Alert.alert(
                    "อินเตอร์เน็ตขัดข้อง!",
                    "คุณจะไม่สามารถส่งตำแหน่งของคุณได้ กรุณาเชื่อมต่ออินเตอร์เน็ต",
                    [
                    { text: "ตกลง", onPress: () => Linking.openURL('tel:0647906014') }
                    ],
                    { cancelable: false }
                );
                
                }

            });


         
            let location1 = await Location.getCurrentPositionAsync({});
            setLocation(location1);

            // console.log(location1);

          
                const headers = {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': userInfo.user.api_token

                  }
                  
                  const data = {
                    "longitude": location1.coords.longitude,
                    "latitude": location1.coords.latitude,
                  }
                  
                //   axios.post(`${BASE_URL}/user_location`, data, {

                //         headers: headers
                  
                //     })

                console.log(userInfo.user.api_token);
                console.log(location1.coords.longitude);
                console.log(location1.coords.latitude);

                fetch(`${BASE_URL}/user_location`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        longitude: location1.coords.longitude,
                        latitude: location1.coords.latitude,
                
                    }),
                })
                .then(response => response.json())
                    .then(data => {
                        if (data.result == 'false') {
                          Alert.alert('ระบบขัดข้อง', data.data, [
                            { text: 'Okay' }
                          ]);
                          return;
                        }else{
                            console.log(data);
                            Alert.alert(data.data, [
                                { text: 'Okay' }
                              ]);
                              return;
                        }

                        
                        // console.log(res.patient_id);
                        // console.log(res.mapsLat);
                        // console.log(res.mapsLng);
                    }) .catch((e) => {
                        console.log(`ระบบขัดข้อง ${e}`);
                    })
            


                    // Linking.openURL('tel:0647906014');
                    
         

         
       
      };


    useEffect(() => {
    
          (async () => {

            NetInfo.fetch().then(state => {
      
              if (state.isConnected == false) {
                Alert.alert(
                  "อินเตอร์เน็ตขัดข้อง!",
                  "กรุณาเชื่อมอินเตอร์เน็ต",
                  [
                  
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                  ],
                  { cancelable: false }
                );
              }
            });


          //ระบุตำแหน่ง
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
      
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);

            // console.log(location);
          })();

    }, []);
  
   

    let categoriesData = [
        {
            id: 1,
            name: "ข้อมูลโรคประจำตัว/ยา",
            icon: icons.Treatment,
            url: 'Coming',
        },
        {
            id: 2,
            name: "ข้อมูลตรวจสุขภาพประจำปี",
            icon: icons.Knowledge_of_disease,
            url: 'CheckUp',
        },
        {
            id: 3,
            name: "การสอนสุขศึกษา/เยี่ยมบ้าน",
            icon: icons.Suitable_food,
            url: 'Coming',
        },
        {
            id: 4,
            name: "สถานพยาบาลใกล้เคียง",
            icon: icons.Nearby_Hospital,
            url: 'Coming',
        },
        {
            id: 5,
            name: "ความรู้เรื่องโรค",
            icon: icons.Exercise,
           url: 'Coming',
        },
        {
            id: 6,
            name: "ติดต่อสอบถาม",
            icon: icons.Knowledge_picture,
            url: 'Coming',
        }
    ]

    
    const [categories, setCategories] = React.useState(categoriesData)

    function renderNavBar() {
        return (
            
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    paddingHorizontal: 10,
                    backgroundColor: '#FFFFFF',
                    height: 80,

                }}
            >
                <TouchableOpacity 
                    onPress={() => navigation.openDrawer()}
                    // style={{ marginRight: 'auto' }}
                    >
                    <View style={styles.action}>
                        <Feather name='menu' size={22} color="#094c37" />
                    </View>
                </TouchableOpacity>
                     {/* <Text style={{fontWeight:'bold', fontSize:18, marginRight: 'auto'}}>สวัสดี, {userDetail.first_name}</Text> */}
                {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <View style={styles.action}>
                        <Feather name='bell' size={22} color="#094c37" />
                    </View>
                </TouchableOpacity> */}
                {/* <TouchableOpacity  onPress={()=>navigation.navigate('Profile')} >
                    <View style={styles.action}>
                        <Feather name='user' size={22} color="#094c37" />
                    </View>
                </TouchableOpacity> */}
                <TouchableOpacity  style={{ marginRight: 8 }}onPress={() => navigation.navigate('Profile')}>
                    <ImageBackground 
                    source={ require('../assets/images/default.jpg')}
                    style={styles.avatar}
                    imageStyle={{ borderRadius:25 }}
                    />
                </TouchableOpacity> 
            </View>
        );
    }
  
    function renderHeader() {
        return (
            <View style={{  
                            paddingVertical: 80, 
                            marginHorizontal: 10, 
                            marginVertical:10, 

                             }}>
                
                <View style={{ alignItems: 'center' }}>
                                <View style={{ justifyContent: 'center', 
                    alignItems: 'center', top: -74, position:'absolute'}}>   
                                    <LottieView autoPlay={true}
                                        loop={true}
                                        style={{  height: 250 }} 
                                        source={require('../assets/images/2576-circle-animation.json')}
                                    /> 
                                 </View>
                        
                        <TouchableOpacity   style={{  
                                                    justifyContent: 'center', 
                                                    alignItems: 'center',
                                                }}
                                            onPress={() => { dialCall() }}
                                    >
                                     {/* {[...Array(3).keys()].map((index) => {
                                    return (
                                        <MotiView 
                                        from={{
                                            opacity: 0.7,
                                            scale: 1,
                                        }}
                                        animate={{
                                            scale: 2.7,
                                            opacity: 0,
                                        }}
                                        transition={{
                                            type: 'timing',
                                            duration: 2000,
                                            loop: true,
                                            easing: Easing.out(Easing.ease),
                                            delay: index * 500,
                                            repeatReverse: false,
                                        }}
                                        key={index}
                                        style={[
                                        
                                            StyleSheet.absoluteFillObject, 
                                            styles.dot

                                        ]}
                                        
                                        />
                                    );
                                })} */}
                            <Image  source={require('../assets/images/bus.png')} 
                                    style={{ width: 110, height: 70, top: 2 }} />
                            <View style={{ marginTop:10 }}>
                                <Text style={{ fontWeight: 600, color: '#FFF', fontSize:16 }}>เรียกรถพยาบาล</Text>
                            </View> 
                        </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderCategoryList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
            onPress={() =>  navigation.navigate('MenuList', { screen: item.url }) }
            
                style={{
                    flex: 1,
             
                    justifyContent: 'center', 
                    alignItems: 'center',
                    margin: 5,
                    paddingVertical: 10,
                    borderRadius: 5,
                    backgroundColor: '#FFFFFF',
                }}
            >
                <Image
                    source={item.icon}
                    style={{
                        width: 120,
                        height: 120,
             
                    }}
                />

                <Text style={{ margin: 3, color: '#194868', fontSize:12 }}>{item.name}</Text>
            </TouchableOpacity>
        )

        return (
            <View style={{ paddingHorizontal: 24 - 20}}>
                <Animated.View>
                  
                    <FlatList
                    
                        data={categories}
                        renderItem={renderItem}
                        keyExtractor={item => `${item.id}`}
                        numColumns={2}
                        
                    />
                </Animated.View>

            </View>
        )
    }


    return (
    
        <View style={{ flex: 1 }}>
        
            {renderNavBar()}
            {renderHeader()}
            <SafeAreaView style={{flex: 1}}>
                {renderCategoryList()}
            </SafeAreaView>
        </View>
        

        );
    }
    
export default HomeScreen;

const styles = StyleSheet.create({
    actionWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginHorizontal: -8,

    },
    action: {
        width: 48,
        height: 48,
        borderRadius: 12,
        // marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    avatar: {
        width:25,
        height: 25,
        borderRadius: 12,
        // marginHorizontal: 8,
        alignItems: 'center',
        justifyContent: 'center',
        bottom:12
        
    },
    dot: {
        width: _size,
        height: _size,
        borderRadius:  _size,
        backgroundColor: _color,
    }
});