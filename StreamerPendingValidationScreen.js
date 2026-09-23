import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "./colors";

// Affiché après soumission du dossier streamer, en attendant la validation admin
export default function StreamerPendingValidationScreen() {
  return (
    <View style={styles.container}>
      <Image source={require("./logo.png")} style={styles.logo} />
      <Text style={styles.title}>Dossier envoyé ✅</Text>
      <Text style={styles.text}>
        Ton compte streamer est en cours de vérification par notre équipe.{"\n"}
        Cela prend généralement quelques heures.
      </Text>
      <Text style={styles.support}>Besoin d'aide ? navira.system@protonmail.com</Text>
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
  logo: { width: 80, height: 80, borderRadius: 18, marginBottom: 20 },
  title: { color: colors.primaryGreen, fontSize: 20, fontWeight: "700", marginBottom: 12 },
  text: { color: colors.textMuted, textAlign: "center", lineHeight: 20 },
  support: { color: colors.text, marginTop: 24, fontSize: 12 },
});
