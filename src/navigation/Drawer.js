import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from "../screens/Home";
import ManageUser from "../screens/ManageUser";
import ManageDocument from "../screens/ManageDocument";
import Chats from "../screens/Chat";
import Logout from "../screens/Logout";
import CustomDrawer from "../screens/CustomDrawer";

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawer {...props}/>}
        initialRouteName="Home"
        screenOptions={{
            drawerActiveBackgroundColor: "#7F5283",
            drawerActiveTintColor: "#fff",
            drawerInactiveTintColor: "#333",
            drawerLabelStyle:{marginLeft: -25} }}>
            <Drawer.Screen name="Home"
                component={Home}
                options={{
                    drawerIcon: ({ color }) => (
                        <Ionicons name="home-outline" size={20} color={color} />
                    ),
                }} />
            <Drawer.Screen name="Manage User" component={ManageUser}
            options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="person-outline" size={20} color={color} />
                ),
            }} />
            <Drawer.Screen name="Manage Document" component={ManageDocument}
            options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="document-text-outline" size={20} color={color} />
                ),
            }} />
            <Drawer.Screen name="Chat" component={Chats} 
            options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="chatbox-ellipses-outline" size={20} color={color} />
                ),
            }}/>
            <Drawer.Screen name="Logout" component={Logout} 
            options={{
                drawerIcon: ({ color }) => (
                    <Ionicons name="log-out-outline" size={20} color={color} />
                ),
            }}/>
        </Drawer.Navigator>
    )
}