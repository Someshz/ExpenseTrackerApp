import { View, Pressable, StyleSheet } from "react-native";
import  Ionicons  from 'react-native-vector-icons/Ionicons'

function ManageButton({icon,size,color,onPress}) {
    return <Pressable style={({pressed})=> pressed && styles.pressed} onPress={onPress}>
        <View style={styles.buttonContainer}>
            <Ionicons name={icon} size={size} color={color} />
        </View>
    </Pressable>
}

export default ManageButton;

const styles=StyleSheet.create({
    buttonContainer:{
        borderRadius:24,
        padding:6,
        marginHorizontal:8,
        marginHorizontal:2
    },
    pressed:{
        opacity:0.75
    }
})