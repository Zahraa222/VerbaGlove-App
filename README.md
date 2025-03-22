# VerbaGlove Mobile App

This is the official React Native mobile application for the **VerbaGlove Project**. The app connects to an **ESP32 microcontroller via Bluetooth Low Energy (BLE)** and translates gesture inputs to text and speech using **Text-to-Speech (TTS)** functionality.

## 📌 Supported Platforms
- **Android Only** (Currently, the app is designed for Android devices. iOS support may be added in the future.)

## 📌 Features
- Scan for BLE devices and connect to ESP32 (VerbaGlove).
- Display received gesture letters in real-time.
- Speech playback of recognized gestures using TTS.
- Pause/Resume functionality for text display and speech.

---

## 📁 Project Structure
```
📂 VerbaGlove-App
│
├── 📁 node_modules
├── 📁 android
├── 📁 ios
├── 📁 screens
│   ├── BLEScanner.tsx
│   └── HomeScreen.tsx
├── App.tsx
├── navigation.tsx
├── package.json
├── README.md
├── tsconfig.json
├── react-native.config.js
└── ...
```

---

## 📦 Dependencies
Ensure you have these dependencies installed:

```bash
npm install react-native-ble-plx
npm install react-native-quick-base64
npm install @react-navigation/native @react-navigation/stack
npm install react-native-vector-icons
npm install react-native-tts
```

Additionally, you need to link the dependencies:
```bash
npx react-native link
```

---

## 🔧 Installation
1. **Clone the repository:**
```bash
git clone <your-repo-url>
```

2. **Navigate to the project directory:**
```bash
cd VerbaGlove-App
```

3. **Install dependencies:**
```bash
npm install
```

4. **Start Metro bundler:**
```bash
npx react-native start
```

5. **Run the app on Android:**
```bash
npx react-native run-android
```

---

## 📲 Permissions (Android)
Add the following permissions to your `AndroidManifest.xml` file:
```xml
<uses-permission android:name="android.permission.BLUETOOTH" />
<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
<uses-permission android:name="android.permission.BLUETOOTH_SCAN" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
```

---

## 🚀 Usage
1. Make sure your **ESP32 is powered on and advertising**.
2. Launch the app.
3. Click the "Scan for Devices" button to detect your ESP32.
4. Connect to the device when it appears.
5. The app will display recognized gestures and allow you to listen to them by pressing the "Speech" button.

---

## 🔑 Important Points
- Ensure the UUIDs in your ESP32 code and React Native app match.
- Make sure your **ESP32 is broadcasting using the same UUIDs as defined in your app** (`SERVICE_UUID`, `RX_CHARACTERISTIC_UUID`, `TX_CHARACTERISTIC_UUID`).
- Use **nRF Connect App** or **LightBlue App** to debug and test your BLE connection.

---

## 📚 Resources
- [React Native BLE PLX Documentation](https://github.com/dotintent/react-native-ble-plx)
- [react-native-tts Documentation](https://github.com/ak1394/react-native-tts)
- [Nordic UART Service (NUS)](https://infocenter.nordicsemi.com/index.jsp)

---

## 💡 Future Improvements
- Improve UI/UX for better accessibility.
- Implement custom UUIDs if necessary.
- Include it for IOS devices. 





