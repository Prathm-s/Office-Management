import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TextLabel = (props) => {
    return (
        <View>
            <Text style={{ color: "lightgray" }} >{props.label}</Text>
            <Text style={{fontWeight:'500',color:'white'}}>{props.text}</Text>
        </View>
    )
}

export default TextLabel

const styles = StyleSheet.create({})