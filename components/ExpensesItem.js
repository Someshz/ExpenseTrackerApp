import { View, Text, StyleSheet, Pressable } from 'react-native'
import { GlobalStyles } from '../constants/Styles';
import { DateFormatter } from '../util/DateFormatter';
import {useNavigation} from '@react-navigation/native';

function ExpensesItem({ id,description, amount, date }) {
 const navigation =useNavigation();

    function expenseItemPressHandler(){
        navigation.navigate('ManageExpense',{
            expenseId:id
        })
    }

    return <Pressable style={({pressed})=> pressed && Styles.pressed} onPress={expenseItemPressHandler}>
        <View style={Styles.rootContainer}>
            <View>
                <Text style={[Styles.text, Styles.textFont]}>{description}</Text>
                <Text style={Styles.text}>{DateFormatter(date)}</Text>
            </View>
            <View style={Styles.amountContainer}>
                <Text style={Styles.amount}>${amount.toFixed(2)}</Text>
            </View>
        </View>
    </Pressable>
}

export default ExpensesItem;


const Styles = StyleSheet.create({
    pressed:{
        opacity:0.75
    },
    rootContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: GlobalStyles.colors.primary500,
        borderRadius: 8,
        elevation: 8,
        padding: 10,
        marginVertical: 10,
    },
    text: {
        fontSize: 16,
        color: 'white'
    },
    textFont: {
        fontWeight: 'bold',
    },
    amountContainer: {
        backgroundColor: GlobalStyles.colors.primary50,
        padding: 8,
        minWidth: 80,
        borderRadius: 4
    },
    amount: {
        color: GlobalStyles.colors.primary700,
        fontSize: 20,
        fontWeight: 'bold'
    }
})
