import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Button, StyleSheet, Image } from "react-native";
import * as RootNavigation from "../navigation/RootNavigation";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';

export default function SignUp() {
    const [newName, setName] = useState("")
    const [newEmail, setEmail] = useState("")
    const [newPassword, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [users, setUsers] = useState([])
    const [image, setImage] = useState(null)
    let apos = newEmail.indexOf("@");
    let dotpos = newEmail.lastIndexOf(".");

    const collectionRef = collection(db, "Users");
    const navigate = () => RootNavigation.navigate("Login");

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
            if (users[i].email == newEmail) {
                matchingUser = 1;
            }
        }
        if (matchingUser == 1) {
            setError("User already exists");
        }
        else {
            await addDoc(collectionRef, {
                icon: image,
                name: newName,
                email: newEmail,
                password: newPassword
            }).then(() => RootNavigation.navigate("Login"));
        }
    };

    const validate = () => {
        if (!newEmail) {
            setError("Please enter email");
        } else if (!newPassword) {
            setError("Please enter password");
        } else if (newPassword != confirmPassword) {
            setError("Password does not match");
        } else if (apos < 1 || dotpos - apos < 2) {
            setError("invalid Email")
        }
        else {
            checkUser()
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });
        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={styles.container}>
            <Text>Enter Information</Text>
            <Text>{error}</Text>
            <Text style={styles.header}>Name</Text>
            <TextInput
                onChangeText={(text) => setName(text)}
                placeholder="Enter Name"
            />
            <Text style={styles.header}>Email</Text>
            <TextInput
                onChangeText={(text) => setEmail(text)}
                placeholder="Enter Email"
            />
            <Text style={styles.header}>Password</Text>
            <TextInput
                onChangeText={(text) => setPassword(text)}
                placeholder="Enter Password"
            />
            <Text style={styles.header}>Confirm Password</Text>
            <TextInput
                onChangeText={(text) => setConfirmPassword(text)}
                placeholder="Confirm Password"
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Upload image" onPress={pickImage} />
                {image &&
                    <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
            <Button onPress={validate} title="Sign Up"></Button>
            <TouchableOpacity onPress={navigate}>
                <Text>Already have account? Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
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
