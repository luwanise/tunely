import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from "@/assets/Colors";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent hidden />
      <ImageBackground
        style={styles.image}
        source={require('../assets/images/home-image.jpg')}
      >
        <LinearGradient
          colors={[Colors.dark_fade, Colors.middle_fade, Colors.light_fade]}
          style={styles.gradient}
        />
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Feel the Beat</Text>
          <Text style={styles.subheading}>Find the music that moves you</Text>
        </View>
      </ImageBackground>
      <View style={styles.card}>
        <Text style={styles.playlist}>Playlist</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    justifyContent: 'center',
  },
  gradient: {
    width: "100%",
    height: "100%",
    opacity: 0.5,
    position: 'absolute',
  },
  headerContainer: {
    margin: 20,
    position: 'absolute',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subheading: {
    fontSize: 12,
    fontStyle: "italic",
    color: Colors.text,
  },
  card: {
    flex: 1,
    position: 'absolute',
    top: 250,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.background,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    padding: 20,
    zIndex: 1,
  },
  playlist: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: "bold",
    marginTop: 20
  }
});