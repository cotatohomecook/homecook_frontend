import {View, Text, Pressable, StyleSheet} from 'react-native';

function PrimaryButton({children}){
    function pressHandler(){
        console.log("pressed@@");
    }

    return (
        <View>
            <Pressable onPress={pressHandler}>
                <View style={styles.buttomRectangle}>
                    <Text>{children}</Text>
                </View>
                <View style={styles.buttomRectangle}>
                </View>
            </Pressable>
        </View>
        
        
    );
    
    
}

export default PrimaryButton;

const styles=StyleSheet.create({
    topRectangle:{
        //width: 393,
        width:50,
        height: 168,
        backgroundColor: "#ffb15f"
    },
    buttomRectangle:{
        width: 393,
        height: 51,
        left: 0,
        //top: 801,
        top:500,
        backgroundColor: "#ffb15f"
    },
    circleButton:{
        width: 71,
        height: 774,
        left: 160,
        //top:774,
        top:10,
        backgroundColor: "#ffb15f",
        borderRadius:100,
        elevation:1,
    }
});