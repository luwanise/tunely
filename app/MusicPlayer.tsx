import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image, BackHandler, Animated } from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import { Colors } from "@/assets/Colors";

export default function MusicPlayer() {
  const params = useLocalSearchParams();
  const filename = params.filename.toString();
  const uri = params.uri.toString();

  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  const spinValue = new Animated.Value(0);

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);
      sound.setOnPlaybackStatusUpdate(updateStatus);
    };
    loadSound();

    return () => {
      sound?.unloadAsync();
    };
  }, [uri]);

  useEffect(() => {
    const onBackPress = () => {
      sound?.stopAsync();
      sound?.unloadAsync();
      router.back();
      return true;
    };

    BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [sound]);

  const updateStatus = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      if (status.didJustFinish) setIsPlaying(false);
    }
  };

  const togglePlayback = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        Animated.timing(spinValue, {
  toValue: 0, // Reset the animation
  duration: 0, // Instant stop (optional, if you want it to stop immediately)
  useNativeDriver: true, // Important for performance
}).stop();

      } else {
        await sound.playAsync();
        spinAlbumArt();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const spinAlbumArt = () => {
    spinValue.setValue(0);
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  };

  const rotateData = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <LinearGradient
      colors={[Colors.dark_fade, Colors.middle_fade, Colors.light_fade]}
      style={styles.container}
    >
      <Animatable.View animation="fadeInDown" duration={1000} style={styles.backButton}>
        <TouchableOpacity onPress={() => { sound?.stopAsync(); sound?.unloadAsync(); router.back(); }}>
          <Ionicons name="arrow-back" size={30} color={Colors.text} />
        </TouchableOpacity>
      </Animatable.View>

      <Animated.Image
        source={require("../assets/images/singing silhouette.png")}
        style={[styles.albumArt, { transform: [{ rotate: rotateData }] }]}
      />

      <Animatable.Text animation="fadeInUp" duration={1000} style={styles.title}>
        {filename}
      </Animatable.Text>

      <View style={styles.durationContainer}>
        <Text style={styles.durationText}>{formatTime(position)}</Text>
        <Text style={styles.durationText}>{formatTime(duration)}</Text>
      </View>

      <Slider
        style={styles.slider}
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor={Colors.primary}
        minimumTrackTintColor={Colors.primary}
        onSlidingComplete={(value) => sound?.setPositionAsync(value)}
      />

      <Animatable.View animation="pulse" iterationCount="infinite" easing="ease-out">
        <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
          <Ionicons name={isPlaying ? "pause" : "play"} size={50} color={Colors.primary} />
        </TouchableOpacity>
      </Animatable.View>
    </LinearGradient>
  );
}

const formatTime = (millis: number) => {
  const minutes = Math.floor(millis / 60000);
  const seconds = ((millis % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
  albumArt: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderColor: Colors.background,
    borderWidth: 7,
    marginBottom: 30,
    elevation: 20,
  },
  title: {
    color: Colors.text,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  durationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  durationText: {
    color: Colors.text,
    fontSize: 14,
  },
  slider: {
    width: "90%",
    height: 40,
    marginBottom: 20,
  },
  playButton: {
    marginTop: 20,
  },
});
