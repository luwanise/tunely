import { FlatList, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { Colors } from "@/assets/Colors";
import { useAudioFiles } from "@/hooks/useAudioFiles";
import HomeHeaderImage from "@/components/HomeHeaderImage";
import MusicItem from "@/components/MusicItem";
import { useState } from "react";

export default function Index() {

  const audioFiles = useAudioFiles();

  return (
    <View style={styles.container}>
      <StatusBar style="light" translucent hidden />
      <HomeHeaderImage />
      <View style={styles.card}>
        <Text style={styles.playlist}>Playlist</Text>
        <FlatList
          data={audioFiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <MusicItem item={item}/> }
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
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