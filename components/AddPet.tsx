import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import axios from "axios";

interface AddPetModal {
  setModalVisible: (isVisible: boolean) => void;
  isVisible: boolean;
}

const AddPet = ({ setModalVisible, isVisible }: AddPetModal) => {
  const [petData, setPetData] = useState({
    name: "",
    type: "",
    image: "",
  });
  const createPet = async () => {
    const newPet = {
      name: petData.name,
      type: petData.type,
      image: petData.image,
      adopted: 0,
    };

    await axios.post(
      "https://pets-react-query-backend.eapi.joincoded.com/pets",
      newPet
    );
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
            />
            <Text style={styles.title}>Add Your Pet! </Text>
            <TextInput
              placeholder="Name"
              style={styles.input}
              value={petData.name}
              onChangeText={(text) => setPetData({ ...petData, name: text })}
            />
            <TextInput
              placeholder="Type"
              style={styles.input}
              value={petData.type}
              onChangeText={(text) => setPetData({ ...petData, type: text })}
            />
            <TextInput
              placeholder="Image"
              style={styles.input}
              value={petData.image}
              onChangeText={(text) => setPetData({ ...petData, image: text })}
            />

            <TouchableOpacity style={styles.button} onPress={createPet}>
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
    top: 100,
    right: 10,
  },
});
