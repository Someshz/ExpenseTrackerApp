import { StyleSheet, Text, TextInput, View } from 'react-native';
import { GlobalStyles } from '../constants/Styles';

function Input({ label, textInputConfig, style }) {

    const inputStyles = [styles.input];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles.push(styles.inputMultiline)
    }
    return <View style={[styles.inputContainer, style]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput {...textInputConfig} style={inputStyles} />
    </View>
}

export default Input;


const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        color: GlobalStyles.colors.primary100,
        fontSize: 16,
        marginBottom: 8,
    },
    input: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        fontSize: 24,
        borderRadius: 8
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top'
      },
})