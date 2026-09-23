import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "./colors";

// Page 3 : choix entre "spectateur" et "streamer"
export default function RoleSelectionScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("./logo.png")} style={styles.logo} />
      <Text style={styles.title}>Comment veux-tu utiliser Navira ?</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.replace("ViewerHome")}
      >
        <Text style={styles.cardTitle}>👀 Spectateur</Text>
        <Text style={styles.cardText}>
          Regarde les lives, achète des coins et soutiens tes créateurs préférés.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, styles.cardOutline]}
        onPress={() => navigation.replace("StreamerOnboarding")}
      >
        <Text style={styles.cardTitle}>🎥 Streamer</Text>
        <Text style={styles.cardText}>
          Crée du contenu, fais des lives et reçois des cadeaux de ta communauté.
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logo: { width: 72, height: 72, borderRadius: 16, marginBottom: 24 },
  title: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },
  card: {
    width: "100%",
    backgroundColor: colors.primaryGreen,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  cardOutline: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primaryGreen,
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: colors.background, marginBottom: 6 },
  cardText: { fontSize: 13, color: colors.background },
});
