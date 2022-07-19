import React, { useState } from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";

export default function Logout() {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>Do you want to logout?</Text>
            <View style={styles.buttonView}>
              <Button onPress={() => {
                RootNavigation.navigate("Onboarding")
                setModalVisible(!modalVisible)
                localStorage.removeItem("currentUser")
              }}
                title="Yes">
              </Button>
              <Button onPress={() => { setModalVisible(!modalVisible) }}
                title="No">
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flew: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonView:{
    flexDirection: 'row'
  }
})