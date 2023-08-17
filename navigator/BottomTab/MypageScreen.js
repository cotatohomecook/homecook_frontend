import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Switch } from 'react-native';
import Header from '../../common/Header';
import BackButton from '../../common/BackButton';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

function MyPage() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('CustomerStartScreen');
  };

  const handleGoToEditProfile = () => {
    navigation.navigate('EditCustomerProfile'); 
  };

  const handleGoToListScreen = () => {
    navigation.navigate('ListScreen'); 
  };

  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [isSellerModalVisible, setIsSellerModalVisible] = useState(false);

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
    // 여기에 알림 설정/해제에 대한 로직을 추가하세요
  };

  const openSellerModal = () => {
    setIsSellerModalVisible(true);
  };

  const closeSellerModal = () => {
    setIsSellerModalVisible(false);
  };

  const confirmSellerChange = () => {
    // 판매자로 변경
    navigation.navigate('StoreRegistrationScreen');
    closeSellerModal();
  };

  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);

  const openLogoutModal = () => {
    setIsLogoutModalVisible(true);
  };

  const closeLogoutModal = () => {
    setIsLogoutModalVisible(false);
  };

  const handleLogout = () => {
    // 로그아웃 처리 
    // 예: 서버 요청, 로컬 상태 초기화 등
    closeLogoutModal(); 
  };

  return (
    <>
      <Header height={114} title={'마이페이지'} />
      <BackButton onPress={handleGoBack} top={-45} />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          
          <View style={styles.imageButton}>
            <TouchableOpacity>
            <Image
             source={{
              uri: 'https://velog.velcdn.com/images/thgus05061/post/0e775f30-53d9-4ccd-9816-78df25590bbc/image.png',
               }}
               style={styles.image}
            />
            </TouchableOpacity>
            <Text style={styles.customerText}>구매자</Text>
          </View>
          

          <View style={styles.imageButton}>
          <TouchableOpacity onPress={openSellerModal}>
            <Image
              source={{
                uri: 'https://velog.velcdn.com/images/thgus05061/post/1a8d8bc3-5008-4827-ab2d-6917f72b0286/image.png',
              }}
              style={styles.image}
            />
            </TouchableOpacity>
            <Text style={styles.sellerText}>판매자</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.boxContainer} onPress={handleGoToEditProfile}>
            <Text style={styles.text}>내 정보 수정</Text>
            <Image source={{ uri: 'https://velog.velcdn.com/images/thgus05061/post/774a2d59-aaf6-41f7-b97f-0be96490de8f/image.png' }}
                  style={styles.buttonImage}
                />
        </TouchableOpacity>

        <TouchableOpacity style={styles.boxContainer} onPress={handleGoToListScreen}>
            <Text style={styles.text}>주문내역 및 리뷰</Text>
            <Image source={{ uri: 'https://velog.velcdn.com/images/thgus05061/post/774a2d59-aaf6-41f7-b97f-0be96490de8f/image.png' }}
                  style={styles.buttonImage}
                />
        </TouchableOpacity>

        <View style={styles.boxContainer}>
          <Text style={styles.text}>알림 설정</Text>
          <Switch
            value={notificationEnabled}
            onValueChange={toggleNotification}
            trackColor={{ false: '#767577', true: '#FFB15F' }}
            thumbColor={notificationEnabled ? '#FFFFFF' : '#FFFFFF'}
            style={styles.switch}
          />
        </View>
        <TouchableOpacity style={styles.boxContainer} onPress={openLogoutModal}>
            <Text style={styles.text}>로그아웃</Text>
            <Image source={{ uri: 'https://velog.velcdn.com/images/thgus05061/post/774a2d59-aaf6-41f7-b97f-0be96490de8f/image.png' }}
                  style={styles.buttonImage}
                />
        </TouchableOpacity>

        {/* 판매자 변경 모달 */}
        <Modal isVisible={isSellerModalVisible} backdropOpacity={0.7}>
          <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.backImage} onPress={closeSellerModal}>
            <Image
              source={{
                uri: 'https://velog.velcdn.com/images/thgus05061/post/6f2ee1a6-5244-43a7-84e9-27d1cb532ede/image.png',
              }}
              style={styles.backImage}
            />
          </TouchableOpacity>
            <Text style={styles.modalText1}>판매자</Text>
            <Text style={styles.modalText2}>로 변경하시겠습니까?</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={confirmSellerChange}>
                <Text style={styles.modalButtonText}>예</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#FF7979' }]} onPress={closeSellerModal}>
                <Text style={styles.modalButtonText}>아니오</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 로그아웃 모달 */}
      <Modal isVisible={isLogoutModalVisible} backdropOpacity={0.7}>
      <View style={styles.modalContainer}>
      <TouchableOpacity style={styles.backImage} onPress={closeLogoutModal}>
            <Image
              source={{
                uri: 'https://velog.velcdn.com/images/thgus05061/post/6f2ee1a6-5244-43a7-84e9-27d1cb532ede/image.png',
              }}
              style={styles.backImage}
            />
          </TouchableOpacity>
        <Text style={styles.logoutText}>
          <Text style={styles.boldText}>로그아웃</Text>
          <Text style={styles.regularText}> 하시겠습니까?</Text>
        </Text>
          <View style={styles.modalButtonContainer2}>
            <TouchableOpacity style={styles.modalButton} onPress={handleLogout}>
              <Text style={styles.modalButtonText}>예</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#FF7979' }]} onPress={closeLogoutModal}>
              <Text style={styles.modalButtonText}>아니오</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

        

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  boxContainer: {
    width: 305,
    height: 58,
    flexShrink: 0, 
    borderRadius: 23,
    backgroundColor: '#FFF', 
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 2,
    flexDirection:"row",
    marginTop:22,
    elevation:4,
  },
  text: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 22,
    letterSpacing: -0.408,
    position: 'absolute',
    left: 35, 
    alignSelf: 'center', 
  },
  buttonImage: {
    width: 13, 
    height: 16, 
    marginLeft: 5,
    position: 'absolute',
    right: 13, 
    alignSelf: 'center',
  },
  
  imageContainer: {
    justifyContent: 'center', 
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    width: '100%', 
  },
  image: {
    width: 93,
    height: 93,
    marginHorizontal: 39.5, 
  },
  customerText:{
      color: '#D0812E',
      textAlign: 'center',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 22,
      letterSpacing: -0.408,
  },
  sellerText:{
    color: '#918B6F',
      textAlign: 'center',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '700',
      lineHeight: 22,
      letterSpacing: -0.408,
  },
  imageButton: {
    marginBottom: 9,
    alignItems: 'center',
    marginBottom:57,
  },
  switch: {
    position: 'absolute',
    alignSelf: 'center',
    right: 10, 
    alignSelf: 'center',
  },
  modalContainer: {
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: 330,
    height: 151,
    flexShrink: 0,
    padding: 20,
  },
  modalText1: {
    color: '#918B6F',
    textAlign: 'center', 
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: -0.408,
    marginTop: 10,
    textAlignVertical: 'center', 
    height: 30,
  },
  modalText2: {
    color: '#000',
    textAlign: 'center',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:10,
  },
  modalButtonContainer2: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop:23,
  },
  modalButton: {
    width: 104,
    height: 36,
    flexShrink: 0,
    borderRadius: 14,
    borderWidth: 0.2,
    borderColor: '#000',
    backgroundColor: '#FFF',
    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    elevation:4,
  },
  modalButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 13,
    fontStyle: 'normal',
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.408,
  },
  backImage:{
    width: 9, 
    height: 9, 

  },
  logoutText: {
    color: '#000',

    textAlign: 'center',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 22,
    letterSpacing: -0.408,
    marginTop:25,
  },
  boldText: {
    fontWeight: 'bold',
  },
  regularText: {
    fontWeight: '400',
  },
});

export default MyPage;