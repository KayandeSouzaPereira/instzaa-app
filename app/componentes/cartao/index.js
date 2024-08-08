import { useState, useEffect } from "react"
import {
  Platform,
  ScrollView,
  StyleSheet
} from "react-native"
import {
  CreditCardView,
  CreditCardInput
} from "react-native-credit-card-input"

const s = StyleSheet.create({
  container: {
    width: "80%",
    maxWidth: 400,
    marginHorizontal: "auto",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 30,
    marginHorizontal: 40
  },
  switch: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 20
  },
  cardView: {
    alignSelf: "center",
    marginTop: 15
  },
  cardInput: {
    marginTop: 15,
    borderColor: "#fff",
    borderTopWidth: 1,
    borderBottomWidth: 1
  },
  infoContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: "#dfdfdf",
    borderRadius: 5
  },
  info: {
    fontFamily: Platform.select({
      ios: "Courier",
      android: "monospace",
      web: "monospace"
    })
  }
})


export default function Cartao({callback}) {

  const [focusedField, setFocusedField] = useState()
  const [formData, setFormData] = useState()

  useEffect (()=> {
    if (formData){
      callback(formData);
    }
  },[formData])

  return (
    <ScrollView contentContainerStyle={s.container}>
      <CreditCardView
        focusedField={focusedField}
        type={formData?.values.type}
        number={formData?.values.number}
        expiry={formData?.values.expiry}
        cvc={formData?.values.cvc}
        style={s.cardView}
      />
        <CreditCardInput
          autoFocus
          style={s.cardInput}
          onChange={setFormData}
          onFocusField={setFocusedField}
        />

      
    </ScrollView>
  )
}
