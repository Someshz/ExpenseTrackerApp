import {Text, View} from 'react-native'
import {StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/Styles';

function ErrorOverlay({message}){
    return <View style={styles.container}>
        <Text style={styles.text}>An Error Occurred</Text>
        <Text style={styles.text}>{message}</Text>
    </View>
}

export default ErrorOverlay;


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:GlobalStyles.colors.primary800
    },
    text:{
        color:'white',
        fontSize:20
    }
})