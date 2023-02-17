import { StyleSheet, Text, View, Picker, KeyboardAvoidingView, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input } from '../components'
import Piker from '../components/Piker'
import { Button, TextInput, useTheme, Portal, Dialog } from 'react-native-paper'
import { addDoc, collection, doc, setDoc, query, getDocs } from 'firebase/firestore'
import { database } from '../src/firebase/config'
import { getAuth } from 'firebase/auth'
import { DatePickerModal } from 'react-native-paper-dates';
import { TimePickerModal } from 'react-native-paper-dates'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { ScrollView } from 'react-native'
import { Emp } from '../components'
import * as SMS from 'expo-sms';

const AddTask = ({ navigation }) => {
    //Date Picker 
    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    //Time Picker
    const [time, setTime] = React.useState(undefined);
    const [openTime, setOpenTime] = React.useState(false);


    const [employees, setEmployees] = useState([])
    const [backEmployees, setBackEmployees] = useState([])

    const [selected, setSelected] = useState(-1)
    // Get User details 
    const auth = getAuth()
    const user = auth.currentUser;
    const { colors } = useTheme()

    //About Dialog
    const [visible, setVisible] = React.useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    useEffect(() => {
        getEmployees()
    }, [])

    //Date Picker 
    const onDismissSingle = React.useCallback(() => {
        setOpen(false);
    }, [setOpen]);

    const onConfirmSingle = React.useCallback(
        (params) => {
            setOpen(false);
            setDate(params.date);
        },
        [setOpen, setDate]
    );

    //Time Picker 
    const onDismissSingleTime = React.useCallback(() => {
        setOpenTime(false);
    }, [setOpenTime]);

    const onConfirmSingleTime = React.useCallback(
        (params) => {
            console.log(params)
            setOpenTime(false);
            setTime(params);
        },
        [setOpenTime, setTime]
    );



    const [task, setTask] = useState({
        "priority": '0',
        "status": 'incomplete',
        "visits": [],
        "deadline": ""
    })

    const getEmployees = async () => {
        const q = query(collection(database, "Users"));
        const employees = []
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            employees.push(doc.data())
        });
        setEmployees(employees)
        setBackEmployees(employees)
    }


    const getChangedText = (fieldName, text) => {
        setTask({ ...task, [fieldName]: text })
    }

    const addTask = async () => {
        // perform api call
        // console.log( {...task,'deadline':date})
        if (selected == -1) {
            alert("Assign task to employee")
            return
        }

        await addDoc(collection(database, "Task"), { ...task, 'deadline': date.toISOString().slice(0, 10) + '', 'assigned': employees[selected], "time": time })
            .then((Response) => {
                sendMessage()
                alert("task has been stored successfully!")
                navigation.navigate("Home")
            })
            .catch((error) => {
                alert(error)
            })

    }

    const sendMessage = async () => {
        const isAvailable = await SMS.isAvailableAsync();
        if (isAvailable) {
            // do your SMS stuff here
            const { result } = await SMS.sendSMSAsync(
                employees[selected].mobile,
                'New task has been assigned to you! Customer name:' + task.name + '  Check office app for more details.',
            );
            console.log(result)

            alert("Message sent successfully!")

            console.log(result)
        } else {
            console.log("error", "sensing message ")
            alert("Error while sending message")
            // misfortune... there's no SMS available on this device
        }
    }


    const getSelectedOption = (item, index) => {
        console.log(item, index)
    }

    const getEmployee = (field, name) => {
        const filtered = backEmployees.filter((item) => item.name.toLowerCase().includes(name.toLowerCase()))

        setEmployees(filtered)
    }

    const assignEmp = () => {
        console.log(employees[selected])
    }

    const employeesList = employees.map((item, index) => {
        return <Pressable
            key={index}
            style={{ borderColor: colors.outline, borderWidth: selected == index ? 1 : 0, borderRadius: 8 }}
            onPress={() => {
                setSelected(index)
            }}>
            <Emp name={item.name} options={false} />
        </Pressable>
    })



    return (
        <ScrollView style={{ ...styles.mainContainer, backgroundColor: colors.onSecondary }} >

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Assign</Dialog.Title>
                    <Dialog.Content>
                        <Input label={"Search"} CallBackFunction={getEmployee} />
                        <ScrollView style={{ height: 200 }}>
                            {employeesList}
                        </ScrollView>


                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button mode='contained' onPress={() => {
                            hideDialog(true)
                            assignEmp()
                        }}>Assign</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <View>


                <Input label="Customer Name" field="name" CallBackFunction={getChangedText} />
                <Input label="Mobile" field="mobile" CallBackFunction={getChangedText} inputMode={'numeric'} maxLength={10} />
                <Input label="Address" field="address" CallBackFunction={getChangedText} />
                <Input label="Mention Problem" field="issue" CallBackFunction={getChangedText} numberOfLines={3} multiline={true} />


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Input style={{ flex: 1, marginRight: 10 }} label="Deadline" field="deadline" CallBackFunction={getChangedText} value={date != undefined ? date.toISOString().slice(0, 10) : date} disabled={true} />
                    <View>
                        <Button onPress={() => { setOpen(true) }} mode='contained' >Pick Date </Button>
                    </View>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <Input style={{ flex: 1, marginRight: 10 }} label="Time" field="Time" CallBackFunction={getChangedText} value={time != undefined ? time.hours + ":" + time.minutes : time} disabled={true} />
                    <View>
                        <Button onPress={() => { setOpenTime(true) }} mode='contained' >Pick Time </Button>
                    </View>

                </View>


                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>

                    <Input style={{ flex: 1, marginRight: 10 }} label="Assigned to" field="assigned" value={selected != -1 ? employees[selected].name : ""} disabled={true} />
                    <View>
                        <Button onPress={showDialog} mode='contained' >Assign </Button>
                    </View>

                </View>

                <Input label="Special Note" field="note" CallBackFunction={getChangedText} />

                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={open}
                    onDismiss={onDismissSingle}
                    date={date}
                    onConfirm={onConfirmSingle}
                />


                <TimePickerModal
                    visible={openTime}
                    onDismiss={onDismissSingleTime}
                    onConfirm={onConfirmSingleTime}
                    hours={12}
                    minutes={14}
                />
                <View style={{ marginTop: 20 }}>
                    <Button
                        mode='contained'
                        onPress={() => { addTask() }}
                    >Add task </Button>
                </View>

            </View>

        </ScrollView>
    )
}

export default AddTask

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,

        flex: 1
    },
    picker: { padding: 12, borderRadius: 8, borderColor: 'lightgray', marginVertical: 4 }
})