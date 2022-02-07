import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { auth, db } from "../Firebase/firebase";
import ProgressCard from "./ProgressCard";

const ProgressScreen = () => {
  const [taskList, setTaskList] = useState([]);
  const taskText = [
    ["Play ", " games"],
    ["Run ", "km in a game"],
    ["Run ", "km in total"],
    ["Claim ", " hexes in a game"],
    ["Claim ", " hexes in total"],
    ["Run for ", " minutes in a game"],
    ["Run for ", " minutes in total"],
  ];

  useEffect(() => {
    const GetProgress = async () => {
      const userRef = doc(db, "user", auth.currentUser.uid);
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        setTaskList(docSnap.data().tasks);
      } 
    };
    GetProgress();
  }, []);

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
        }}
      >
        {taskList.length > 0 ? (
          <>
            <ProgressCard cardTask={taskList[0]} text={taskText[0]} />
            <ProgressCard cardTask={taskList[1]} text={taskText[1]} />
            <ProgressCard cardTask={taskList[2]} text={taskText[2]} />
            <ProgressCard cardTask={taskList[3]} text={taskText[3]} />
            <ProgressCard cardTask={taskList[4]} text={taskText[4]} />
            <ProgressCard cardTask={taskList[5]} text={taskText[5]} />
            <ProgressCard cardTask={taskList[6]} text={taskText[6]} />
          </>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default ProgressScreen;
