import { Pressable, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Emp } from '../components'
import { database } from '../src/firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { Ionicons } from '@expo/vector-icons'
import { FAB, useTheme } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const Employee = ({ navigation }) => {

    const [emp, setEmp] = useState([])
    useEffect(() => {
        getEmployees()
    }, [])

    const isFocused = useIsFocused()

    useEffect(() => {
        getEmployees()
    }, [isFocused])

    const { colors } = useTheme()
    const getEmployees = async () => {
        const q = query(collection(database, "Users"));
        const employees = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            employees.push(doc.data())
        });
        setEmp(employees)
        console.log(employees)
    }

    const Employees = emp.map((item, index) => {
        return <Pressable onPress={() => { }}>
            <Emp name={item.name} id={item.id} />
        </Pressable>
    })

    return (
        <View style={{ ...styles.mainContainer, backgroundColor: colors.onSecondary }}>

            {Employees}

            <FAB
                icon="plus"
                style={styles.fab}
                onPress={() => navigation.navigate("AddEmp")}
            />

        </View>
    )
}

export default Employee

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    mainContainer: {

        flex: 1
    }
})