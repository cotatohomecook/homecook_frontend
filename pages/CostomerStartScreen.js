import { View, Text, StyleSheet, Image, FlatList, Pressable, ScrollView, TouchableOpacity} from 'react-native';
//import Button from '../components/Button';
import React, {useState} from 'react';
import { CARDS } from '../data/dummy-data';

// 음식 슬라이드 더미 데이터 받아오는 코드
const renderGridItem = (itemData) => {
  
  return (
    <View style = {styles.gridItem}>
    <Pressable style = {styles.buttons}>
    <Image source={{uri: itemData.item.imageUrl, "width":141,"height":90}}/>
    <Text style = {styles.titles}>{itemData.item.title}</Text>
    <Text style = {styles.details}>{itemData.item.text}</Text>
    </Pressable>
    </View>
  );
}

// 음식별 슬라이드 더미 데이터 받아오는 코드
const renderButtonItem = (itemData) => {
  return (
      <Text style = {styles.category}>{itemData.item.menu}</Text>
  )
}

// 카테고리 버튼 

function CostomerStartScreen({navigation}){


//순위 슬라이드 더미 데이터 받아오는 코드
const [MENU, setMENU] =  useState([
  {title: '케이크 홀릭', love: 20},
  {title: '성수샌드위치', love: 30}, 
  {title:'순이네 집밥', love: 40}, 

  ]);
  
  //love(좋아요) 갯수를 기준으로 순위 매기는 알고리즘
  const displaymenu = MENU.sort(function(a,b){
    return b.love - a.love;
  })  
  var rank = 1;
  for (var i = 0; i < MENU.length; i++) {

  if (i > 0 && MENU[i].love< MENU[i - 1].love) {
    rank++;
  }
    MENU[i].rank = rank;
  }

  //화면 출력 
  return(
    <>

    <View style={styles.imageContainer}>
    <Text style = {styles.title}>지금 내 지역은?</Text> 

    <View style = {[styles.position, styles.color]}>
    <Image source={{uri : "https://velog.velcdn.com/images/kkaerrung/post/3e76ff47-3626-471e-9034-1aef778633b0/image.png", "width":14.18,"height":13,}}/>
    </View>

    <View style = {styles.ractangle}>
    <Pressable style = {styles.inputContainer} 
    onPress={()=> navigation.navigate('CostomerMap')}
    >
    <Text style={styles.invalidName}>성수동</Text>
    </Pressable>
    </View>

    </View>
    <View style = {[styles.whitebox]}>
    </View>
    <Text style = {[styles.text]}>지금까지 누적 랭킹입니다.</Text>
    
    <View style = {styles.textdesign}>
    <FlatList 
    data = {MENU}
    keyExtractor = {(item) => item.title}
    renderItem={({item}) => (
      <Text>{item.rank}등&nbsp;{item.title}</Text>
    )}
    />
    </View>
   <Text style = {styles.how}> 오늘은 어떤</Text>
   <Text style = {styles.food}>음식 </Text>
   <Text style = {styles.want}>이 땡기세요?</Text>

<View style = {styles.box}>

</View>
<View style = {styles.all}>
<ScrollView horizontal = {true}>
   <FlatList keyExtracter={(item) => item.title} 
          data={CARDS} 
          renderItem={renderGridItem}
          numColumns={CARDS.length}   
/>
</ScrollView>  
</View> 



</>

    );
}
export default CostomerStartScreen;


