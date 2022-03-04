import React, { useEffect, useState } from "react";
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SingleNote from "./components/SingleNote";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const handleAddNote = () => {
    if (!note) return;
    setNotes([...notes, { id: Date.now(), text: note }]);
    setNote("");
  };

  const fetchNotes = async () => {
    const data = await AsyncStorage.getItem("Notes");
    if (data) setNotes(JSON.parse(data));
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notes App For Learning</Text>
      <View style={styles.inputContainer}>
        <TextInput
          multiline={true}
          value={note}
          onChangeText={(text) => setNote(text)}
          placeholder="Enter A Note"
          style={styles.input}
          editable maxLength={100}
        />
        <TouchableOpacity onPress={handleAddNote}>
          <Text style={styles.button}>Add Note</Text>
        </TouchableOpacity>
      </View>
      {/* ScrollView vs FlatList */}

      {/* Using ScrollView and map() */}
      {/* <ScrollView style={{ width: "100%", marginTop: 10 }}> 
        {notes?.map((note) => (
          <SingleNote
            notes={notes}
            setNotes={setNotes}
            note={note}
            key={note.id}
          />
        ))}
      </ScrollView> */}

      {/* By FlatList */}
      <View style={{ width: "100%", marginTop: 10 }}>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <SingleNote notes={notes} setNotes={setNotes} note={item} />
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#248ea6",
  },
  inputContainer: {
    flexDirection: "row",
    marginHorizontal: 10,
    alignItems: "center",
  },
  button: {
    padding: 13,
    backgroundColor: "grey",
    borderRadius: 50,
    elevation: 10,
  },
  input: {
    elevation: 20,
    shadowColor: "black",
    backgroundColor: "#cad6d9",
    flex: 1,
    marginRight: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  heading: {
    marginVertical: 10,
    fontSize: 30,
    fontWeight: "700",
  },
});