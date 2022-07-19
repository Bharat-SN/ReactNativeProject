import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyUpload from "./MyUpload";
import SharedUpload from "./SharedUpload";

const Tab = createBottomTabNavigator();

export default function ManageDocument() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="MyUploads" component={MyUpload} options={{headerShown: false}} />
            <Tab.Screen name="SharedUpload" component={SharedUpload} options={{headerShown: false}} />
        </Tab.Navigator>
    )
}
