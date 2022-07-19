import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import DrawerNav from "./Drawer";
import ProfilePage from "../screens/ProfilePage";
import Onboarding from "../screens/Onboarding";

const Stack = createStackNavigator();

export default function StackNav() {
    return (
        <Stack.Navigator initialRouteName="Onboarding">
            <Stack.Screen
                options={{ headerShown: false }}
                name="Onboarding"
                component={Onboarding}
            />
            <Stack.Screen
                name="Login"
                component={Login}
            />
            <Stack.Screen
                name="SignUp"
                component={SignUp}
            />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Dashboard"
                component={DrawerNav}
            />
            <Stack.Screen
                name="Profile"
                component={ProfilePage}
            />
        </Stack.Navigator>
    )

}