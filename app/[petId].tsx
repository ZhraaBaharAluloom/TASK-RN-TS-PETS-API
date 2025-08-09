import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useRouter } from "expo-router";
type NewData = {
  id: number;
  name: string;
  description: string;
  type: string;
  image: string;
  image2: string;
};

const PetDetails = () => {
  const { petId } = useLocalSearchParams();
  const [onePet, setOnePet] = useState<NewData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const getOnePet = async (id: number) => {
    try {
      const response = await axios.get(
        `https://pets-react-query-backend.eapi.joincoded.com/pets/${id}`
      );
      setOnePet(response.data);
    } catch (error) {
      console.error("Error fetching pet:", error);
      setOnePet(null);
    }
  };

  useEffect(() => {
    if (petId) {
      getOnePet(Number(petId));
    }
  }, [petId]);

  if (!onePet) {
    return <Text>Pet not found</Text>;
  }
  const deletPet = async (id: number) => {
    const deletpet = await axios.delete(
      `https://pets-react-query-backend.eapi.joincoded.com/pets/${id}`
    );
    alert("pet deleted✅");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{onePet.name}</Text>
      <Image source={{ uri: onePet.image }} style={styles.image} />
      <Text style={styles.description}>{onePet.description}</Text>
      <Text style={styles.type}>Type: {onePet.type}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          deletPet(onePet.id).then(() => router.push(`/`));
        }}
      >
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PetDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9e3be",
    padding: 20,
  },
  image: {
    width: "100%",
    height: 300,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  type: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
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
});
