import { Colors } from "@/assets/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

export default function HomeHeaderImage() {
    return (
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
    )
}

const styles = StyleSheet.create({    
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
})