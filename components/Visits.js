import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Card, Text, List, useTheme } from 'react-native-paper'
import TextLabel from './TextLabel'

const Visits = ({ employee }) => {
    const { colors } = useTheme()
    const dateString = employee.date.toDate()
    return (

        <List.Accordion
            style={{ backgroundColor: employee.status == "done" ? '#6495ed' : colors.secondaryContainer, }}
            title={employee.name}
            description={(employee.status == undefined ? "Visit" : employee.status) + "     Time : " + dateString.toString().slice(0, -18)} >
            <List.Item title="Visited" description={dateString.toISOString().slice(0, 10)} />
            {/* <List.Item title="Visited" description={dateString.toDate()} /> */}

            <List.Item title="Note" description={employee.note} />
            <List.Item title="Charges" description={employee.amount} />

        </List.Accordion>

    )
}

export default Visits

const styles = StyleSheet.create({})