import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import colors from "./colors";

// Validation du compte streamer :
// photo de profil, pays/ville, nom/prénom, date de naissance (18 ans min),
// carte d'identité recto-verso + selfie à côté du visage.
// Après soumission -> statut "en attente de validation par l'administrateur"
// (admin : trillionbooks6@gmail.com)
export default function StreamerOnboardingScreen({ navigation }) {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [idFront, setIdFront] = useState(null);
  const [idBack, setIdBack] = useState(null);
  const [selfieWithId, setSelfieWithId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [birthDate, setBirthDate] = useState(""); // format JJ/MM/AAAA
  const [submitting, setSubmitting] = useState(false);

  const pickImage = async (setter) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) setter(result.assets[0].uri);
  };

  const isAtLeast18 = (dateStr) => {
    const [d, m, y] = dateStr.split("/").map(Number);
    if (!d || !m || !y) return false;
    const birth = new Date(y, m - 1, d);
    const eighteenYearsAgo = new Date();
    eighteenYearsAgo.setFullYear(eighteenYearsAgo.getFullYear() - 18);
    return birth <= eighteenYearsAgo;
  };

  const handleSubmit = async () => {
    if (!isAtLeast18(birthDate)) {
      alert("Tu dois avoir au moins 18 ans pour devenir streamer sur Navira.");
      return;
    }
    if (!profilePhoto || !idFront || !idBack || !selfieWithId) {
      alert("Merci de fournir toutes les photos demandées.");
      return;
    }
    setSubmitting(true);
    // TODO: uploader les fichiers vers Firebase Storage,
    // créer un document Firestore "streamer_requests" avec statut "en_attente",
    // et notifier l'admin (trillionbooks6@gmail.com)
    setTimeout(() => {
      setSubmitting(false);
      navigation.replace("StreamerPendingValidation");
    }, 800);
  };

  const PhotoField = ({ label, value, onPress }) => (
    <TouchableOpacity style={styles.photoField} onPress={onPress}>
      {value ? (
        <Image source={{ uri: value }} style={styles.photoPreview} />
      ) : (
        <Text style={styles.photoLabel}>{label}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>Devenir streamer</Text>
      <Text style={styles.subtitle}>
        Ces informations servent à vérifier ton identité avant validation par l'équipe Navira.
      </Text>

      <PhotoField
        label="📷 Photo de profil"
        value={profilePhoto}
        onPress={() => pickImage(setProfilePhoto)}
      />

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        placeholderTextColor={colors.textMuted}
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nom"
        placeholderTextColor={colors.textMuted}
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Pays"
        placeholderTextColor={colors.textMuted}
        value={country}
        onChangeText={setCountry}
      />
      <TextInput
        style={styles.input}
        placeholder="Ville"
        placeholderTextColor={colors.textMuted}
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Date de naissance (JJ/MM/AAAA)"
        placeholderTextColor={colors.textMuted}
        value={birthDate}
        onChangeText={setBirthDate}
      />

      <Text style={styles.sectionTitle}>Vérification d'identité</Text>
      <PhotoField
        label="🪪 Carte d'identité (recto)"
        value={idFront}
        onPress={() => pickImage(setIdFront)}
      />
      <PhotoField
        label="🪪 Carte d'identité (verso)"
        value={idBack}
        onPress={() => pickImage(setIdBack)}
      />
      <PhotoField
        label="🤳 Selfie avec la carte d'identité à côté du visage"
        value={selfieWithId}
        onPress={() => pickImage(setSelfieWithId)}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={submitting}>
        <Text style={styles.submitButtonText}>
          {submitting ? "Envoi..." : "Soumettre pour validation"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { color: colors.text, fontSize: 22, fontWeight: "700" },
  subtitle: { color: colors.textMuted, fontSize: 13, marginBottom: 20, marginTop: 4 },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: "700", marginTop: 16, marginBottom: 10 },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: 14,
    color: colors.text,
    marginBottom: 12,
  },
  photoField: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  photoLabel: { color: colors.textMuted },
  photoPreview: { width: "100%", height: "100%" },
  submitButton: {
    backgroundColor: colors.primaryGreen,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 12,
    marginBottom: 40,
  },
  submitButtonText: { color: colors.background, fontWeight: "700" },
});
