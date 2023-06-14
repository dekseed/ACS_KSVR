import React, {useContext} from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';

const CustomDrawer = props => {

    const {userInfo} = useContext(AuthContext);
    const {logout} = useContext(AuthContext);

    return (
        <View style={{ flex:1 }}>
            <DrawerContentScrollView 
                {...props}
                contentContainerStyle={{ backgroundColor: '#60e972' }}
            >
            <ImageBackground
                source={require('../assets/images/menu-bg.png')}
                style={{ padding: 20 }}>
            <Image 
                source={require('../assets/images/default.jpg')}
                style={{ height: 80, width: 80, borderRadius: 40, marginBottom: 10 }}
                />
                <Text style={{fontWeight:'bold', fontSize:16}}>{userInfo.name}</Text>
                <Text style={{fontSize:14}}>HN: {userInfo.user_detail.hn}</Text>
            </ImageBackground>
            <View style={{ flex: 1, backgroundColor:'#fff', paddingTop: 10 }}>
                <DrawerItemList {...props} />
            </View> 
            </DrawerContentScrollView>
            <View style={{ padding:20, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity onPress={() => {logout()}} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{ 
                                fontSize: 15,
                                marginLeft: 5,
                             }}>ออกจากระบบ</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        
       
        );
    };
    
export default CustomDrawer;

      