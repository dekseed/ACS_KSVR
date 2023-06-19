import React, {useContext} from 'react';
import { SafeAreaView, View, Text, Button, StyleSheet, StatusBar, Image, ScrollView, Linking, TouchableOpacity, Alert } from 'react-native';

import { AuthContext } from '../context/AuthContext';

export default function ListItemMedicalProfile () {

      
  const {userInfo, userDetail} = useContext(AuthContext);


    return (
        
        <View style={styles.receipt}>
           <View style={styles.details}>
              <Text style={styles.detailsTitle}>ข้อมูลทางการแพทย์</Text>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>เลขที่ HN</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.hn}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>เพศ</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.gender}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>หมู่เลือด</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.blood_type}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>ส่วนสูง</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.high}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>โรคประจำตัว</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.patient_congenital_disease.name}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>ประวัติการแพ้ยา</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.drug_allergy_history}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>ประวัติการสูบบุหรี่</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.cigarette_history}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>รักษาครั้งแรก</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.first_date}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>สิทธิการรักษา</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.claim_patient}</Text>
              </View>

              <View style={styles.detailsRow}>
                <Text style={styles.detailsField}>แพทย์ประจำตัว</Text>

                <Text style={styles.detailsValue}>{userDetail.detail_medical.doctor}</Text>
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
      
