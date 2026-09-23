import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "./firebase";
import colors from "./colors";

// Moyens de retrait pour les streamers (pas de crypto ici)
const WITHDRAWAL_METHODS = ["Tmoney", "Flooz (Moov Money)", "Orange Money", "MTN", "Wave"];

export default function WithdrawalScreen({ route, navigation }) {
  const coinsBalance = route?.params?.coinsBalance ?? 0;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    const numericAmount = parseInt(amount, 10);
    if (!selectedMethod) {
      Alert.alert("Choisis un moyen de retrait");
      return;
    }
    if (!numericAmount || numericAmount <= 0) {
      Alert.alert("Entre un montant de coins valide");
      return;
    }
    if (numericAmount > coinsBalance) {
      Alert.alert("Solde insuffisant", "Tu ne peux pas retirer plus que ton solde de coins.");
      return;
    }
    if (!phoneNumber) {
      Alert.alert("Entre le numéro à créditer");
      return;
    }

    setSubmitting(true);
    try {
      await addDoc(collection(db, "withdrawal_requests"), {
        streamerId: auth.currentUser?.uid,
        method: selectedMethod,
        phoneNumber,
        coinsAmount: numericAmount,
        status: "en_attente", // changé par l'admin : "validé" / "refusé"
        createdAt: serverTimestamp(),
      });
      Alert.alert(
        "Demande envoyée",
        "Ta demande de retrait est en attente de validation par l'administrateur."
      );
      navigation.goBack();
    } catch (e) {
      Alert.alert("Erreur", e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Demander un retrait</Text>
      <Text style={styles.balance}>Solde disponible : {coinsBalance} coins</Text>

      <Text style={styles.sectionTitle}>Moyen de retrait</Text>
      {WITHDRAWAL_METHODS.map((method) => (
        <TouchableOpacity
          key={method}
          style={[styles.methodRow, selectedMethod === method && styles.methodRowSelected]}
          onPress={() => setSelectedMethod(method)}
        >
          <Text style={styles.methodText}>{method}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Numéro à créditer"
        placeholderTextColor={colors.textMuted}
        keyboardType="phone-pad"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Montant en coins"
        placeholderTextColor={colors.textMuted}
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={submitting}>
        <Text style={styles.submitButtonText}>
          {submitting ? "Envoi..." : "Envoyer la demande"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { color: colors.text, fontSize: 20, fontWeight: "700" },
  balance: { color: colors.primaryGreen, fontSize: 14, marginTop: 4, marginBottom: 20 },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: "700", marginBottom: 10 },
  methodRow: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  methodRowSelected: { borderColor: colors.primaryGreen },
  methodText: { color: colors.text },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    color: colors.text,
    marginTop: 12,
  },
  submitButton: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 24,
  },
  submitButtonText: { color: colors.background, fontWeight: "700" },
});
