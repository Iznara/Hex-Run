import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Overlay } from 'react-native-elements';

const FormError = (props) => {

    return (
        <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={() => props.hideErrOverlay(false)}>
            <Text style={styles.errorMessage}>
                {props.err}
            </Text>
            <TouchableOpacity style={styles.Button} onPress={() => props.hideErrOverlay(false)}>
                <Text style={styles.buttonText}>Got It!</Text>
            </TouchableOpacity>
        </Overlay>
    )
}

export default FormError;
const styles = StyleSheet.create({
    Overlay: {
        width: '90%',
        height: 320,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorIcon: {
        width: 72,
        height: 72,
    },
    errorMessage: {
        fontWeight: "bold",
        color: 'grey',
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center'
    },
    buttonText: {
        fontWeight: "bold",
        color: "white",
        fontSize: 16,
    },
    Button: {
        width: 280,
        color: '#000',
        height: 51,
        backgroundColor: 'tomato',
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
})