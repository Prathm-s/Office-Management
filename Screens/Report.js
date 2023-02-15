import { StyleSheet, View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Input } from '../components'
import 'intl';
import 'intl/locale-data/jsonp/en';
import { Button, useTheme, Text, } from 'react-native-paper'
import { DatePickerModal } from 'react-native-paper-dates';


const Report = () => {
    const [range, setRange] = React.useState({ startDate: undefined, endDate: undefined });
    const [open, setOpen] = React.useState(false);
    const { colors } = useTheme()


    const onDismiss = React.useCallback(() => {
        setOpen(false);

    }, [setOpen]);

    const onConfirm = React.useCallback(
        ({ startDate, endDate }) => {
            setOpen(false);
            setRange({ startDate, endDate });
            console.log(startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10))

        },
        [setOpen, setRange]
    );


    const getCustomers = () => {
        
    }
    return (
        <View style={{ ...styles.mainContainer, backgroundColor: colors.onSecondary }}>
            <View>
                <Input label='Select Employee' />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Input style={{ flex: 1, marginRight: 10 }} label='From date' value={range.startDate != undefined ? range.startDate.toISOString().slice(0, 10) : ""} />
                <Input style={{ flex: 1, marginRight: 10 }} label='To Date' value={range.endDate != undefined ? range.startDate.toISOString().slice(0, 10) : ""} />
                <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
                    <Button onPress={() => setOpen(true)} uppercase={false} mode="contained">
                        Pick Dates
                    </Button>
                    <DatePickerModal
                        locale="en"
                        mode="range"
                        visible={open}
                        onDismiss={onDismiss}
                        startDate={range.startDate}
                        endDate={range.endDate}
                        onConfirm={onConfirm}
                    />
                </View>
            </View>
            <Text style={{ fontWeight: "500", marginVertical: 10 }}>Milestones</Text>

            <ScrollView style={{ flex: 1 }}>

            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
                <Text>Total Revenue</Text>
                <Text style={{ fontWeight: '500' }}>100000.00</Text>
            </View>
            <Button title="Filter" />
        </View>
    )
}

export default Report

const styles = StyleSheet.create({
    mainContainer: {
        padding: 20,

        flex: 1
    }
})