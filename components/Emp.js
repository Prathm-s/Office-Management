import { Pressable, StyleSheet, View } from 'react-native'
import { Divider, List, Menu, Button, Text } from 'react-native-paper'
import React from 'react'
import { getAuth } from 'firebase/auth'


const Emp = (props) => {
    const [visible, setVisible] = React.useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);

    const deleteUser = () => {
        // getAuth.deleteUser(props.id)
        //     .then(res => alert("Deleted Successfully!"))
        //     .catch(error => alert("Error while deleting"))
    }

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, borderBottomWidth: 0.5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <List.Icon icon="account" />
                    <Text style={{ marginLeft: 10, fontSize: 16 }}>{props.name}</Text>
                </View>
                {/* {props.options == false ? <View></View> : <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button onPress={openMenu}> Options </Button>}>
                    <Menu.Item onPress={() => { }} title="View" />
                    <Menu.Item onPress={deleteUser} title="Delete" />

                </Menu>
                } */}

            </View>

        </View>
    )
}

export default Emp

const styles = StyleSheet.create({
    EmpCont: {
        padding: 14,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: 'lightgray'
    }
})