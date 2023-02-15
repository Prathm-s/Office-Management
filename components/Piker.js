import { StyleSheet, Text, View, Picker, } from 'react-native'
import React, { useState } from 'react'

const Piker = ({ selectCallBack, values = [], label = "" }) => {

 
    const [select, setSelector] = useState(values)

    const options = select.map((item, index) => {

        return <Picker.Item style={{ padding: 10 }} label={item.label} value={item.value} />

    })
    return (
        <View>
            <Text style={{color:'#8A8989'}}>{label}</Text>
            <Picker
                style={styles.picker}
                onValueChange={(item, index) => {
                    console.log(item, index)
                    selectCallBack(item, index)
                }}
            >
                {options}
            </Picker>
        </View>

    )
}

export default Piker

const styles = StyleSheet.create({
    picker: { padding: 12, borderRadius: 8, borderColor: 'lightgray', marginVertical: 4 }

})