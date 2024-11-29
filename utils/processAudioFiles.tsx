import * as MediaLibrary from 'expo-media-library';

export const processAudioFiles = (audioFiles?: MediaLibrary.Asset[]) => {
  return audioFiles?.map(file => ({
    id: file.id,
    duration: file.duration,
    filename: file.filename,
    uri: file.uri,
  })) || [];
};