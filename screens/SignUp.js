import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import FormError from "../Components/FormError";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../Firebase/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import ColorPalette from "react-native-color-palette";
import * as ImagePicker from "expo-image-picker";
import { doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const SignUp = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [errMessage, setErrorMessage] = useState("");
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [displayFormErr, setDisplayFormErr] = useState(false);
  const [userColor, setuserColor] = useState("");
  const [image, setImage] = useState(null);
  const [accountImage, setAccountImage] = useState(null);

  function navigate() {
    navigation.navigate("signIn");
  }

  const AddUserData = async () => {
    await setDoc(doc(db, "user", auth.currentUser.uid), {
      fullname: fullName,
      email: email,
      fav_colour: userColor,
      picture: image,
      curr_hexagons: 0,
      total_hexagons: 0,
      total_distance: 0,
      total_playtime: 0,
      best_distance: 0,
      best_hexagons: 0,
      best_playtime: 0,
      level: 0,
      number_of_completed_runs: 0,
      runs: [],
      tasks: tasks,
    });
    //Add a new document in collection "user"
  };

  function createUser() {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        AddUserData();
        updateProfile(auth.currentUser, {
          displayName: fullName,
        }).then(() => {});
      })
      .catch((err) => {
        setErrorMessage(err.message);
        setDisplayFormErr(true);
      });
  }

  const validateForm = () => {
    var form_inputs = [fullName, email, password, confirmPassword, userColor];
    var passwords_match = password == confirmPassword;

    if (form_inputs.includes("") || form_inputs.includes(undefined)) {
      setErrorMessage("Please fill in all fields");
      return setDisplayFormErr(true);
    }

    if (!passwords_match) {
      setErrorMessage("Passwords do not match");
      return setDisplayFormErr(true);
    }

    if (passwords_match) return createUser();
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      const storage = getStorage(); //the storage itself
      const ref_con = ref(storage, new Date().toISOString()); //how the image will be addressed inside the storage
      //convert image to array of bytes
      setAccountImage(result.uri);

      const img = await fetch(result.uri);
      const bytes = await img.blob();
      await uploadBytes(ref_con, bytes); //upload images
      getDownloadURL(ref(storage, ref_con.name)).then((url) => {
        setImage(url);
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.BottomView}>
        <Ionicons
          onPress={navigate}
          style={styles.Icon}
          name="arrow-back-circle-outline"
          color={"#fff"}
          size={60}
        />
        <Text style={styles.Heading}>
          Create your{"\n"}
          account
        </Text>
        <View style={styles.FormView}>
          <TextInput
            onChangeText={(val) => setFullName(val)}
            value={fullName}
            placeholder={"Full name*"}
            placeholderTextColor={"#fff"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(val) => setEmail(val)}
            placeholder={"Email address*"}
            value={email}
            placeholderTextColor={"#fff"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(val) => setPassword(val)}
            placeholder={"Password*"}
            value={password}
            secureTextEntry={true}
            placeholderTextColor={"#fff"}
            style={styles.TextInput}
          />
          <TextInput
            onChangeText={(val) => setConfirmPassword(val)}
            placeholder={"Confirm Password*"}
            value={confirmPassword}
            secureTextEntry={true}
            placeholderTextColor={"#fff"}
            style={styles.TextInput}
          />

          <ColorPalette
            onChange={(color) => setuserColor(color)}
            value={userColor}
            colors={[
              "#F44336",
              "#E91E63",
              "#673AB7",
              "#3F51B5",
              "#2196F3",
              "#03A9F4",
              "#00BCD4",
              "#009688",
              "#4CAF50",
              "#8BC34A",
              "#C0392B",
              "#E74C3C",
              "#9B59B6",
              "#8E44AD",
              "#2980B9",
              "#FFEB3B",
              "#FFC107",
              "#FF9800",
              "#FF5722",
              "#9E9E9E",
              "#607D8B",
            ]}
            title={"Choose Player Colour"}
            titleStyles={styles.Text}
          />
          {/* Add profile pic */}
          <Text style={styles.Text}>Choose Profile Picture</Text>
          <TouchableOpacity onPress={pickImage} style={styles.Button}>
            <Text style={styles.ButtonText}>
              Pick an image from camera roll
            </Text>
          </TouchableOpacity>
          <View style={styles.container}>
            {accountImage && (
              <Image
                source={{ uri: accountImage }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  borderColor: userColor,
                  borderWidth: 5,
                }}
              />
            )}
          </View>
          <TouchableOpacity onPress={validateForm} style={styles.Button}>
            <Text style={styles.ButtonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      {displayFormErr == true ? (
        <FormError hideErrOverlay={setDisplayFormErr} err={errMessage} />
      ) : null}
    </View>
  );
};

export default SignUp;

const tasks = [
  { goal: 1, level: 0, progress: 0 },
  { goal: 1, level: 0, progress: 0 },
  { goal: 3, level: 0, progress: 0 },
  { goal: 3, level: 0, progress: 0 },
  { goal: 5, level: 0, progress: 0 },
  { goal: 10, level: 0, progress: 0 },
  { goal: 30, level: 0, progress: 0 },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  BottomView: {
    width: "100%",
    backgroundColor: "tomato",
  },
  Heading: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 30,
    marginTop: 5,
  },
  FormView: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 10,
  },
  TextInput: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#fff",
    height: 52,
    borderRadius: 10,
    paddingLeft: 5,
    marginTop: 20,
    color: "#fff",
  },
  Button: {
    width: "90%",
    color: "#000",
    height: 52,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ButtonText: {
    fontWeight: "bold",
    color: "gray",
    fontSize: 16,
  },
  SignUpText: {
    color: "gray",
  },
  TextButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    marginTop: 20,
  },
  Icon: {
    marginLeft: 5,
    marginTop: 30,
  },
  Text: {
    fontWeight: "normal",
    fontSize: 16,
    color: "#fff",
    margin: 10,
    marginTop: 20,
    marginLeft: 20,
    alignSelf: "flex-start",
  },
});
