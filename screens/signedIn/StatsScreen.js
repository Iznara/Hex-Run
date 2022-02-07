import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import ProgressScreen from "../../Components/ProgressScreen";
import Charts from "../../Components/Charts";

const Tab = createMaterialTopTabNavigator();

export default function StatsScreen() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarActiveTintColor: "tomato",
				tabBarInactiveTintColor: "gray",
				tabBarLabelStyle: { fontSize: 16, fontWeight:"bold" },
				tabBarStyle: { backgroundColor: 'white' },
			}}
		>
			<Tab.Screen name="Tasks" component={ProgressScreen} />
			<Tab.Screen name="Statistics" component={Charts} />
		</Tab.Navigator>
	);
}
