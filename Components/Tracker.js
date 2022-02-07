import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import { updateTrackerArray } from "../utils/helpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "../Firebase/firebase";
import { getPathLength, isPointInPolygon } from "geolib";
import {
	arrayUnion,
	doc,
	getDoc,
	setDoc,
	updateDoc,
} from "firebase/firestore";
import hexToRgba from "hex-to-rgba";
import dayjs from "dayjs";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);
const LOCATION_TRACKING = "location-tracking";

function Tracker({ setTrack, track, setRunData, setModalVisible }) {
	const [locationStarted, setLocationStarted] = useState(false);
	const [startTime, setStartTime] = useState("");
	let updateTrackInterval;

	//Function to begin the tracker function running
	const startLocationTracking = async () => {
		await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
			accuracy: Location.Accuracy.Highest,
			timeInterval: 5000,
			distanceInterval: 0,
			foregroundService: {
				notificationTitle: "App Name",
				notificationBody: "Location is used when App is in background",
			},
			activityType: Location.ActivityType.Fitness,
			showsBackgroundLocationIndicator: true,
		});
		const hasStarted = await Location.hasStartedLocationUpdatesAsync(
			LOCATION_TRACKING
		);
		setLocationStarted(hasStarted);
		updateTrackInterval = setInterval(() => {
			getStoredTrackerData();
		}, 2000); //change this number to set how often local memory is checked to update route on screen
		setStartTime(dayjs());
		currentHex = -1;
		nuetralHexes = 0;
		enemyHexes = 0;
		enemiesToNotify = [];
	};

	const levelUpCheck = (task, stat, perGame) => {
		let count = 0;
		task.progress = task.progress + stat;
		while (task.progress >= task.goal) {
			(task.goal = Math.ceil(task.goal * 1.1)), task.level++;
			count++;
		}
		if (perGame) {
			task.progress = 0;
		}
		return count;
	};

	//Start tracker
	const startLocation = () => {
		startLocationTracking();
	};

	//stop tracker
	const stopLocation = async () => {
		getStoredTrackerData();
		clearInterval(updateTrackInterval);
		setLocationStarted(false);
		const endTime = dayjs();
		const runDist = getPathLength(track);
		const runTime = endTime.diff(startTime);
		const userRef = doc(db, "user", auth.currentUser.uid);
		const docSnap = await getDoc(userRef);
		if (docSnap.exists()) {
			//updates achievements
			const tasks = docSnap.data().tasks;
			let goalsHit = 0;
			goalsHit += levelUpCheck(tasks[0], 1, false);
			goalsHit += levelUpCheck(tasks[1], runDist, true);
			goalsHit += levelUpCheck(tasks[2], runDist, false);
			goalsHit += levelUpCheck(tasks[3], claimedHexes, true);
			goalsHit += levelUpCheck(tasks[3], claimedHexes, false);
			goalsHit += levelUpCheck(tasks[4], runTime / 1000 / 60, true);
			goalsHit += levelUpCheck(tasks[4], runTime / 1000 / 60, false);

			let pb_dist = false;
			let pb_hex = false;
			let pb_time = false;
			let best_d = docSnap.data().best_distance;
			let best_h = docSnap.data().best_hexagons;
			let best_t = docSnap.data().best_playtime;
			const newLevel = docSnap.data().level + goalsHit;

			if (runDist > best_d) {
				pb_dist = true;
				best_d = runDist;
			}
			if (claimedHexes > best_h) {
				pb_hex = true;
				best_h = claimedHexes;
			}
			if (runTime > best_t) {
				pb_time = true;
				best_d = runTime;
			}

			await updateDoc(userRef, {
				level: newLevel,
				best_distance: best_d,
				best_hexagons: best_h,
				best_playtime: best_t,
				total_distance: docSnap.data().total_distance + runDist,
				total_hexagons: docSnap.data().total_hexagons + claimedHexes,
				total_playtime: docSnap.data().total_playtime + runTime,
				number_of_completed_runs: docSnap.data().number_of_completed_runs + 1,
				tasks: tasks,
			});

			await updateDoc(userRef, {
				runs: arrayUnion({
					start_time: startTime.toString(),
					run_duration: runTime,
					distance: runDist,
					speed: runDist / runTime,
					route: track,
				}),
			});

			let _level_up = false;
			if (goalsHit > 0) {
				_level_up = true;
			}
			setRunData({
				start_time: startTime,
				duration: dayjs.duration(runTime).format("H:mm:ss"),
				best_t: pb_time,
				distance: runDist / 1000,
				best_d: pb_dist,
				speed: runDist / 1000 / Number(dayjs.duration(runTime).asHours()),
				claimedHexes: claimedHexes,
				best_x: pb_hex,
				level: newLevel,
				level_up: _level_up,
			});
			setModalVisible(true);
			setTrack([]);
			currentHex = -1;
			claimedHexes = 0;
		}
		TaskManager.isTaskRegisteredAsync(LOCATION_TRACKING).then((tracking) => {
			if (tracking) {
				Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
			}
		});
	};

	//collect data stored by tracker, put it in state, clear local storage
	const getStoredTrackerData = async () => {
		let jsonValue = await AsyncStorage.getItem("trackerArray");
		if (jsonValue) {
			const parsedArray = JSON.parse(jsonValue);
			setTrack((currTrack) => [...currTrack, ...parsedArray]);
			await AsyncStorage.removeItem("trackerArray");
		}
	};

	return (
		<View style={styles.container}>
			{locationStarted ? (
				<TouchableOpacity onPress={stopLocation} style={styles.Button}>
					<Text style={styles.ButtonText}>Stop Run</Text>
				</TouchableOpacity>
			) : (
				<TouchableOpacity onPress={startLocation} style={styles.Button}>
					<Text style={styles.ButtonText}>Start Run</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data }) => {
	if (data) {
		const { locations } = data;
		const newPoint = {
			latitude: locations[0].coords.latitude,
			longitude: locations[0].coords.longitude,
		};
		updateTrackerArray(newPoint);
		updateHexOwnerBackend(newPoint);
	}
});

var currentHex = -1;
var claimedHexes = 0;

const updateHexOwnerBackend = async (newPoint) => {
	for (let i = 0; i < globalHexBoard.length; i++) {
		const hex = globalHexBoard[i];
		if (isPointInPolygon(newPoint, hex.coords)) {
			if (currentHex !== i) {
				currentHex = i;
				if (hex.current_owner != auth.currentUser.uid) {
					claimedHexes++;
					hex.current_owner = auth.currentUser.uid;
					hex.col = hexToRgba(globalColour, 0.6);
					await setDoc(doc(db, "gameboard", board_name), {
						board: globalHexBoard,
					});
				}
				break;
			}
			//put stuff here if you want it to happen if a point is inside a hex. Can refer to the hex directly using "hex"
		}
	}
};

export default Tracker;

const styles = StyleSheet.create({
	container: {

		justifyContent: "flex-end",
		alignItems: "center",
	},
	Button: {
		width: "90%",
		color: "#000",
		height: 52,
		backgroundColor: "tomato",
		borderRadius: 10,
		marginTop: 0,
		marginBottom: 0,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	ButtonText: {
		fontWeight: "bold",
		color: "white",
		fontSize: 16,
	},
});