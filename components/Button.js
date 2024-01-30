import {Pressable, StyleSheet, View, Text} from 'react-native'
import { GlobalStyles } from '../constants/Styles';

function Button({children,onPress,mode,style}){
    return <View style={style}>
        <Pressable onPress={onPress} style={({pressed} )=>  pressed && styles.pressed} >
            <View style={[styles.rootContainer ,mode==='flat' && styles.flatContainer,  ]}>
                <Text style={[styles.buttonText ,mode==='flat' && styles.flatText ]}>{children}</Text>
            </View>
        </Pressable>
    </View>
}

export default Button;

const styles=StyleSheet.create({
    rootContainer:{
        padding:12,
        borderRadius:4,
        backgroundColor:GlobalStyles.colors.primary500,
    },
    flatContainer:{
        backgroundColor:'transparent',
    },
    buttonText:{
        color:'white',
    },
    flatText:{
        color:GlobalStyles.colors.primary200,
    },
    pressed:{
        opacity:0.75,
        backgroundColor:GlobalStyles.colors.primary100
    }

})
