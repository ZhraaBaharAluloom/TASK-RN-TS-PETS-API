import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Alert,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";

interface AddPetModal {
  setModalVisible: (isVisible: boolean) => void;
  isVisible: boolean;
}

const AddPet = ({ setModalVisible, isVisible }: AddPetModal) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [image, setImage] = useState("");
  const [adopted, setAdopted] = useState("");

  const handleAddPet = async () => {
    const adopt = 0;
    try {
      await axios.post(
        "https://pets-react-query-backend.eapi.joincoded.com/pets",
        {
          name,
          description,
          type,
          image,
          adopted: adopt,
        }
      );
      Alert.alert("Pet added successfully!");
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to add pet:", error);
      Alert.alert("Failed to add pet.");
    }
  };

  return (
    <Modal
      style={styles.modalStyle}
      animationType="slide"
      visible={isVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <View style={styles.modalContentContainer}>
          <View style={styles.container}>
            <AntDesign
              name="close"
              size={24}
              color="black"
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            />
            <Text style={styles.title}>Add Your Pet! </Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              placeholder="Description"
              style={styles.input}
              value={description}
              onChangeText={setDescription}
            />
            <TextInput
              placeholder="Type"
              style={styles.input}
              value={type}
              onChangeText={setType}
            />
            <TextInput
              placeholder="Image"
              style={styles.input}
              value={image}
              onChangeText={setImage}
            />
            <TextInput
              placeholder="Adopted"
              style={styles.input}
              value={adopted}
              onChangeText={setAdopted}
            />

            <TouchableOpacity style={styles.button} onPress={handleAddPet}>
              <Text style={styles.buttonText}>Add Pet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default AddPet;

const styles = StyleSheet.create({
  modalStyle: {
    backgroundColor: "#f9e3be40",
  },
  modalContentContainer: {
    flex: 1,
    height: 100,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#f9e3be",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  input: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 10,
    margin: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  closeIcon: {
    position: "absolute",
    top: 40,
    right: 10,
  },
});
