import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import colors from "./colors";

// TODO: remplacer par les 7 moyens de paiement africains définitifs
// (ex. Tmoney, Flooz, Orange Money, MTN MoMo, Wave, Moov Money, Visa/Mastercard...)
const PAYMENT_METHODS = [
  "Tmoney",
  "Flooz",
  "Orange Money",
  "MTN Mobile Money",
  "Moov Money",
  "Wave",
  "Carte bancaire (Visa/Mastercard)",
];

const COIN_PACKS = [
  { id: "1", coins: 100, price: "1 000 F CFA" },
  { id: "2", coins: 550, price: "5 000 F CFA" },
  { id: "3", coins: 1200, price: "10 000 F CFA" },
];

export default function BuyCoinsScreen() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acheter des coins Navira</Text>

      <FlatList
        data={COIN_PACKS}
        keyExtractor={(i) => i.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.packCard}>
            <Text style={styles.packCoins}>{item.coins} coins</Text>
            <Text style={styles.packPrice}>{item.price}</Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.sectionTitle}>Moyen de paiement</Text>
      {PAYMENT_METHODS.map((method) => (
        <TouchableOpacity
          key={method}
          style={[
            styles.methodRow,
            selectedMethod === method && styles.methodRowSelected,
          ]}
          onPress={() => setSelectedMethod(method)}
        >
          <Text style={styles.methodText}>{method}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Payer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  title: { color: colors.text, fontSize: 20, fontWeight: "700", marginBottom: 16 },
  packCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginRight: 12,
    borderWidth: 1,
    borderColor: colors.border,
    minWidth: 120,
  },
  packCoins: { color: colors.primaryGreen, fontWeight: "700", fontSize: 16 },
  packPrice: { color: colors.textMuted, marginTop: 4, fontSize: 12 },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "700", marginTop: 24, marginBottom: 10 },
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
  payButton: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 20,
  },
  payButtonText: { color: colors.background, fontWeight: "700" },
});
