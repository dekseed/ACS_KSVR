import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native';


const ProfileScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
        </View>
        );
    };
    
export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
      