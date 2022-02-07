import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Ionicons } from "@expo/vector-icons";
import TotalHex from "../../Components/LeaderboardTabs/TotalHex";
import TotalDist from "../../Components/LeaderboardTabs/TotalDist";
import GamesPlayed from "../../Components/LeaderboardTabs/GamesPlayed";
import TotalPlaytime from "../../Components/LeaderboardTabs/TotalPlaytime";
import HighestLevel from "../../Components/LeaderboardTabs/HighestLevel";

const Tab = createMaterialTopTabNavigator();

const SocialScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "white" },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="TotalHex"
        component={TotalHex}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ribbon" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="TotalDist"
        component={TotalDist}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="analytics" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="GamesPlayed"
        component={GamesPlayed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="game-controller" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="TotalPlaytime"
        component={TotalPlaytime}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="HighestLevel"
        component={HighestLevel}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="barbell" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default SocialScreen;
