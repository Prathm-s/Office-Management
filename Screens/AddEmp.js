import { StyleSheet, View, } from 'react-native'
import React, { useState } from 'react'
import { Input } from '../components'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from '../src/firebase/config'
import { doc, setDoc } from 'firebase/firestore'
import { useTheme, Button } from 'react-native-paper'


const AddEmp = () => {
  const [emp, setEmp] = useState({
    "name": "",
    "email": "",
    "mobile": "",
    "password": "123456",
  })

  const { colors } = useTheme()


  const registerEmp = () => {
    createUserWithEmailAndPassword(auth, emp.email, "123456")
      .then(async (response) => {
        const uid = response.user.uid
        const data = {
          id: uid,
          email: emp.email,
          passowrd: emp.password,
          name: emp.name,
          mobile: emp.mobile
        }

        await setDoc(doc(database, "Users", uid), data).then((response) => {
          alert("data stored successfully!")
        }).catch((error) => {
          console.log(error)
        })

      })
      .catch((error) => { alert(error) })
  }

  const updateEmp = (field, data) => {
    setEmp({ ...emp, [field]: data })
  }
  return (
    <View style={{ ...styles.mainContainer, backgroundColor: colors.onSecondary }}>
      <Input placeholder='Enter Employee Name' label="Name" CallBackFunction={updateEmp} field="name" />
      <Input placeholder='Enter Email' label="Email" CallBackFunction={updateEmp} field="email" />
      <Input placeholder='Enter Mobile' label="Mobile" CallBackFunction={updateEmp} field="mobile" />
      <Button onPress={() => registerEmp()}  mode="contained" > Add Emoployee </Button>
    </View>
  )
}

export default AddEmp

const styles = StyleSheet.create({
  mainContainer: {
    padding: 20,

    flex: 1
  }
})