import { Colors } from '@/assets/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';

export default function MusicItemMenu() {

  const [visible, setVisible] = useState(false);
  
  const handleOptionPress = (option: string) => {
    console.log(`${option} selected`);
    setVisible(false);
  };

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity style={styles.icon} onPress={() => setVisible(!visible)}>
        <Ionicons name="ellipsis-horizontal-outline" size={20} color={Colors.text} />
      </TouchableOpacity>

      {visible && (
        <View style={styles.dropdown}>
          {['Play', 'Add to Playlist', 'Share', 'Delete'].map((option) => (
            <TouchableOpacity key={option} onPress={() => handleOptionPress(option.toLowerCase())} style={styles.option}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 10,
  },
  dropdown: {
    position: 'absolute',
    right: 0,
    top: 30,
    width: 150,
    backgroundColor: Colors.text,
    elevation: 5,
    borderRadius: 8,
    zIndex: 10,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: Colors.text,
  },
});
