import { StyleSheet, View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input, Search } from '../components'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../src/firebase/config'
import { TextInput, Button, useTheme, Text } from 'react-native-paper'

import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {

    const { colors } = useTheme()

    const [loginRefresh, setLoginRefresh] = useState(false)

    const [info, setInfo] = useState({
        // "email": "bsk6383@gmail.com",
        // "password": "123456"
    })
    const getChangedText = (fieldName, text) => {
        console.log(text)
    }

    useEffect(() => {
        // console.log(info)
        login(info.email,info.password)
    }, [loginRefresh])

    useEffect(() => {
        const user = getLoggedUser().then((res) => {
            setInfo(res)
            setLoginRefresh(!loginRefresh)
        }).catch((error) => {
            
        })

    }, [])

    const getLoggedUser = async () => {
        try {
            const user = await AsyncStorage.getItem("Login")
            return user != null ? JSON.parse(user) : null;
        } catch (e) {
            return null
        }

    }

    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((response) => {
                saveValueLocally()
                navigation.navigate("Home")
            }).catch((error) => {
                console.log(error)
            })
    }

    const updateField = (field, data) => {
        setInfo({ ...info, [field]: data })
    }

    const saveValueLocally = async () => {
        await AsyncStorage.setItem("Login", JSON.stringify(info))
    }


    const loginPressed = () => {
        login(info.email, info.password)
    }

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: colors.onSecondary }}>
            <Text variant='headlineSmall' >Welcome at</Text>
            <Text variant='headlineLarge' style={{ fontWeight: 'bold', marginBottom: 20 }}>Perfect Techno Serve</Text>

            <Input placeholder="Username" label='Username' CallBackFunction={updateField} field="email" />
            <Input placeholder="Password" label='Password' CallBackFunction={updateField} field="password" />


            <Button
                style={{ marginVertical: 20 }}
                mode='contained'
                onPress={() => {
                    // navigation.navigate("Home")
                    loginPressed()
                }}
            >Login</Button>

        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center'
    }
})