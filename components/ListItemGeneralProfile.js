import React, {useContext, useEffect} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native';

import { AuthContext } from '../context/AuthContext';

export default function ListItemGeneralProfile () {

    const {userInfo, userDetail} = useContext(AuthContext);

    
    return (
        
        <View style={styles.receipt}>
           <View style={styles.details}>
              <Text style={styles.detailsTitle}>ข้อมูลทั่วไป</Text>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>ยศ</Text>

                <Text style={styles.detailsValue}>{userDetail.user.title_name.nam_str}</Text>
              </View>
               
              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>ชื่อ - สกุล</Text>

                <Text style={styles.detailsValue}>{userDetail.user.first_name} {userDetail.user.last_name}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>วันเกิด</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_genaral.birthday}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>เลขที่บัตรประชาชน</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_genaral.cid}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>อีเมล์</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_genaral.email}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>เบอร์โทรศัพท์</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_genaral.phonenumber}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>ที่อยู่</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_genaral.cid}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>หน่วย</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_genaral.unit}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>สังกัด</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_genaral.sub}</Text>
              </View>
            </View>
        </View>
        );
    }

    const styles = StyleSheet.create({
        receipt: {
            marginHorizontal: 16,
            alignItems: 'center',
            // paddingTop: 12,
            paddingBottom: 140,
          },
        details: {
            width: '100%',
            flexDirection: 'column',
            alignItems: 'stretch',
          },
          detailsTitle: {
            fontSize: 17,
            fontWeight: '600',
            color: '#222',
            marginBottom: 16,
          },
          detailsRow: {
            marginBottom: 14,
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          },
          detailsField: {
            fontSize: 16,
            lineHeight: 20,
            fontWeight: '500',
            color: '#8c8c8c',
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
          },
          detailsValue: {
            fontSize: 15,
            lineHeight: 20,
            fontWeight: '600',
            color: '#444',
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 0,
            textAlign: 'right',
          },
          detailsActions: {
            marginTop: 24,
          },
    });
      
