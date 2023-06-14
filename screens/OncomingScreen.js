import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native';


const OncomingScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ margin: 3, color: '#194868', fontSize:22 }}>กำลังจะมาเร็ว ๆ นี้</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('Home')}

                    style={{ backgroundColor: '#4caf50', paddingLeft: 30, paddingRight: 30, paddingVertical: 10, top:5,
                    borderRadius:10 }}
                    >
            <Text style={{ fontWeight:'bold', textAlign: 'center', color: '#FFF',  fontSize: 22}}>กลับ</Text>
            </TouchableOpacity>
        </View>
        );
    };
    
export default OncomingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
      