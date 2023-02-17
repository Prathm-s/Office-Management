import { StyleSheet, Text, View, Button, Touchable, Pressable, Linking } from 'react-native'
import React from 'react'
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, useTheme, Divider, List } from 'react-native-paper';

const Customer = (props) => {
    const item = props.item
    const { colors } = useTheme()
    
    return (
        <Pressable
            style={styles.container}
            onLongPress={() => {
                console.log("Pressed")
                Linking.openURL(`tel:${props.item.mobile}`)

            }}
            onPress={() => { props.navigation.navigate("ViewCust", { item: props.item }) }}
        >

            <List.Item

                title={props.item.name + (props.item.visits.length !=0 && props.item.status=="inprogress" ? " • "+ props.item.visits.slice(-1)[0].name: " • "+ props.item.assigned.name)}
                description={props.item.issue}
                descriptionNumberOfLines={1}
                left={props => <List.Icon {...props} icon="account" color={colors.onPrimaryContainer} style={{ backgroundColor: colors.primaryContainer, padding: 10, borderRadius: 40 }} />}
                right={props => item.status == "done" ? <List.Icon {...props} icon="check-all" color='limegreen' /> : item.status == "inprogress" ? <List.Icon {...props} icon="progress-clock" color='orange' /> : <List.Icon {...props} icon="alert-box" color='red' />}
            />
            <Divider/>
        </Pressable>
    )
}

export default Customer

const styles = StyleSheet.create({
    container: {


    },
    subContainer: {
        flex: 1,
        flexDirection: 'column'
    }
})