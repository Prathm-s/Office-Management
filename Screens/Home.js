import { StyleSheet, View, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialIcons, Ionicons } from '@expo/vector-icons'
import { Customer, Input, Search } from '../components'
import { getAuth } from "firebase/auth";
import { FAB, Chip } from 'react-native-paper';
import { database } from '../src/firebase/config';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useTheme, Text, Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

const Home = ({ navigation }) => {

    const auth = getAuth();
    const userInfo = auth.currentUser;
    const [completed, setCompleted] = useState(false)
    const [pending, setPending] = useState(false)
    const [failed, setFailed] = useState(false)
    const { colors } = useTheme()
    const isFocused = useIsFocused()
    const [user, setUser] = useState([])
    const [backupuser, setBackupUser] = useState([])


    useEffect(() => {
        getUserDeatils() 
    }, [isFocused])

   

    useEffect(() => {
        filterData()
    }, [completed, pending, failed])


    const filterData = () => {
        const filtered = backupuser.filter((item) => {
            if (item.status == "done" && completed) {
                return item
            } else if (item.status == 'inprogress' && pending) {
                return item
            } else if ((item.status == "failed" || item.status == "incomplete") && failed) {
                return item
            } else if (!(completed || failed || pending)) { return item }
        })
        setUser(filtered)
    }




    const getUserDeatils = async () => {
        //Perform API call 
        const q = query(collection(database, "Task"));
        const customer = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            customer.push({ ...doc.data(), "id": doc.id })
        });

        setUser(customer)
        setBackupUser(customer)
    }

    const filterUsers = (field, name) => {
        const filtered = backupuser.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))
        setUser(filtered)

    }
    const Users = user.map((item, index) => {
        return <Customer
            key={index}
            item={item}
            navigation={navigation}
        />
    })

    return (
        <View style={{ ...styles.homeContainer, backgroundColor: colors.onSecondary }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {/* <Search style={{ flex: 1 }} filterCallBack={filterUsers} /> */}
                <Input label={"Serach Customer"} CallBackFunction={filterUsers} style={{ flex: 1 }} />
                <Pressable
                    style={{ marginLeft: 10 }}
                    onPress={() => {
                        navigation.navigate("Setting")
                    }}>
                    <MaterialIcons name="settings" size={24} color={colors.onPrimaryContainer} />
                </Pressable>
            </View>

        

            <View style={{ flex: 1 }}>

                <Text style={{ marginVertical: 20, fontWeight: '500' }}>Milestones</Text>
                <View style={{ flexDirection: 'row', marginBottom: 10 }}>

                    <Chip icon="check" onPress={() => setCompleted(!completed)} mode={completed ? 'flat' : 'outlined'}>Completed</Chip>
                    <Chip icon="bell-alert" style={{ marginHorizontal: 10 }} onPress={() => setFailed(!failed)} mode={failed ? 'flat' : 'outlined'}>Failed</Chip>
                    <Chip icon="account-clock" onPress={() => setPending(!pending)} mode={pending ? 'flat' : 'outlined'}>Progress</Chip>
                </View>


                <ScrollView>
                    {Users}
                </ScrollView>
            </View>

            <View style={{ flexDirection: "row", justifyContent: 'space-between', alignSelf: 'flex-end' }}>


                <FAB
                    icon="plus"
                    style={styles.fab}
                    onPress={() => navigation.navigate("AddTask")}
                />
            </View>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        padding: 20,

    }
})