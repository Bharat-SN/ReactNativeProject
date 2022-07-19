import React, { useState, useEffect } from "react";
import { View, Text, Button, ScrollView, FlatList, StyleSheet, Modal, TextInput, Share } from "react-native";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from "firebase/firestore";
import * as DocumentPicker from 'expo-document-picker';
import { TouchableOpacity } from "react-native-gesture-handler";

export default function MyUpload() {
    const [fileName, setFileName] = useState("");
    const [fileUri, setFileUri] = useState("");
    const [fileType, setFileType] = useState("");
    const [newName, setName] = useState("");
    const [docData, setDocData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const collectionRef = collection(db, "documents")

    useEffect(() => {
        const getDocuments = async () => {
            const data = await getDocs(collectionRef);
            setDocData(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getDocuments();
    }, []);

    const uploadFile = async () => {
        await addDoc(collectionRef, {
            name: fileName,
            uri: fileUri,
            type: fileType,
        })
    }

    const updateDocument = async (id) => {
        const userDoc = doc(db, "documents", id);
        const newField = { name: newName }
        console.log(newField)
        await updateDoc(userDoc, newField)
    }

    const deleteDocument = async (id) => {
        const userDoc = doc(db, "documents", id);
        await deleteDoc(userDoc);
    };

    const pickFile = async () => {
        let result = await DocumentPicker.getDocumentAsync({
            type: "*/*",
        });
        if (!result.cancelled) {
            setFileName(result.name);
            setFileUri(result.uri);
            setFileType(result.mimeType);
            console.log(result)
        }
    };

    // const shareDocument = async (id ) => {
    //     const userDoc = doc(db, "documents", id);
    //     try {
    //         const result = await Share.share({
    //             message: fileName,
    //             url: `${fileUri}`
    //         });
    //     } catch (error) {
    //         alert(error.message);
    //     }
    // }

    const allItems = ({ item }) => {
        return (
            <View style={{ height: "100%" }}>
                <ScrollView style={styles.container}>
                    <View style={styles.docStyle}>
                        <View>
                            <Text>{item.name}</Text>
                        </View>
                        <View style={styles.touchstyle}>
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Text>Edit | </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteDocument(item.id)}>
                                <Text>Delete | </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => shareDocument(item.id)}>
                                <Text>Share</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
                <View>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text>Enter new name</Text>
                                <TextInput onChangeText={(text) => setName(text)}
                                    placeholder="Enter Name" />
                                <Button onPress={() => {
                                    updateDocument(item.id);
                                    setModalVisible(!modalVisible)
                                }}
                                    title="Update">
                                </Button>
                            </View>
                        </View>
                    </Modal>
                </View>
            </View>

        );
    };

    return (
        <>
            <View>
                <FlatList data={docData} renderItem={allItems}></FlatList>
            </View>
            <View>
                <Button onPress={pickFile} title="Select File to Upload"></Button>
                <Button onPress={uploadFile} title="Upload File" />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: "1rem",
        flexDirection: "column-reverse",
    },
    docStyle: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-evenly"
    },
    touchstyle:{
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
});