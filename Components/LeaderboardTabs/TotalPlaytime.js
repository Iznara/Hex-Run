import { StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import {
	Table,
	TableWrapper,
	Row,
	Rows,
	Col,
} from "react-native-table-component";
import dayjs from "dayjs";
var duration = require("dayjs/plugin/duration");
dayjs.extend(duration);

const TotalPlaytime = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const GetAllData = async () => {
			const usersCol = collection(db, "user");
			const q = query(usersCol, orderBy("total_playtime", "desc"), limit(25));
			const usersSnapshot = await getDocs(q);
			const usersList = usersSnapshot.docs.map((doc) => doc.data());
			setUsers(usersList);
		};
		GetAllData();
	}, []);

	const CONTENT = {
		tableHead: ["Position", "Player", "Duration"],
		tableTitle: [],

		tableData: [],
	};

	let index = 1;
	users.forEach((user) => {
		CONTENT.tableData.push([
			user.fullname,
			dayjs.duration(user.total_playtime).format("H:mm:ss"),
		]),
			CONTENT.tableTitle.push(index);
		index++;
	});

	return (
		<View style={styles.container}>
			<Text style={styles.titleOfTable}>Total Playtime</Text>

			<ScrollView vertical={true}>
				<Table borderStyle={{ borderWidth: 1 }}>
					<Row
						data={CONTENT.tableHead}
						flexArr={[2, 3, 3]}
						style={styles.head}
						textStyle={styles.headText}
					/>
					<TableWrapper style={styles.wrapper}>
						<Col
							data={CONTENT.tableTitle}
							style={styles.title}
							textStyle={styles.text}
						/>
						<Rows
							data={CONTENT.tableData}
							flexArr={[1, 1, 1]}
							style={styles.row}
							textStyle={styles.text}
						/>
					</TableWrapper>
				</Table>
			</ScrollView>
		</View>
	);
};

export default TotalPlaytime;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 10,
		paddingTop: 10,
		backgroundColor: "#fff",
	},
	titleOfTable: {
		textAlign: "center",
		color: "tomato",
		fontWeight: "bold",
	},
	head: {
		backgroundColor: "tomato",
	},
	headText: {
		color: "white",
		alignSelf: "center",
		fontWeight: "bold",
		lineHeight: 30,
	},
	wrapper: {
		flexDirection: "row",
	},
	row: {
		backgroundColor: "#fff",
	},
	text: {
		textAlign: "center",
		color: "tomato",
		fontWeight: "bold",
		lineHeight: 20,
	},
});
