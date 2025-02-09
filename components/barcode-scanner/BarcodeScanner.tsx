import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import { Camera, BarcodeType, CameraView, ScanningResult } from "expo-camera";
import { useTranslation } from "react-i18next";
import "../../locales/localization";

interface BarcodeScannerProps {
  onBarcodeScanning: (scanningResult: ScanningResult) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = (
  props: BarcodeScannerProps,
) => {
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [scanned, setScanned] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  // Handle barcode scanning
  const handleBarcodeScanned = (scanningResult: ScanningResult) => {
    setScanned(true);

    if (props?.onBarcodeScanning != undefined) {
      props?.onBarcodeScanning(scanningResult);
    }
  };

  if (hasPermission === null) {
    return <Text>{t("requestPermission")}.</Text>;
  }
  if (!hasPermission) {
    return <Text>{t("noPermission")}</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",
            "pdf417",
            "code39",
            "ean13",
            "upc_a",
            "upc_e",
            "code128",
            "itf14",
            "code93",
            "codabar",
            "datamatrix",
            "aztec",
          ],
        }}
        style={StyleSheet.absoluteFillObject}
      />
      {!scanned && (
        <View style={styles.overlay}>
          <Text style={styles.overlayText}>{t("alignBarcode")}</Text>
        </View>
      )}

      {scanned && (
        <Button title={t("scanAgain")} onPress={() => setScanned(false)} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "pink",
  },
  overlay: {
    position: "absolute",
    top: "38%", // Adjust position
    left: "20%",
    right: "20%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 30,
    borderRadius: 8,
  },
  overlayText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
});

export default BarcodeScanner;
