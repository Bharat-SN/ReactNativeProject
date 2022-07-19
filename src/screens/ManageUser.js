import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Modal, TextInput, Button } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setName] = useState("");

  const usersCollectionRef = collection(db, "Users");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);

  const updateUser = async (id) => {
    const userDoc = doc(db, "Users", id);
    const newField = { name: newName }
    await updateDoc(userDoc, newField)
  }

  const deleteUser = async (id) => {
    const userDoc = doc(db, "Users", id);
    await deleteDoc(userDoc);
  };

  const storyItem = ({ item }) => {
    return (
      <View>
        <ScrollView style={styles.container}>
          <View style={styles.docStyle}>
            <View>
              <Text>{item.name}</Text>
            </View>
            <View style={styles.touchstyle}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => deleteUser(item.id)}>
                <Text>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
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
                  <Text>Enter new name</Text>
                  <TextInput onChangeText={(text) => setName(text)}
                    placeholder="Enter Name" />
                  <Button onPress={() => {
                    updateUser(item.id);
                    setModalVisible(!modalVisible)
                  }}
                    title="Update">
                  </Button>
                </View>
              </View>
            </Modal>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={users}
        renderItem={storyItem}></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row"
  },
  docStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  touchstyle: {
    flexDirection: "row"
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
  }
})