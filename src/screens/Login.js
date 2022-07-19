import React, { useEffect, useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as RootNavigation from "../navigation/RootNavigation";
import { db } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [users, setUsers] = useState([]);
    const collectionRef = collection(db, "Users");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(collectionRef);
            setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getUsers();
    }, []);

    const checkUser = async () => {
        let matchingUser = 0;

        for (let i = 0; i < users.length; i++) {
            if (users[i].email == email && users[i].password == password) {
                matchingUser = 1;
                localStorage.setItem("currentUser", JSON.stringify(users[i]) )
            }
        }
        if (matchingUser == 1) {
            navigate();
        }
        else {
            setError("Invalid user")
        }
    };

    const navigate = () => RootNavigation.navigate("Dashboard");

    const validate = () => {
        if (!email) {
            setError("Please enter email");
        } else if (!password) {
            setError("Please enter password");
        } else {
            checkUser()
        }
    };


    return (
        <View style={styles.container}>
            <Text>Enter Information</Text>
            <Text>{error}</Text>
            <View>
            <Text style={styles.header}>Email</Text>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter Email"
            />
            </View>
            <View>
            <Text style={styles.header}>Password</Text>
            <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter Password"
            />
            </View>
            <Button title="Login" onPress={validate}></Button>
            <TouchableOpacity onPress={() => RootNavigation.navigate("SignUp")}>
                <Text>Dont have account? Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: '100%',
        width: '100%'
    },
    header: {
        fontWeight: "bold"
    },
    input: {
        borderColor: "black",
        borderWidth: 1,
        minHeight: 30
    }
})
