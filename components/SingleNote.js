import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SingleNote = ({ note, notes, setNotes }) => {
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState(note.text);

  const handleDelete = (id) => {
    setNotes(notes.filter((t) => t.id !== id));
  };

  useEffect(() => {
    AsyncStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleEdit = () => {
    if (!edit) {
      setEdit(!edit);
    } else {
      setEdit(!edit);
      setNotes(
        notes.map((t) =>
          t.id === note.id
            ? {
                id: t.id,
                text: editText,
              }
            : t
        )
      );
      AsyncStorage.setItem("notes", JSON.stringify(notes));
    }
  };

  return (
    <View style={styles.note}>
      {!edit ? (
        <Text style={styles.notetext}>{note.text}</Text>
      ) : (
        <TextInput
          onChangeText={(text) => setEditText(text)}
          style={styles.noteinput}
          value={editText}
        />
      )}
      <TouchableOpacity>
        <MaterialIcons
          style={styles.noteaction}
          name="edit"
          size={23}
          color="blue"
          onPress={handleEdit}
        />
      </TouchableOpacity>
      <TouchableOpacity>
        <MaterialIcons
          style={styles.noteaction}
          name="delete"
          size={23}
          onPress={() => handleDelete(note.id)}
          color="red"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SingleNote;

const styles = StyleSheet.create({
  note: {
    flexDirection: "row",
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: "black",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  notetext: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 3,
    paddingHorizontal: 5,
  },
  noteinput: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 5,
    borderRadius: 5,
    borderColor: "grey",
    borderWidth: 1,
  },
  noteaction: {
    marginLeft: 15,
  },
});