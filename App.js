import { StyleSheet, LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SignIn from "./screens/SignIn";
import SignUp from "./screens/SignUp";
import { useEffect, useState } from "react";
import AccountScreen from "./screens/signedIn/AccountScreen";
import MapScreen from "./screens/signedIn/MapScreen";
import SocialScreen from "./screens/signedIn/SocialScreen";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import ResetPassword from "./screens/ResetPassword";
import StatsScreen from "./screens/signedIn/StatsScreen";
import { GetColour } from "./utils/helpers";

//global vars
globalHexBoard = [];
globalColour = "";
board_name = "STATICBOARD";

export default function App() {
	LogBox.ignoreLogs(["Setting a timer"]);
	LogBox.ignoreAllLogs();
	const [isSignedIn, setIsSignedIn] = useState(true);
	const Stack = createNativeStackNavigator();
	const Tab = createBottomTabNavigator();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setIsSignedIn(true);
				GetColour();
			} else {
				setIsSignedIn(false);
			}
		});
	}, [isSignedIn]);

	if (isSignedIn == true) {
		return (
			<NavigationContainer>
				<Tab.Navigator
					screenOptions={() => ({
						tabBarActiveTintColor: "tomato",
						tabBarInactiveTintColor: "gray",
					})}
				>
					<Tab.Screen
						name="Map"
						component={MapScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="map" color={color} size={size} />
							),
						}}
					/>
					<Tab.Screen
						name="Account"
						component={AccountScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="person" color={color} size={size} />
							),
						}}
					/>

					<Tab.Screen
						name="Leaderboards"
						component={SocialScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="podium" color={color} size={size} />
							),
						}}
					/>

					<Tab.Screen
						name="Achievements"
						component={StatsScreen}
						options={{
							tabBarIcon: ({ color, size }) => (
								<Ionicons name="trophy" color={color} size={size} />
							),
						}}
					/>
				</Tab.Navigator>
			</NavigationContainer>
		);
	} else {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
						name="signIn"
						component={SignIn}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="signUp"
						component={SignUp}
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="resetPassword"
						component={ResetPassword}
						options={{ headerShown: false }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
