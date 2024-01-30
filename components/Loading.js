import {View} from 'react-native'
import { ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/Styles';

function Loading(){
    return <View style={styles.container}>
        <ActivityIndicator size='large' color='white'/>
    </View>
}

export default Loading;


const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:GlobalStyles.colors.primary800
    }
})