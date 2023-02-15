import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text, List, useTheme } from 'react-native-paper'
import TextLabel from './TextLabel'

const Visits = ({ employee }) => {
    const { colors } = useTheme()
    return (
        // <View style={{ borderColor: 'lightgray', borderWidth:1, padding: 10, borderRadius:10, marginVertical:10 }}>
        //     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        //         <Text>{employee.name}</Text>
        //         <Text>{employee.lastVisited}</Text>
        //     </View>

        //     <Text>Note: {employee.note}</Text>
        //     <Text>Charges Rs: {employee.amount}.00</Text>
        // </View>

        // <Card style={{ marginVertical: 10, backgroundColor: employee.status == "done" ? '#6495ed' : colors.secondaryContainer }} mode='contained'  >
        //     <Card.Title title={employee.name} />
        //     <Card.Content>
        //         {/* <TextLabel text={employee.date} label={"Visited at"}/>
        //         <TextLabel text={employee.status} label={"Status"}/>
        //         <TextLabel text={employee.amount} label={"Amount"}/>
        //         <TextLabel text={employee.note} label={"Note"}/> */}
        //         <Text variant="bodyMedium">Visited : {employee.date}</Text>
        //         <Text variant="bodyMedium">Status : {employee.status}</Text>
        //         <Text variant="bodyMedium">Charges :{employee.amount} Rs</Text>
        //         <Text variant="bodyMedium">Note : {employee.note}</Text>

        //     </Card.Content>
        // </Card>
        <List.Accordion
            style={{ backgroundColor: employee.status == "done" ? '#6495ed' : colors.secondaryContainer, }}
            title={employee.name}
            description={employee.status == undefined? "Not available" : employee.status} >
            <List.Item title="Visited" description={employee.date} />
            <List.Item title="Note" description={employee.note} />
            <List.Item title="Charges" description={employee.amount} />

        </List.Accordion>

    )
}

export default Visits

const styles = StyleSheet.create({})