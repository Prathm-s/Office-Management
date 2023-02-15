import { Pressable, StyleSheet, View, Picker, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'

import { Input } from '../components'
import TextLabel from '../components/TextLabel'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import Piker from '../components/Piker';
import { Card, Button, Text, useTheme, Dialog, Portal, List } from 'react-native-paper';
import Visits from '../components/Visits';
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { database } from '../src/firebase/config';
import { getAuth } from 'firebase/auth';
import { Linking } from 'react-native';


const ViewCust = ({ navigation, route }) => {
    const auth = getAuth()
    const user = auth.currentUser
    const cid = route.params.item.id
    const { colors } = useTheme()
    const [customer, setCustomer] = useState({ visits: [] })
    const [reload, setReload] = useState(false)
    const [visitInfo, setVisitInfo] = useState({})
    const [me, setMe] = useState({})
    const [status, setStatus] = useState("")

    //Dialog information 
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);


    useEffect(() => {
        getCurrentUser()
        getCustomerInfo(cid)
    }, [reload])

    const getCurrentUser = async () => {
        const docRef = doc(database, "Users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            setMe(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }


    const getChangedText = (fieldName, text) => {
        setVisitInfo({ ...visitInfo, [fieldName]: text })
    }

    const getCustomerInfo = async (id) => {
        const docRef = doc(database, "Task", id)
        await getDoc(docRef).then((response) => {
            setCustomer(response.data())
            setReload(!reload)
        }).catch((error) => { return null })

    }


    const options = [
        {
            label: "Prathmesh",
            value: "Prathmesh"
        },
        {
            label: "Bhairav",
            value: "Bhairav"
        },

    ]


    const getSelectedOption = (item, index) => {
        console.log(item, index)
    }

    //task to perform 
    const doneTask = () => {
        const taskRef = doc(database, 'Task', cid)
        const currentEmp = {
            ...visitInfo,
            name: me.name,
            date: new Date().toISOString().slice(0, 10),
            status: "done"
        }
        setDoc(taskRef, { status: 'done', visits: [...customer.visits, currentEmp] }, { merge: true }).then((response) => {
            console.log("Updated!!")
        }).catch((error) => console.log(error))
        setReload(!reload)
    }

    const incompleteTask = () => {
        const taskRef = doc(database, 'Task', cid)
        const currentEmp = {
            ...visitInfo,
            name: me.name,
            date: new Date().toISOString().slice(0, 10),
            status: "incomplete"
        }
        setDoc(taskRef, { status: 'failed', visits: [...customer.visits, currentEmp] }, { merge: true }).then((response) => {
            console.log("Updated!!")
        }).catch((error) => console.log(error))
        setReload(!reload)
    }

    const inProgress = () => {
        const taskRef = doc(database, 'Task', cid)

        const currentEmp = {
            ...visitInfo,
            name: me.name,
            date: new Date().toISOString().slice(0, 10),

        }
        setDoc(taskRef, { status: 'inprogress', visits: [...customer.visits, currentEmp] }, { merge: true }).then((response) => {
            console.log("Updated!!")
        }).catch((error) => console.log(error))
        setReload(!reload)
    }



    const allVisist = customer.visits.map((item, index) => {
        return <Visits employee={item} />
    })


    return (
        <View style={{ ...styles.mainContainer, backgroundColor: colors.onSecondary }}>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Done</Dialog.Title>
                    <Dialog.Content>
                        <Text>Please add amount and note for refernce </Text>
                        <Input label="Note" field="note" CallBackFunction={getChangedText} placeholder={customer.note} />
                        <Input label='Total Amount' field="amount" CallBackFunction={getChangedText} />
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            if (status == "" || status == "done") {
                                doneTask()
                            } else {
                                incompleteTask()
                            }
                            hideDialog()
                        }}>{status=="incomplete"?'Incomplete':'Done'}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>


            <Card style={{ padding: 10 }}>
                <Card.Title title={customer.name} titleStyle={{ fontWeight: 'bold' }} />


                <Card.Content>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextLabel label={"Mobile"} text={"+91 " + customer.mobile} />
                        <TextLabel label={"Deadline"} text={customer.deadline} />
                    </View>
                    <TextLabel label={"Issue"} text={customer.issue} />

                    <TextLabel label={"Address"} text={customer.address} />
                    <TextLabel label={"Assigned to "} text={customer.assigned == undefined ? "Testing" : customer.assigned.name} />


                    {/* <Text variant="bodyMedium">Deadline: {customer.deadline}</Text>
                    <Text variant="bodyMedium">Issue: {customer.issue}</Text>
                    <Text variant="bodyMedium">Address: {customer.address}</Text> */}
                </Card.Content>


                <Card.Actions>
                    <Button onPress={() => {
                        Linking.openURL(`tel:${customer.mobile}`)
                    }}>Call</Button>
                    <Button disabled={customer.status == "inprogress" || customer.status == "done" ? true : false} onPress={() => {
                        console.log("Visisting")
                        inProgress()
                    }}>Visit</Button>
                </Card.Actions>
            </Card>

            {/* <View>
                <Text style={{ fontWeight: 'bold', marginTop: 20 }}> Extra Details </Text>
                <Input label="Note" field="note" CallBackFunction={getChangedText} placeholder={customer.note} />
                <Input label='Total Amount' field="amount" CallBackFunction={getChangedText} />
            </View> */}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>Visits</Text>
                <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 20 }}>{customer.visits.length}</Text>

            </View>

            <ScrollView>
                <List.Section>
                    {allVisist}
                </List.Section>
            </ScrollView>



            {
                customer.status == "done" ? <View></View> : <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                    <Pressable style={{ backgroundColor: '#EBEBEB', ...styles.buttonUI }} onPress={() => {
                        setStatus('incomplete')
                        showDialog()
                    }}>
                        <MaterialIcons name="pending-actions" size={24} color="black" />
                        <Text style={{ color: colors.onSecondary }}>Incomplete</Text>
                    </Pressable>
                    <Pressable style={{ backgroundColor: '#3692FF', ...styles.buttonUI }} onPress={showDialog}>
                        <Ionicons name="checkmark-done" size={24} color="white" />
                        <Text style={{ color: 'white' }}>Done </Text>
                    </Pressable>
                </View>
            }

        </View>
    )
}

export default ViewCust

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,

        flex: 1
    },
    buttonUI: {

        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderRadius: 8,
    },
    picker: { padding: 12, borderRadius: 8, borderColor: 'lightgray', marginVertical: 4 }

})