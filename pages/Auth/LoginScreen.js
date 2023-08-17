import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { setLoginData } from "../../store/redux/Auth";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigateToSignUp = () => {
    navigation.navigate("SignUpScreen");
  };

  const handleLogin = async () => {
    const userData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://3.38.33.21:8080/api/auth/login",
        userData
      );
      dispatch(
        setLoginData({
          customerAccessToken: response.data.data.customerAccessToken,
          sellerAccessToken: response.data.data.sellerAccessToken,
          refreshToken: response.data.data.refreshToken,
        })
      );

      const customerAccessToken = response.data.data.customerAccessToken;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${customerAccessToken}`;
      navigation.navigate("CustomerStartScreen");
    } catch (error) {
      console.error("로그인 오류:", response.data.message);

      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>환영합니다!</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.inputBox}
          placeholder="아이디"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputBox}
          placeholder="비밀번호"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signUpTextContainer}
        onPress={navigateToSignUp}
      >
        <Text>계정이 없으신가요?</Text>
        <Text style={styles.signUpText}> 회원가입</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#FF764A",
    marginTop: -100,
  },
  inputContainer: {
    marginTop: 83,
  },
  inputBox: {
    width: 350,
    borderWidth: 1,
    borderColor: "#903816",
    borderRadius: 17,
    marginBottom: 20,
    padding: 10,
  },
  loginButton: {
    backgroundColor: "#FF764A",
    width: 339,
    height: 49,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  signUpTextContainer: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
  },
  signUpText: {
    color: "#000000",
    fontSize: 15,
    fontWeight: "700",
  },
});
