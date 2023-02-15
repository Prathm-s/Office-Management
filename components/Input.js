import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import React from 'react'

const Input = ({ placeholder = "", label = null, CallBackFunction, field, disabled = false, ...props }) => {
    return (
       
            <TextInput
                disabled={disabled}
                label={label}
                password
                mode='outlined'
                onChangeText={(text) => CallBackFunction(field, text)}
                style={styles.input}
                {...props}
            />
     
    )
}

export default Input

const styles = StyleSheet.create({
    input:{
        marginVertical:10,
       
    }
})