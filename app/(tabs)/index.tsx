import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const UserProfile = ({ name }) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.greetingText}>Halo,</Text>
        <Text style={styles.userName}>{name}!</Text>
      </View>
    </View>
  );
};

export default function App() {
  const [inputName, setInputName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [counter, setCounter] = useState(0);
  const [bgColor, setBgColor] = useState("#0F172A");

  useEffect(() => {
    if (isLoggedIn) {
      Alert.alert("Sistem Siap ⚡", `Dashboard diaktifkan untuk ${inputName}.`);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    if (inputName.trim().length >= 3) {
      setIsLoggedIn(true);
    } else {
      Alert.alert(
        "Nama Terlalu Pendek",
        "Gunakan minimal 3 karakter untuk keamanan.",
      );
    }
  };

  const handleReset = () => {
    setCounter(0);
    setIsLoggedIn(false);
    setInputName("");
    setBgColor("#0F172A");
  };

  const handleGantiWarna = () => {
    const colors = [
      "#0F172A",
      "#1E1B4B",
      "#14532D",
      "#7F1D1D",
      "#4C1D95",
      "#083344",
    ];
    let randomColor;
    do {
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    } while (randomColor === bgColor);
    setBgColor(randomColor);
  };

  if (!isLoggedIn) {
    return (
      <SafeAreaView style={styles.gateContainer}>
        <StatusBar barStyle="dark-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.gateContent}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoEmoji}>✨</Text>
            </View>
            <Text style={styles.gateTitle}>Selamat Datang!</Text>
            <Text style={styles.gateSubtitle}>
              Silahkan masukkan nama Anda untuk memverifikasi akses sistem.
            </Text>

            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Nama Lengkap"
                placeholderTextColor="#94A3B8"
                value={inputName}
                onChangeText={setInputName}
              />
            </View>

            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.btnPrimary,
                { opacity: inputName.length >= 3 ? 1 : 0.6 },
              ]}
              onPress={handleLogin}
            >
              <Text style={styles.btnText}>Buka Akses Dashboard</Text>
            </TouchableOpacity>

            <Text style={styles.footerInfo}>
              Sistem Manajemen Informasi v1.0
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.mainContainer, { backgroundColor: bgColor }]}>
      <StatusBar barStyle="light-content" />
      <View style={styles.topDecoration} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        <UserProfile name={inputName} />

        <View style={styles.statsCard}>
          <Text style={styles.cardLabel}>CAPAIAN TARGET BELAJAR</Text>
          <View style={styles.counterWrapper}>
            <Text style={styles.counterValue}>{counter}</Text>
            <Text style={styles.unitText}>POIN</Text>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.btnAction}
              onPress={() => setCounter(Math.max(0, counter - 1))}
            >
              <Text style={styles.btnActionText}>−</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnAction, styles.btnActionAdd]}
              onPress={() => setCounter(counter + 1)}
            >
              <Text style={[styles.btnActionText, styles.btnActionAddText]}>
                +
              </Text>
            </TouchableOpacity>
          </View>

          {counter >= 10 ? (
            <View style={styles.successBox}>
              <Text style={styles.successText}>
                🎉 Level Up! Target Terlampaui.
              </Text>
            </View>
          ) : (
            <View style={styles.progressTrack}>
              <View
                style={[
                  styles.progressBar,
                  { width: `${Math.min(counter * 10, 100)}%` },
                ]}
              />
              <Text style={styles.progressLabel}>
                {10 - counter} poin lagi menuju target
              </Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.btnColorToggle}
          onPress={handleGantiWarna}
        >
          <Text style={styles.btnColorToggleText}>🎨 Ganti Warna Tema</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnGhost} onPress={handleReset}>
          <Text style={styles.btnGhostText}>Log Out & Reset Data</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  btnActionAddText: { color: "#FFF" },
  btnColorToggle: {
    marginTop: 24,
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  btnColorToggleText: {
    color: "#FFF",
    fontWeight: "600",
    fontSize: 15,
  },
  gateContainer: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
  },
  gateContent: { padding: 32, alignItems: "center" },
  logoCircle: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  logoEmoji: { fontSize: 32 },
  gateTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 8,
  },
  gateSubtitle: {
    textAlign: "center",
    color: "#64748B",
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 32,
  },
  inputWrapper: { width: "100%", marginBottom: 16 },
  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#1E293B",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  btnPrimary: {
    width: "100%",
    height: 56,
    backgroundColor: "#6366F1",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 6,
  },
  btnText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  footerInfo: {
    marginTop: 40,
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "500",
  },

  mainContainer: { flex: 1, backgroundColor: "#0F172A" }, // Dark Mode Feel
  topDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 250,
    backgroundColor: "#6366F1",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  scroll: { padding: 24 },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 32,
  },
  greetingText: { color: "#E0E7FF", fontSize: 14, fontWeight: "500" },
  userName: { color: "#FFF", fontSize: 24, fontWeight: "800" },
  badgeID: {
    backgroundColor: "rgba(255,255,255,0.15)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: { color: "#FFF", fontSize: 12, fontWeight: "700" },

  statsCard: {
    backgroundColor: "#FFF",
    borderRadius: 32,
    padding: 32,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  cardLabel: {
    fontSize: 12,
    color: "#94A3B8",
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  counterWrapper: {
    flexDirection: "row",
    alignItems: "baseline",
    marginVertical: 20,
  },
  counterValue: { fontSize: 90, fontWeight: "900", color: "#1E293B" },
  unitText: {
    fontSize: 16,
    fontWeight: "700",
    color: "#64748B",
    marginLeft: 8,
  },

  buttonRow: { flexDirection: "row", gap: 16, width: "100%" },
  btnAction: {
    flex: 1,
    height: 64,
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  btnActionAdd: { backgroundColor: "#6366F1" },
  btnActionText: { fontSize: 28, fontWeight: "600", color: "#1E293B" },
  btnActionAddText: { color: "#FFF" },

  progressTrack: {
    width: "100%",
    height: 12,
    backgroundColor: "#F1F5F9",
    borderRadius: 6,
    marginTop: 32,
    overflow: "hidden",
  },
  progressBar: { height: "100%", backgroundColor: "#6366F1", borderRadius: 6 },
  progressLabel: {
    marginTop: 12,
    fontSize: 13,
    color: "#94A3B8",
    fontWeight: "600",
  },

  successBox: {
    marginTop: 32,
    width: "100%",
    padding: 16,
    backgroundColor: "#F0FDF4",
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#22C55E",
  },
  successText: { color: "#166534", fontWeight: "700", textAlign: "center" },

  btnGhost: { marginTop: 32, alignItems: "center", padding: 16 },
  btnGhostText: { color: "#94A3B8", fontWeight: "600", fontSize: 14 },
});
