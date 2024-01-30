import { StyleSheet, Text, View } from 'react-native';
import Input from './Input';
import { GlobalStyles } from '../constants/Styles';
import Button from '../components/Button';
import { useState } from 'react';
import { DateFormatter } from '../util/DateFormatter';


function ManageInputExpense({ onCancelClick, submitText, onSubmit, defaultValue }) {
    const [inputHandlerState, setInputHandlerState] = useState({
        amount: {
            value: defaultValue ? defaultValue.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValue ? DateFormatter(defaultValue.date).toString() : '',
            isValid: true
        },
        description: {
            value: defaultValue ? defaultValue.description.toString() : '',
            isValid: true
        }
    })

    function submitHandler() {
        const expenseData = {
            amount: +inputHandlerState.amount.value,
            date: new Date(inputHandlerState.date.value),
            description: inputHandlerState.description.value
        }

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date' && new Date() >=expenseData.date ;
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputHandlerState((currentState) => {
                return {
                    amount: { value: currentState.amount.value, amountIsValid },
                    date: { value: currentState.date.value, dateIsValid },
                    description: { value: currentState.description.value, descriptionIsValid }
                }
            })
            return;
        }

        

        onSubmit(expenseData);
    }

    const formIsInValid=(!inputHandlerState.amount.isValid || !inputHandlerState.date.isValid || !inputHandlerState.description.isValid ) 

    

    function inputHandler(inputIdentifier, expenseData) {
        setInputHandlerState((currentState) => {
            return { ...currentState, [inputIdentifier]: { value: expenseData, isValid: true } }
        })
    }


    return <View style={styles.rootContainer}>
        <Text style={styles.text}>Your Expense</Text>
        <View style={styles.rowContainer}>

            <Input label="Amount" style={styles.flexStyle} textInputConfig={
                {
                    keyboardType: 'decimal-pad',
                    onChangeText: inputHandler.bind(this, 'amount'),
                    value: inputHandlerState.amount.value
                }
            } />
            <Input label="Date" style={styles.flexStyle} textInputConfig={
                {
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputHandler.bind(this, 'date'),
                    value: inputHandlerState.date.value
                }
            } />
        </View>
        <Input label="Description" textInputConfig={
            {
                multiline: true,
                onChangeText: inputHandler.bind(this, 'description'),
                value: inputHandlerState.description.value
            }
        } />
        {formIsInValid && <Text style={styles.error}>Please Enter Correct Values</Text>}

        <View style={styles.buttonContainer}>
            <Button onPress={onCancelClick} style={styles.buttonStyle}>Cancel</Button>
            <Button mode="flat" onPress={submitHandler} style={styles.buttonStyle}>{submitText}</Button>
        </View >
    </View>
}


export default ManageInputExpense;


const styles = StyleSheet.create({
    rootContainer: {
        margin: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        fontSize: 24,
        color: GlobalStyles.colors.primary100
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    flexStyle: {
        flex: 1,
    },
    error:{
        color:GlobalStyles.colors.error500,
        padding:8,
        margin:10,
    }
})