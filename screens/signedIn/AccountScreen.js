import {
	Image,
	ScrollView,
	Share,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, db } from "../../Firebase/firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const AccountScreen = () => {
	const [user, setUser] = useState({});

	useEffect(() => {
		const GetSingleUser = async () => {
			const docRef = doc(db, "user", auth.currentUser.uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.exists()) {
				setUser(docSnap.data());
			} 
		};
		GetSingleUser();
	}, []);

	const handleSignOut = () => {
		signOut(auth);
	};
	dayjs.duration(user.total_playtime).format("H:mm:ss");
	const shareMessage = () => {
		Share.share({
			message: `Check out my stats on Hex-Run
      I currently own ${user.curr_hexagons} hexagons.
      I have collected ${user.total_hexagons} in total.
      I have run for ${user.total_distance}km 
      My total running time is ${dayjs
				.duration(user.total_playtime)
				.format("H:mm:ss")}`,
		})
	};

	return (
		<ScrollView>
			<View style={styles.container}>
				<Text
					style={{
						color: user.fav_colour,
						fontSize: 40,
						fontWeight: "bold",
						marginBottom: 10,
						marginTop: 10,
					}}
				>
					{user.fullname}
				</Text>

				<View>
					<Image
						style={{
							width: 200,
							height: 200,
							borderRadius: 100,
							borderColor: user.fav_colour,
							borderWidth: 7,
						}}
						source={{ uri: user.picture }}
					/>
					<Text
						style={{
							color: user.fav_colour,
							fontSize: 25,
							fontWeight: "bold",
							marginBottom: 10,
							marginTop: 10,
							alignSelf: "center",
						}}
					>
						Level {user.level}
					</Text>
				</View>
			</View>
			<View style={styles.Stats}>
				<View style={styles.Totals}>
					<Text style={styles.textTitle}>TOTALS</Text>
					<Text style={styles.text}>
						Current Hexagons:{"  "}
						<Text style={styles.Counts}>{user.curr_hexagons}</Text>
					</Text>
					<Text style={styles.text}>
						Total Hexagons:{"  "}
						<Text style={styles.Counts}>{user.total_hexagons}</Text>
					</Text>
					<Text style={styles.text}>
						Total Distance Covered:{"  "}
						<Text style={styles.Counts}>
							{(user.total_distance / 1000).toFixed(2)} km
						</Text>
					</Text>
					<Text style={styles.text}>
						Total Playtime:{"  "}
						<Text style={styles.Counts}>
							{dayjs.duration(user.total_playtime).format("H:mm:ss")}
						</Text>
					</Text>
				</View>
				<View style={styles.Bests}>
					<Text style={styles.textTitle}>PERSONAL BESTS</Text>
					<Text style={styles.text}>
						Furthest Distance ran:{"  "}
						<Text style={styles.Counts}>
							{(user.best_distance / 1000).toFixed(2)} km
						</Text>
					</Text>
					<Text style={styles.text}>
						Most hexagons claimed:{"  "}
						<Text style={styles.Counts}>{user.best_hexagons}</Text>
					</Text>
					<Text style={styles.text}>
						Best time:{"  "}
						<Text style={styles.Counts}>
							{dayjs.duration(user.best_playtime).format("H:mm:ss")}
						</Text>
					</Text>
				</View>
			</View>
			<View style={styles.container}>
				<TouchableOpacity onPress={shareMessage} style={styles.button}>
					<Text style={styles.buttonText}>Share your stats</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={handleSignOut} style={styles.button}>
					<Text style={styles.buttonText}>Sign out</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
};

export default AccountScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		backgroundColor: "tomato",
		width: "90%",
		padding: 15,
		borderRadius: 10,
		alignItems: "center",
		marginTop: 5,
		marginBottom: 0,
	},
	buttonText: {
		color: "white",
		fontWeight: "700",
		fontSize: 16,
	},

	textTitle: {
		paddingLeft: 10,
		color: "white",
		fontWeight: "bold",
		fontSize: 20,
		alignSelf: "center",
		backgroundColor: "tomato",
		marginBottom: 10,
		width: "100%",
		padding: 2,
	},
	text: {
		marginTop: 5,
		color: "tomato",
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 10,
		padding: 10,
	},
	Stats: {
		alignSelf: "center",
		marginBottom: 20,
		textAlign: "center",
	},
	Totals: {
		borderWidth: 2,
		borderColor: "tomato",
		marginBottom: 30,
		borderRadius: 10,
	},
	Bests: {
		borderWidth: 2,
		borderColor: "tomato",
		marginBottom: 30,
		borderRadius: 10,
	},
	Counts: {
		fontSize: 25,
		alignSelf: "center",
	},
});
