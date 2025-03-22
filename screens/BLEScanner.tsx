import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, PermissionsAndroid, Platform, StyleSheet } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import { StackScreenProps } from '@react-navigation/stack';

const bleManager = new BleManager();

const SERVICE_UUID = "6E400001-B5A3-F393-E0A9-E50E24DCCA9E"; // ESP32 BLE Service UUID

type RootStackParamList = {
  HomeScreen: { deviceId: string };
  BLEScanner: undefined;
};

type Props = StackScreenProps<RootStackParamList, 'BLEScanner'>;

export default function BLEScanner({ navigation }: Props) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [scanning, setScanning] = useState(false);

  async function requestPermissions() {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);

      if (
        granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] === PermissionsAndroid.RESULTS.GRANTED &&
        granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log("✅ BLE Permissions Granted");
      } else {
        console.log("❌ BLE Permissions Denied");
      }
    }
  }

  useEffect(() => {
    requestPermissions();
  }, []);

  const scanDevices = () => {
    setDevices([]);
    setScanning(true);
    console.log("🔍 Scanning for VerbaGlove...");

    bleManager.startDeviceScan([SERVICE_UUID], null, (error, device) => {
      if (error) {
        console.log("❌ Scan Error:", error);
        setScanning(false); // Stop scanning if there's an error
        return;
      }

      if (device) {
        console.log("📡 Found Device:", device.name || "ESP32", device.id);
        setDevices((prevDevices) => {
          const exists = prevDevices.find((d) => d.id === device.id);
          return exists ? prevDevices : [...prevDevices, device];
        });
      }
    });

    setTimeout(() => {
      bleManager.stopDeviceScan();
      setScanning(false);
      console.log("🔍 Scan Stopped");
    }, 10000);
  };

  const connectToDevice = async (device: Device) => {
    try {
      console.log("🔗 Connecting to", device.name || "ESP32");

      const connectedDevice = await device.connect();
      console.log("✅ Connected to", device.id);

      // Discover all BLE services & characteristics
      await connectedDevice.discoverAllServicesAndCharacteristics();
      console.log("🔍 Services Discovered");

      // Navigate to HomeScreen and pass the device ID
      navigation.navigate('HomeScreen', { deviceId: connectedDevice.id });
    } catch (error) {
      console.log("❌ Connection Failed", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Updated Title */}
      <Text style={styles.title}>Connect to Your VerbaGlove</Text>

      {/* Scan Button */}
      <TouchableOpacity 
        style={[styles.scanButton, scanning ? styles.scanButtonDisabled : {}]} 
        onPress={scanDevices} 
        disabled={scanning}
      >
        <Text style={styles.scanButtonText}>{scanning ? "Scanning..." : "Scan for Devices"}</Text>
      </TouchableOpacity>

      {/* 📌 Make Sure the List Appears BELOW the Button */}
      <View style={styles.listContainer}>
        <FlatList
          data={devices}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => connectToDevice(item)} style={styles.deviceItem}>
              <Text>{item.name || "ESP32"} ({item.id})</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: 'center', 
    padding: 20 
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginBottom: 20, 
    top: 170,
  },
  scanButton: {
    backgroundColor: '#007BFF', // Blue color
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginBottom: 10, // 🔥 Ensures space before the list
    top: 210,
  },
  scanButtonDisabled: {
    backgroundColor: '#A0A0A0', // Greyed out when disabled
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listContainer: {
    flex: 1, // 🔥 Pushes the list below the button
    width: '100%',  
    alignItems: 'center',  
    marginTop: 10,  // 🔥 Small gap after the scan button
    top: 220,
  },
  deviceItem: {
    padding: 10,
    marginVertical: 1, // Adds spacing between device list items
    backgroundColor: '#ddd',
    borderRadius: 5,
    width: '100%', // Makes the list look better
    textAlign: 'center',
  },
});
