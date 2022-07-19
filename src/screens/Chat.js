import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, FlatList, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

export default function Chats() {
    let currentUserLocalStorage = JSON.parse(localStorage.getItem("currentUser"));
    const [newMessage, setmessage] = useState("");
    const [submitError, setError] = useState("enter your message");
    const [msgData, setMsg] = useState([]);

    const collectionRef = collection(db, "messages");
    const q = query(collectionRef, orderBy('time', 'asc'));

    useEffect(() => {
        const getMessages = async () => {
            const data = await getDocs(q);
            setMsg(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getMessages();
    }, []);

    const validation = async () => {
        if (!newMessage) {
            setError("message can't be empty");
        } else {
            await addDoc(collectionRef, {
                message: newMessage,
                sender: currentUserLocalStorage.name,
                time: new Date().toLocaleString()
            }).then(()=> {setmessage("")})
        };

    };

    const allItems = ({ item }) => {
        return (
            <View style={{ height: "100%" }}>
                <ScrollView style={styles.container}>
                    <View style={styles.msgs}>
                        <Image source={{uri: `${currentUserLocalStorage.icon}` }} />
                        <Text> `{item.sender} : {item.message} : {item.time}`</Text>
                    </View>
                </ScrollView>
            </View>
        );
    };
    return (
        <>
            <ScrollView style={styles.scrollContainer}>
                <FlatList data={msgData} renderItem={allItems} ></FlatList>
            </ScrollView>
            <View style={styles.sendMsgContainer}>
                <TextInput style={styles.input}
                    placeholder={submitError}
                    onChangeText={(text) => setmessage(text)}
                    value={newMessage} />
                <TouchableOpacity style={styles.iconContainer} onPress={validation}>
                    <Text>Send</Text>
                </TouchableOpacity>

            </View>
        </>
    );
}

const styles = StyleSheet.create({
    scrollContainer:{
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor: '#7F5283'
    },
    container: {
        padding: "1rem",
        flexDirection: "column-reverse",
    },
    input: {
        padding: 5,
        width: "100%",
        height: 40,
        borderColor: "grey",
        borderWidth: 2,
        borderRadius: 40,
        backgroundColor: "white",
    },
    sendMsgContainer: {
        flexDirection: "row",
        gap: 10,
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        backgroundColor: "lightgrey",
    },
    iconContainer: {
        padding: 7,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "dodgerblue",
    },
    msgs: {
        flex: 1,
        flexDirection: "row"
    }
});