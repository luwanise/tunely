import { Colors } from "@/assets/Colors";
import { Audio } from "@/models/Audio";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MusicItemMenu from "./MusicItemMenu";
import { router } from "expo-router";

interface MusicItemProps {
    item: Audio
}

export default function MusicItem({item}: MusicItemProps) {

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => router.push({
                pathname: "/MusicPlayer",
                params: {
                    filename: item.filename.toString(),
                    uri: item.uri.toString()
                }
            })}
        >
            <Image style={styles.image} source={require("../assets/images/singing silhouette.png")}/>
            <View style={styles.musicDetailsContainer}>
                <Text style={styles.filename}>{item.filename}</Text>
                <Text style={styles.author}>Missy the Author</Text>
            </View>
            <MusicItemMenu />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 10
    },
    musicDetailsContainer: {
        flex: 1,
        marginStart: 20,
        justifyContent: "center"
    },
    filename: {
        fontSize: 15,
        color: Colors.text,
        fontWeight: "bold",
    },
    author: {
        fontSize: 12,
        color: Colors.text,
    },
})
