import React from "react";
import * as RootNavigation from "../navigation/RootNavigation";
import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer"

const CustomDrawer = (props) => {

    let currentUserLocalStorage = JSON.parse(localStorage.getItem("currentUser"));
    return (
        <View style={styles.container}>
            <DrawerContentScrollView {...props}>
                <TouchableOpacity onPress={()=> RootNavigation.navigate("Profile")}>
                    <ImageBackground source={{ uri: "https://media.istockphoto.com/vectors/abstract-blue-vector-background-with-stripes-can-be-used-for-cover-vector-id1270261573?k=20&m=1270261573&s=612x612&w=0&h=8KkJd1DCgwZxMyh3AYFSzfuTRphs3mLuEMYMmUpmsmQ=" }}
                        style={styles.imageBack}>
                        <Image source={{ uri: `${currentUserLocalStorage.icon}` }}
                            style={styles.imageStyle} />
                        <Text style={styles.textStyle}>{currentUserLocalStorage.name}</Text>
                    </ImageBackground>
                </TouchableOpacity>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageStyle: {
        height: 80,
        width: 80,
        borderRadius: 40,
        marginBottom: 10
    },
    imageBack: {
        padding: 20
    },
    textStyle: {
        color: "#fff",
        fontSize: 15
    }
})

export default CustomDrawer