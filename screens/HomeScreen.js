import React, { useState, useEffect, useContext } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  Image, 
  ScrollView, 
  Linking, 
  TouchableOpacity, 
  Alert, 
  FlatList, 
  Animated, 
  ImageBackground 
} from 'react-native';

import NetInfo from '@react-native-community/netinfo';

import { icons } from '../constants';

import LottieView from 'lottie-react-native';
import * as Location from 'expo-location';
import { BASE_URL } from '../config';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

const HomeScreen = ({ navigation }) => {
    
const {userInfo} = useContext(AuthContext);

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
                        }

                        console.log(data);
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
            url: 'ComingScreen',
         //   color: COLORS.yellow,
        },
        {
            id: 2,
            name: "ข้อมูลตรวจสุขภาพประจำปี",
            icon: icons.Knowledge_of_disease,
            url: 'Login',
         
        //    color: COLORS.lightBlue,
        },
        {
            id: 3,
            name: "ข้อมูลการสอนสุขศึกษา/เยี่ยมบ้าน",
            icon: icons.Suitable_food,
          //  url: 'Suitable_food',
            url: 'Null',
         //   color: COLORS.darkgreen,
        },
        {
            id: 4,
            name: "สถานพยาบาลใกล้เคียง",
            icon: icons.Nearby_Hospital,
            //url: 'Nearby_Hospital',
            url: 'Null',
        //    color: COLORS.peach,
        },
        {
            id: 5,
            name: "ความรู้เรื่องโรค",
            icon: icons.Exercise,
           // url: 'Exercise',
           url: 'Null',
           // color: COLORS.purple,
        },
        {
            id: 6,
            name: "ติดต่อสอบถาม",
            icon: icons.Knowledge_picture,
            //url: 'Knowledge_picture',
            url: 'Null',
           // color: COLORS.red,
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
                    paddingHorizontal: 22,
                    backgroundColor: '#FFFFFF',
                    height: 80,

                }}
            >
           
                <Text style={{fontWeight:'bold', fontSize:18}}>สวัสดี, {userInfo.user_detail.first_name}</Text>
              <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <ImageBackground 
                  source={ require('../assets/images/default.jpg')}
                  style={{ width: 35, height: 35 }}
                  imageStyle={{ borderRadius:25 }}
                  />
                </TouchableOpacity> 
            </View>
        );
    }
  
    function renderHeader() {
        return (
            <View style={{  paddingTop:20, paddingHorizontal: 22, paddingBottom: 30, backgroundColor: '#FFFFFF' }}>
                
                <View style={{ alignItems: 'center' }}>

                    <LottieView autoPlay={true}
                                loop={true}
                                style={{   marginTop: -10, height: 250, position:'absolute' }} 
                                source={require('../assets/images/2576-circle-animation.json')}
                                 /> 

                        <TouchableOpacity   style={{  justifyContent: 'center', alignItems: 'center',
                                                borderRadius: 200, height: 200,
                                                width: 200, 
                                                }}
                                            onPress={() => { dialCall() }}
                                    >
                            <Image  source={require('../assets/images/bus.png')} 
                                    style={{ width: 110, height: 70 }} />
                            <View style={{ marginTop:10 }}>
                                <Text style={{ fontWeight:'bold', color: '#FFFFFF', fontSize:16 }}>เรียกรถพยาบาล</Text>
                            </View> 
                        </TouchableOpacity>
                </View>
            </View>
        )
    }

    function renderCategoryList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
            onPress={() =>  navigation.navigate('Profile') }
            
                style={{
                    flex: 1,
             
                    justifyContent: 'center', 
                    alignItems: 'center',
                    margin: 5,
                    paddingVertical: 12,
                    paddingHorizontal: 24,
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
            <View>
                {renderCategoryList()}
            </View>
            </SafeAreaView>
        </View>
        

        );
    }
    
export default HomeScreen;
