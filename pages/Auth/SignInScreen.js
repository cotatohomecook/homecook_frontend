import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUserName] = useState("");
  const navigation = useNavigation();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    const userData = {
      email,
      password,
      username,
    };

    try {
      const response = await axios.post(
        "http://3.38.33.21:8080/api/auth/join",
        userData
      );
      console.log(response.data.result);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error signing up:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="비밀번호"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="비밀번호 확인"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TextInput
            style={styles.inputBox}
            placeholder="이름"
            value={username}
            onChangeText={setUserName}
          />
          <TouchableOpacity style={styles.signButton} onPress={handleSignUp}>
            <Text style={styles.signText}>회원가입</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 50,
  },
  inputContainer: {
    marginTop: 143,
  },
  inputBox: {
    width: 350,
    borderWidth: 1,
    borderColor: "#903816",
    borderRadius: 17,
    marginBottom: 20,
    padding: 10,
  },
  signButton: {
    backgroundColor: "#FF764A",
    width: 339,
    height: 49,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  signText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default SignUpScreen;
