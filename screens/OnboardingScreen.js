import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import * as Linking from 'expo-linking';
import * as Animatable from 'react-native-animatable';

const OnboardingScreen = ({ navigation }) => {
    return (
  
      <SafeAreaView style={{ 
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#fff',
       }}>
          <View style={ styles.container }>
            <View style={{  flex:1, justifyContent:'center', alignItems:'center' }}>
              <Animatable.Image
                  animation="bounceIn"
                  duraton="1500"
                  style={{  height: 150 }}
                  source={require('../assets/images/bus.png')}
                  resizeMode="contain"
                  />
              <Text style={{ fontWeight:'bold', fontWeight: 'bold', paddingTop: 30, fontSize:50 }} >สวัสดี</Text>
              <Text style={{ color: 'gray', textAlign:'center', marginHorizontal: 20 }} >ยินดีต้อนรับ !</Text>
  
            </View>
              
             
              <View style={{ margin:20, paddingVertical:20, alignItems: 'center' }}>
                  <TouchableOpacity onPress={()=>navigation.navigate('Login')}
                      style={{ backgroundColor: '#4caf50', padding: 10, width: 300,
                       borderRadius:10 }}
                      >
                      <Text style={{ fontWeight:'bold', textAlign: 'center', color: '#FFF', fontSize:18}}>ยืนยันตัวตน</Text>
                  </TouchableOpacity>
              
                  <TouchableOpacity onPress={() => { Linking.openURL('tel:1669') }}
                      style={{ backgroundColor: '#d50000', padding: 10, width: 300,
                       borderRadius:10, marginTop:20 }}
                  
                      >
                          <Text style={{ fontWeight:'bold', textAlign: 'center', color: '#FFF', fontSize:18}}>เรียกรถพยาบาลโดยไม่ยืนยันตัวตน</Text>
                      </TouchableOpacity>
              </View>
  
              
          </View>
      </SafeAreaView>
    
    );
} 

export default OnboardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
      