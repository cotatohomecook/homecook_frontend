import { Text, View, StyleSheet,Pressable, Image } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function CostomerMap() {
    return(

    <View>
    <PrimaryButton classname="list" >
        <Image source={{uri : "https://velog.velcdn.com/images/thgus05061/post/cf0103c9-70da-4252-b8b0-4de27ba7f19e/image.png"}} style={styles.List}/>
    </PrimaryButton>
    <PrimaryButton classname="bookmark" >
        <Image source={{uri : "https://velog.velcdn.com/images/thgus05061/post/2018910e-32b1-4d7f-aeb9-7d7e9e7c712f/image.png"}} style={styles.Bookmark}/>
    </PrimaryButton>
    <PrimaryButton classname="home">
        <Image source={{uri : "https://velog.velcdn.com/images/thgus05061/post/d5521db7-b2af-4662-9bfb-98fc10cabbb8/image.png"}} style={styles.Home}/>
    </PrimaryButton>
    <PrimaryButton classname="search">
    <Image source={{uri : "https://velog.velcdn.com/images/kkaerrung/post/6158ac0c-145e-4dd1-baef-1a91437559f4/image.png"}} style={styles.Search}/> 
        </PrimaryButton>
    <PrimaryButton classname="mypage">
        <Image source={{uri : "https://velog.velcdn.com/images/thgus05061/post/e408baf0-1211-423e-8b72-2b32d24f4965/image.png", "width": 19,
        "height": 19,
        "left": 349.1,
        "top": 818.4}} 
       />
    </PrimaryButton>
    </View>
    
    
    
    )
}
export default CostomerMap;


const styles=StyleSheet.create({
    List:{
        width: 18,
        height: 20.49,
        //left: 31,
        //top: 818,
        left: 100,
        top: 500,
        position: 'absolute',
        
    },
    Bookmark:{
        width: 27,
        height: 27,
        left: 102,
        top: 814,
        position: 'absolute',
        
    },
    Home:{
        width: 27.79,
        height: 27.38,
        left: 181,
        top: 795.8,
        position: 'absolute',
        
    },
    Search:{
        width: 18,
        height: 18,
        left: 267.6,
        top: 819.4,
        position: 'absolute',
        
    },
    MyPage:{
        width: 19,
        height: 19,
        left: 349.1,
        top: 818.4,
        position: 'absolute',
        
    }

});
