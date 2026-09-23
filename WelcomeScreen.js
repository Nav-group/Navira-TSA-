import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, Easing, StyleSheet } from "react-native";
import colors from "./colors";

// Page 2 : écran animé "Bienvenue dans Navira" affiché après la création de compte
export default function WelcomeScreen({ navigation }) {
  const spin = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.7)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(spin, {
        toValue: 1,
        duration: 1400,
        easing: Easing.out(Easing.exp),
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 900,
        easing: Easing.out(Easing.back(1.4)),
        useNativeDriver: true,
      }),
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        delay: 400,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("RoleSelection");
    }, 2600);
    return () => clearTimeout(timer);
  }, []);

  const rotateInterpolate = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ["-180deg", "0deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./logo.png")}
        style={[
          styles.logo,
          { transform: [{ rotate: rotateInterpolate }, { scale }] },
        ]}
      />
      <Animated.Text style={[styles.title, { opacity: fade }]}>
        Bienvenue dans Navira
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: { width: 140, height: 140, borderRadius: 30, marginBottom: 24 },
  title: { color: colors.primaryGreen, fontSize: 24, fontWeight: "700" },
});
