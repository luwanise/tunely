import * as MediaLibrary from "expo-media-library"

export const getAudioFiles = async () => {
    // Request Permission
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
        console.warn('Permission to access media library denied!');
        return;
    }

    // Fetch Audio Files
    const media = await MediaLibrary.getAssetsAsync({
        mediaType: MediaLibrary.MediaType.audio,    // Fetch audio files only
        first: 100,                                 // Number of files to fetch
    });
    
    return media.assets;
};