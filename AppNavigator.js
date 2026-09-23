import React from "react";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import WelcomeScreen from "./WelcomeScreen";
import RoleSelectionScreen from "./RoleSelectionScreen";
import SettingsScreen from "./SettingsScreen";

import ViewerHomeScreen from "./ViewerHomeScreen";
import BuyCoinsScreen from "./BuyCoinsScreen";

import StreamerOnboardingScreen from "./StreamerOnboardingScreen";
import StreamerPendingValidationScreen from "./StreamerPendingValidationScreen";
import StreamerDashboardScreen from "./StreamerDashboardScreen";
import WithdrawalScreen from "./WithdrawalScreen";

import colors from "./colors";

const Stack = createNativeStackNavigator();

const NaviraTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    primary: colors.primaryGreen,
    text: colors.text,
    border: colors.border,
  },
};

export default function AppNavigator() {
  return (
    <NavigationContainer theme={NaviraTheme}>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        {/* Écran d'ouverture (1s, effet cinéma) */}
        <Stack.Screen name="Splash" component={SplashScreen} />

        {/* Parcours d'entrée */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="RoleSelection" component={RoleSelectionScreen} />

        {/* Espace spectateur */}
        <Stack.Screen name="ViewerHome" component={ViewerHomeScreen} />
        <Stack.Screen
          name="BuyCoins"
          component={BuyCoinsScreen}
          options={{ headerShown: true, title: "Acheter des coins" }}
        />

        {/* Espace streamer */}
        <Stack.Screen name="StreamerOnboarding" component={StreamerOnboardingScreen} />
        <Stack.Screen
          name="StreamerPendingValidation"
          component={StreamerPendingValidationScreen}
        />
        <Stack.Screen name="StreamerDashboard" component={StreamerDashboardScreen} />
        <Stack.Screen
          name="Withdrawal"
          component={WithdrawalScreen}
          options={{ headerShown: true, title: "Demander un retrait" }}
        />

        {/* Commun */}
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ headerShown: true, title: "Paramètres" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
