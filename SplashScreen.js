import React, { useEffect, useRef } from "react";
import { View, Image, Animated, Easing, StyleSheet } from "react-native";
import colors from "./colors";

// Écran d'ouverture (1re chose vue en entrant dans l'app) : la bannière
// Navira TSA apparaît depuis le noir avec un flash lumineux, façon
// générique de studio de cinéma. Reste à l'écran ~1s puis passe à Login.
export default function SplashScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.85)).current;
  const flashOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      // Le logo émerge du noir
      Animated.parallel([
        Animated.timing(logoOpacity, {
          toValue: 1,
          duration: 450,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(logoScale, {
          toValue: 1,
          duration: 550,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      // Flash lumineux, façon générique de studio
      Animated.sequence([
        Animated.timing(flashOpacity, {
          toValue: 0.85,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(flashOpacity, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require("./splash-banner.png")}
        style={[
          styles.banner,
          { opacity: logoOpacity, transform: [{ scale: logoScale }] },
        ]}
        resizeMode="contain"
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.flash, { opacity: flashOpacity }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
  banner: {
    width: "80%",
    height: 140,
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.primaryGreen,
  },
});
