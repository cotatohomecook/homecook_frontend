import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Header from '../common/Header';
import BackButton from '../common/BackButton';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';
import ConfirmationButtons from '../common/ConfirmationButton';

function WriteReviewScreen() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.navigate('ListScreen');
  };

  const [reviewText, setReviewText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleReviewTextChange = (text) => {
    setReviewText(text);
    setIsEditing(text !== '');
  };

  const handleEditReview = () => {
    console.log("수정하기 버튼이 클릭되었습니다.");
    setIsEditing(false);
  };

  const handleDeleteReview = () => {
    console.log("삭제하기 버튼이 클릭되었습니다.");
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleConfirmDelete = () => {
    // 삭제 작업 수행
    console.log("리뷰를 삭제합니다.");
    handleModalClose();
  };

  const handleCancelDelete = () => {
    // 삭제 취소
    console.log("리뷰 삭제를 취소합니다.");
    handleModalClose();
  };

  return (
    <>
      <Header height={114} title={'내가 쓴 리뷰'} />
      <BackButton onPress={handleGoBack} top={-45} />
      <View style={styles.container}>
        <View style={styles.boxContainer}>
          <Text style={styles.text}>순이네 집밥</Text>
        </View>
        <View style={styles.ReviewContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="리뷰는 50자 내로 작성 가능합니다."
            value={reviewText}
            onChangeText={handleReviewTextChange}
          />
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditReview}
            activeOpacity={0.7}
          >
            <Text style={styles.buttonText}>수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.deleteButton, reviewText !== '' ? styles.deleteButtonDisabled : null]}
            onPress={handleDeleteReview}
            disabled={reviewText !== ''}
          >
            <Text style={[styles.buttonText, reviewText !== '' ? styles.deleteButtonTextDisabled : null]}>삭제하기</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal isVisible={isModalVisible} onBackdropPress={handleModalClose}>
        <View style={styles.modalContainer}>
        <Text style={styles.modalText}>내가 쓴 리뷰를{'\n'}삭제하시겠습니까?</Text>
          <ConfirmationButtons onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  boxContainer: {
    width: 347,
    height: 60,
    borderRadius: 9,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  ReviewContainer: {
    width: 347,
    height: 277,
    flexShrink: 0,
    borderRadius: 19,
    background: '#FFFF',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
    marginTop: 30,
  },
  textInput: {
    width: '80%',
    height: 40,
    borderColor: '#ABABAB',
    borderWidth: 0,
    marginTop: -200,
    paddingHorizontal: 10,
  },
  editButton: {
    width: 154,
    height: 61,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 20,
    backgroundColor: 'white',
  },
  deleteButton: {
    width: 154,
    height: 61,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 20,
    backgroundColor: '#FFAFA8',
    left: 10,
  },
  deleteButtonDisabled: {
    backgroundColor: '#FFE4E1',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: -0.40799999237060547,
    textAlign: 'center',
  },
  deleteButtonTextDisabled: {
    color: '#FFC2C2',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 338,
    height: 198,
  },
  modalText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 33,
    letterSpacing: -0.40799999237060547,
    textAlign: 'center',
    //fontFamily: 'Noto Sans KR',
    marginTop:10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
  },
  modalButton: {
    backgroundColor: '#FFAFA8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  modalButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default WriteReviewScreen;