//스타일링
const styles = StyleSheet.create({
  imageContainer: {
  flexDirection:'row',
  position: 'absolute',
  justifyContent: 'center',
  alignItems:'center',
  width: 393,
  height: 168,
  left: 0,
  top: 0,
  backgroundColor:'#FFB15F',
  borderRadius: 16,
  zIndex: 2,

  elevation: 11,
  
},

position: { 
  position: "absolute",
  width: 14.18,
  height: 13,
  left: 220,
  top: 91,
  backgroundColor: "#72FFAA"
  
},

color : {
  position: "absolute",
  width: 13,
  height: 12,
  left: 220.5,
  top: 95,
  background: "#72FFAA"
},

title: {
  position: "absolute",
  width: 224,
  height: 22,
  left: 79,
  top: 88,
  
  //fontFamily: 'Noto Sans KR';
  fontStyle: "normal",
  fontWeight: 700,
  fontSize: 19,
  lineHeigh: 29,

  color:"#000000",
        
},

inputContainer: {
    width: 69,
    height: 27,
    borderRadius: 9,
    backgroundColor: "#ffffff",
    zIndex: 0  
},
invalidName:{
  width: 34,
  height: 17,
  top: 5,
  left: 15,
  //fontFamily: "NotoSansKR",
  fontSize: 12,
  fontWeight: "bold",
  fontStyle: "normal",
  letterSpacing: 0,
  textAlign: "center",
  color: "#3d67ff"
},

whitebox : { 
  position: "absolute",
  width: 328,
  height: 44,
  left: 33,
  top: 147,
  backgroundColor: "#FFFFFF",
  //box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  borderRadius: 16,
  elevation: 7,
  zIndex: 3,
},
text :{
  position: "absolute",
  width: 131,
  height: 17,
  left: 49,
  top: 159,

  //font-family: 'Noto Sans KR';
  //font-style: normal;
  fontWeight: 500,
  fontSize: 12,
  lineHeight: 17,
  zIndex: 4,

color: "#000000"
},
textdesign: {
  position: "absolute",
  width: 87,
  height: 17,
  left: 263,
  top: 160,

  //font-family: 'Noto Sans KR';
  //font-style: normal,
  fontWeight: 500,
  fontSize: 12,
  //lineHeight: 17,

  color: "#000000",
},
how :{
  position: "absolute",
  width: 278,
  height: 38,
  left: 58,
  top: 209,

  //font-family: 'Noto Sans KR';
  //font-style: normal;
  fontWeight: 500,
  fontSize: 20,
  lineHeight: 29,

  color: "#000000"

},
food:{
  position: "absolute",
  width: 69,
  height: 38,
  left: 170,
  top: 206,

  //font-family: 'Noto Sans KR';
  //font-style: normal;
  fontWeight: 900,
  fontSize: 24,
  lineHeight: 35,
  color: "#F3AC61",
},
want: {
  position: "absolute",
  width: 130,
  height: 29,
  left: 229,
  top: 210,

  //fontFamily: 'Noto Sans KR';
  //font-style: normal;
  fontWeight: 500,
  fontSize: 20,
  //line-height: 29,
  color: '#000000'

},
slide:{
  display: "flex",
  flexDirection: "row",
  alignItems: "flex-start",
  padding: 0,
  gap: 15,
  
  position: "absolute",
  width: 510,
  height: 160,
  left: 10,
  top: 0,
},
box: {
position: "absolute",
width: 160,
height: 160,
left: 0,
top: 0,

background: "#FFB15F",
borderRadius: 30,
},

gridItem :{ 
  flex: 1,
  margin: 15,
  width: 160,
  height: 160,
  marginTop: 200,
  borderRadius: 30,
  elevation: 4,
  backgroundColor: '#FFB15F'
},
buttons:{
  flex: 1,
  top: 8,
  alignItems: 'center',
},
image: { 
  flex: 1,
  width : 30, 
  heigth: 200,
},
titles: {
  flex: 1,
  position: 'absolute',
  width: 79,
  height: 19,
  top: 99,
  textAlign: "center",
  //font-family: 'Noto Serif KR';
  //font-style: normal;
  fontWeight: 700,
  fontSize: 13,
  //lineHeight: 19,
  color: '#FFFFFF'
},
details: {
position: "absolute",
width: 39,
height: 14,
textAlign: "center",
top: 124,

//font-family: 'Noto Serif KR';
//font-style: normal;
fontWeight: 500,
fontSize: 10,
//line-height: 14px;
textAlign: 'center',

color: '#FFFFFF'
},

all: {
  flex: 1,
  width:"100%",
  top: 50,
  Height: 38
 
},
Meals: {
  position: "absolute",
  width: 393,
  height: 27,
  left: 0,
  top: 450,
},

container: {
  flex: 1,
},
categoryContainer: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  paddingVertical: 10,
  backgroundColor: '#eee',
},
categoryButton: {
  paddingHorizontal: 15,
  paddingVertical: 8,
  borderRadius: 20,
  backgroundColor: '#fff',
},
ractangle:{
  position: "absolute",
  width: 69,
  height: 27,
  left: 246,
  top: 91,
  zIndex: 0

}
});