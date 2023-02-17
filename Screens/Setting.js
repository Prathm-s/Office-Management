import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Input } from '../components'
import { getAuth } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { database } from '../src/firebase/config'
import { Button, Text, useTheme } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = ({ navigation }) => {
    const auth = getAuth()
    const user = auth.currentUser
    const [me, setMe] = useState({})

    const { colors } = useTheme()

    useEffect(() => {
        getCurrentUserDetails()
    }, [])


    const getCurrentUserDetails = async () => {
        const docRef = doc(database, "Users", user.uid)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
            setMe(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }

    }

    const removeValue = async() =>{
        try{
            await AsyncStorage.removeItem('Login')
        }catch(e){}
    }

    return (
        <View style={{ ...styles.mainContainer, backgroundColor: colors.onSecondary }}>
            <View>
                <Input value={me.name} label={"Name"} />
                <Input value={me.mobile} label={"Mobile"} />
                <Input value={me.email} label={"Email"} />

            </View>

            {me.email == "bsk6383@gmail.com" ? <View style={{ marginVertical: 20 }}>
                <Button
                    icon="account"
                    mode="outlined"
                    onPress={() => {
                        navigation.navigate('Employee')
                    }}
                >Employees</Button>

                <Button
                    style={{ marginVertical: 10 }}
                    icon="chart-arc"
                    mode="outlined"
                    onPress={() => {
                        navigation.navigate('Report')
                    }}
                >Report</Button>

            </View> : <View></View>
            }

            <View>
                <Button
                    style={{ marginVertical: 10 }}
                    mode='contained'
                    onPress={() => {
                    }}
                >Update</Button>

                <Button
                    mode='outlined'
                    onPress={() => {
                        auth.signOut().then((res) => {
                            removeValue()
                            navigation.navigate("Login")
                        }).catch((error) => { alert(error) })
                    }}
                >Logout</Button>

            </View>




        </View>
    )
}

export default Setting

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,

        flex: 1
    }
})