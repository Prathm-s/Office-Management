import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'

const Search = ({ filterCallBack }) => {
  return (
    <View style={{flex:1}}>

      <TextInput
        onChangeText={(text) => {
          filterCallBack(text)
        }}
        style={styles.searchContainer}
        placeholder='Search Customer'
      />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  searchContainer: {
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: 'white',
    padding: 14,
    marginVertical: 10,
    borderRadius: 8,
  }
})