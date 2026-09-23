import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { BackHandler } from "react-native";
import { signOut, deleteUser } from "firebase/auth";
import { auth } from "./firebase";
import colors from "./colors";

// Onglet Paramètres : suppression de compte, changement de mot de passe,
// déconnexion, fermeture de l'application, moyens de paiement enregistrés
export default function SettingsScreen({ navigation }) {
  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace("Login");
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Cette action est définitive. Confirmer ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            if (auth.currentUser) await deleteUser(auth.currentUser);
            navigation.replace("Login");
          },
        },
      ]
    );
  };

  const handleCloseApp = () => {
    BackHandler.exitApp();
  };

  const Row = ({ label, onPress, danger }) => (
    <TouchableOpacity style={styles.row} onPress={onPress}>
      <Text style={[styles.rowText, danger && styles.rowTextDanger]}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paramètres</Text>

      <Row label="Changer le mot de passe" onPress={() => navigation.navigate("ChangePassword")} />
      <Row label="Moyens de paiement enregistrés" onPress={() => navigation.navigate("PaymentMethods")} />
      <Row label="Se déconnecter" onPress={handleLogout} />
      <Row label="Fermer l'application" onPress={handleCloseApp} />
      <Row label="Supprimer définitivement mon compte" onPress={handleDeleteAccount} danger />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { color: colors.text, fontSize: 22, fontWeight: "700", marginBottom: 20 },
  row: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  rowText: { color: colors.text },
  rowTextDanger: { color: colors.danger, fontWeight: "700" },
});
