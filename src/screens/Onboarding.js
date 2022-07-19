import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as RootNavigation from "../navigation/RootNavigation";

export default function Onboarding() {
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View>
                <Text style={styles.header}>My App</Text>
            </View>
            <TouchableOpacity style={styles.enter} onPress={() => RootNavigation.navigate("Login")}>
                <Text>Enter </Text>
                <Ionicons name="chevron-forward-outline" size={20} />
            </TouchableOpacity>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    header:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    enter: {
        flex:1,
        backgroundColor: '#7F5283',
        padding: 20,
        width: '90vw',
        borderRadius: 5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})