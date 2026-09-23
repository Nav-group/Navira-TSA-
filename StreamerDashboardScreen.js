import React, { useEffect, useState, useCallback } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, RefreshControl } from "react-native";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  limit,
  doc,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import colors from "./colors";

const MIN_AGE = 18;
const MIN_FOLLOWERS = 1000;
const MIN_VIDEOS_LAST_30_DAYS = 5;
const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

export default function StreamerDashboardScreen({ navigation }) {
  const [contentLast30Days, setContentLast30Days] = useState(0);
  const [followersCount, setFollowersCount] = useState(0);
  const [isAdult, setIsAdult] = useState(false);
  const [coinsBalance, setCoinsBalance] = useState(0);
  const [recentGifts, setRecentGifts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const streamerId = auth.currentUser?.uid;

  useEffect(() => {
    if (!streamerId) return;

    // Vidéos/posts publiés par ce streamer -> on filtre les 30 derniers jours
    const contentQuery = query(
      collection(db, "content"),
      where("streamerId", "==", streamerId)
    );
    const unsubContent = onSnapshot(contentQuery, (snap) => {
      const now = Date.now();
      const recentCount = snap.docs.filter((d) => {
        const createdAt = d.data().createdAt?.toMillis?.() ?? 0;
        return now - createdAt <= THIRTY_DAYS_MS;
      }).length;
      setContentLast30Days(recentCount);
    });

    // Profil : nombre d'abonnés + date de naissance (pour vérifier les 18 ans)
    const unsubUser = onSnapshot(
      doc(db, "users", streamerId),
      (docSnap) => {
        const data = docSnap.data();
        if (data) {
          setFollowersCount(data.followersCount || 0);
          if (data.birthDate) {
            const birth = new Date(data.birthDate);
            const eighteenYearsAgo = new Date();
            eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - MIN_AGE);
            setIsAdult(birth <= eighteenYearsAgo);
          }
        }
      }
    );

    // Cadeaux reçus (les 20 plus récents) -> solde de coins + historique
    const giftsQuery = query(
      collection(db, "gifts"),
      where("toStreamerId", "==", streamerId),
      orderBy("createdAt", "desc"),
      limit(20)
    );
    const unsubGifts = onSnapshot(giftsQuery, (snap) => {
      const gifts = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setRecentGifts(gifts);
      const total = gifts.reduce((sum, g) => sum + (g.coinsAmount || 0), 0);
      setCoinsBalance(total);
    });

    return () => {
      unsubContent();
      unsubUser();
      unsubGifts();
    };
  }, [streamerId]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 600);
  }, []);

  const eligibilityChecks = [
    { label: `Avoir au moins ${MIN_AGE} ans`, met: isAdult },
    { label: `Avoir au moins ${MIN_FOLLOWERS} abonnés`, met: followersCount >= MIN_FOLLOWERS },
    {
      label: `Publier au moins ${MIN_VIDEOS_LAST_30_DAYS} vidéos sur les 30 derniers jours`,
      met: contentLast30Days >= MIN_VIDEOS_LAST_30_DAYS,
    },
  ];
  const isEligible = eligibilityChecks.every((c) => c.met);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 20 }}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.primaryGreen} />}
    >
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Solde de coins reçus</Text>
        <Text style={styles.balanceValue}>{coinsBalance} coins</Text>
        <TouchableOpacity
          style={styles.withdrawButton}
          onPress={() => navigation.navigate("Withdrawal", { coinsBalance })}
        >
          <Text style={styles.withdrawButtonText}>Demander un retrait</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Éligibilité au streaming</Text>
        <Text style={[styles.cardValue, { color: isEligible ? colors.primaryGreen : colors.textMuted }]}>
          {isEligible ? "Éligible ✅" : "Non éligible"}
        </Text>
        {eligibilityChecks.map((check) => (
          <View key={check.label} style={styles.checkRow}>
            <Text style={check.met ? styles.checkMet : styles.checkUnmet}>
              {check.met ? "✓" : "✗"}
            </Text>
            <Text style={styles.checkLabel}>{check.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Abonnés</Text>
        <Text style={styles.cardValue}>{followersCount}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardLabel}>Vidéos publiées (30 derniers jours)</Text>
        <Text style={styles.cardValue}>
          {contentLast30Days} / {MIN_VIDEOS_LAST_30_DAYS}
        </Text>
        <View style={styles.progressTrack}>
          <View
            style={[
              styles.progressFill,
              { width: `${Math.min(100, (contentLast30Days / MIN_VIDEOS_LAST_30_DAYS) * 100)}%` },
            ]}
          />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Cadeaux récents</Text>
      {recentGifts.length === 0 && (
        <Text style={styles.emptyText}>Aucun cadeau reçu pour le moment.</Text>
      )}
      {recentGifts.map((gift) => (
        <View key={gift.id} style={styles.giftRow}>
          <Text style={styles.giftFrom}>{gift.fromUserName || "Spectateur"}</Text>
          <Text style={styles.giftAmount}>+{gift.coinsAmount} coins</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.settingsLink} onPress={() => navigation.navigate("Settings")}>
        <Text style={styles.settingsLinkText}>Paramètres →</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { color: colors.text, fontSize: 22, fontWeight: "700", marginBottom: 20 },
  balanceCard: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  balanceLabel: { color: colors.background, fontSize: 13, opacity: 0.8 },
  balanceValue: { color: colors.background, fontSize: 28, fontWeight: "800", marginTop: 4 },
  withdrawButton: {
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 14,
  },
  withdrawButtonText: { color: colors.primaryGreen, fontWeight: "700" },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardLabel: { color: colors.textMuted, fontSize: 13 },
  cardValue: { color: colors.primaryGreen, fontSize: 20, fontWeight: "700", marginTop: 4 },
  checkRow: { flexDirection: "row", alignItems: "center", marginTop: 8 },
  checkMet: { color: colors.primaryGreen, fontWeight: "700", marginRight: 8 },
  checkUnmet: { color: colors.textMuted, fontWeight: "700", marginRight: 8 },
  checkLabel: { color: colors.text, fontSize: 13 },
  progressTrack: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginTop: 10,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: colors.primaryGreen },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "700", marginTop: 8, marginBottom: 10 },
  emptyText: { color: colors.textMuted, fontSize: 13 },
  giftRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: colors.surface,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  giftFrom: { color: colors.text },
  giftAmount: { color: colors.primaryGreen, fontWeight: "700" },
  settingsLink: { marginTop: 20, alignItems: "center" },
  settingsLinkText: { color: colors.primaryGreen },
});
