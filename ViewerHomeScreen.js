import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from "react-native";
import colors from "./colors";

// Espace spectateur : acheter des coins Navira + voir les comptes streamers
const MOCK_STREAMERS = [
  { id: "1", name: "Ama_Live", live: true },
  { id: "2", name: "KofiStream", live: false },
  { id: "3", name: "NanaOnAir", live: true },
];

export default function ViewerHomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require("./logo.png")} style={styles.logo} />
        <TouchableOpacity
          style={styles.coinsButton}
          onPress={() => navigation.navigate("BuyCoins")}
        >
          <Text style={styles.coinsText}>💰 Acheter des coins</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Streamers</Text>
      <FlatList
        data={MOCK_STREAMERS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.streamerRow}>
            <View style={styles.avatar} />
            <View style={{ flex: 1 }}>
              <Text style={styles.streamerName}>{item.name}</Text>
              <Text style={item.live ? styles.liveTag : styles.offlineTag}>
                {item.live ? "● En direct" : "Hors ligne"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  logo: { width: 40, height: 40, borderRadius: 10 },
  coinsButton: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  coinsText: { color: colors.background, fontWeight: "700", fontSize: 12 },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: "700", marginBottom: 12 },
  streamerRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primaryGreenDark,
    marginRight: 12,
  },
  streamerName: { color: colors.text, fontWeight: "600" },
  liveTag: { color: colors.primaryGreen, fontSize: 12, marginTop: 2 },
  offlineTag: { color: colors.textMuted, fontSize: 12, marginTop: 2 },
});
