import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Header from '../common/Header';
import BackButton from '../common/BackButton';
import { useNavigation } from '@react-navigation/native';

function EditCustomerProfile() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('MypageScreen');
  };

  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleComplete = () => {
    // Handle the completion action here
    // You can use the 'name' and 'phoneNumber' states
  };

  const isInputsFilled = name !== '' && phoneNumber !== '';

  return (
    <>
      <Header height={114} title={'내 정보 수정'} />
      <BackButton onPress={handleGoBack} top={-45} />
      <View style={styles.container}>
        <Text style={styles.nameText}>이름</Text>
        
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="박세라"
            value={name}
            onChangeText={setName}
          />
        </View>

        <Text style={styles.telText}>전화번호</Text>
        
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="010-1234-1234"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        <TouchableOpacity
        style={[styles.completeButton, isInputsFilled ? {} : styles.disabledButton]}
        onPress={isInputsFilled ? handleComplete : null}
        disabled={!isInputsFilled} // 비활성화 상태에서 버튼을 누르지 못하도록 설정
      >
          <Text style={styles.completeButtonText}>완료하기</Text>
      </TouchableOpacity>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
  },
  nameText: {
    color: '#000',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop: 76,
    marginLeft: 38,
  },
  telText: {
    color: '#000',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    marginTop: 20,
    marginLeft: 38,
  },
  inputBox: {
    marginTop: 16,
    marginLeft: 22,
    width: 342, 
    height: 49, 
    flexShrink: 0,
    backgroundColor: '#F3F3F3', 
    borderWidth: 0.6, 
    borderColor: '#8E8383', 
    borderRadius: 18,
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    marginLeft: 20,
  },
  completeButton: {
    marginTop: 20,
    alignSelf: 'center',
    width: 326,
    height: 63,
    flexShrink: 0,
    borderRadius: 27,
    backgroundColor: '#FFB15F',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
  },
  completeButtonText: {
    color: '#FFF',
    textAlign: 'center',
    //fontFamily: 'Noto Sans KR',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  disabledButton: {
    backgroundColor: '#C0C0C0', 
  },
});

export default EditCustomerProfile;
