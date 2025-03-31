import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // For icons

export default function HomeScreen() {
  // State to store recognized gesture text
  const [recognizedGesture, setRecognizedGesture] = useState("Waiting for gesture...");
  const [isPlaying, setIsPlaying] = useState(false); // Track play/pause state

  // Simulated function to update text (Replace this with real Bluetooth data)
  const simulateGesture = (gesture: string) => {
    setRecognizedGesture(gesture);
  };

  // Toggle play/pause function
  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.navbar}>
        <FontAwesome name="bars" size={24} color="black" />
        <Text style={styles.title}>VerbaGlove</Text>
        <FontAwesome name="user-circle" size={24} color="black" />
      </View>

      {/* Text Display (Dynamic) */}
      <View style={styles.textDisplay}>
        <Text style={styles.displayText}>{recognizedGesture}</Text>
      </View>

      {/* Simulate Gesture A Button (Below Text Display) */}
      <TouchableOpacity style={styles.simulateGestureButton} onPress={() => simulateGesture("A")}>
        <Text style={styles.simulateGestureText}>Simulate Gesture A</Text>
      </TouchableOpacity>

      {/* Media Controls */}
      <View style={styles.mediaControls}>
        <FontAwesome name="backward" size={24} color="black" />
        
        {/* Play/Pause Button */}
        <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayPause}>
          <FontAwesome name={isPlaying ? "pause" : "play"} size={24} color="black" />
        </TouchableOpacity>
        
        <FontAwesome name="forward" size={24} color="black" />
      </View>

      {/* Speech Button */}
      <TouchableOpacity style={styles.speechButton}>
        <Text style={styles.speechText}>Speech</Text>
      </TouchableOpacity>

      {/* End Session Button */}
      <TouchableOpacity style={styles.endSessionButton}>
        <Text style={styles.endSessionText}>End Session</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingTop: 40,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 15,
    position: 'absolute',
    top: 25,
    backgroundColor: '#F5EEF8',
    height: 60,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  textDisplay: {
    width: '80%',
    height: 100,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    marginVertical: 20,
    bottom: 80,
  },
  displayText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  simulateGestureButton: {
    backgroundColor: '#4CAF50', // Green color
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    bottom: 80,
  },
  simulateGestureText: {
    color: 'white',
    fontWeight: 'bold',
  },
  mediaControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '50%',
    marginBottom: 20,
    alignItems: 'center',
  },
  playPauseButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 50,
  },
  speechButton: {
    backgroundColor: 'purple',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  speechText: {
    color: 'white',
    fontWeight: 'bold',
  },
  endSessionButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    top: 70,
  },
  endSessionText: {
    color: 'white',
    fontWeight: 'bold',
  },
});