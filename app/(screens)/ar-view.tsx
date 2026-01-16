import { Ionicons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');

export default function ARView() {
  const router = useRouter();
  const [permission, requestPermission] = useCameraPermissions();

  useEffect(() => {
    if (!permission?.granted) {
      requestPermission();
    }
  }, [permission]);

  const handleBack = () => {
    router.back();
  };

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log('Add to cart');
  };

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Ionicons name="camera-outline" size={64} color="#9CA3AF" />
        <Text style={styles.permissionText}>Camera access is required</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Camera View */}
      <CameraView
        style={styles.camera}
        facing="back"
      >
        {/* Instruction Banner */}
        <View style={styles.instructionBanner}>
          <View style={styles.instructionContainer}>
            <View style={styles.iconContainer}>
              <View style={styles.scanIcon}>
                {[...Array(9)].map((_, i) => (
                  <View key={i} style={styles.dot} />
                ))}
              </View>
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.instructionText}>
                Please scan the room by{'\n'}
                moving your phone around
              </Text>
            </View>
          </View>
        </View>

        {/* Corner Frames */}
        <View style={styles.frameOverlay}>
          {/* Top Left */}
          <View style={[styles.corner, styles.topLeft]}>
            <View style={[styles.horizontalLine, { top: 0, left: 0, width: 64 }]} />
            <View style={[styles.verticalLine, { top: 0, left: 0, height: 64 }]} />
          </View>

          {/* Top Right */}
          <View style={[styles.corner, styles.topRight]}>
            <View style={[styles.horizontalLine, { top: 0, right: 0, width: 64 }]} />
            <View style={[styles.verticalLine, { top: 0, right: 0, height: 64 }]} />
          </View>

          {/* Bottom Left */}
          <View style={[styles.corner, styles.bottomLeft]}>
            <View style={[styles.horizontalLine, { bottom: 0, left: 0, width: 64 }]} />
            <View style={[styles.verticalLine, { bottom: 0, left: 0, height: 64 }]} />
          </View>

          {/* Bottom Right */}
          <View style={[styles.corner, styles.bottomRight]}>
            <View style={[styles.horizontalLine, { bottom: 0, right: 0, width: 64 }]} />
            <View style={[styles.verticalLine, { bottom: 0, right: 0, height: 64 }]} />
          </View>
        </View>

        {/* Bottom Action Buttons */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={handleBack}
            activeOpacity={0.7}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
            activeOpacity={0.7}
          >
            <Ionicons name="cart-outline" size={20} color="#FFFFFF" />
            <Text style={styles.addToCartButtonText}>Add to cart</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  camera: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: '#1F2937',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  permissionText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#1F2937',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  permissionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionBanner: {
    position: 'absolute',
    top: '50%',
    left: width * 0.1,
    right: width * 0.1,
    transform: [{ translateY: -50 }],
    zIndex: 20,
  },
  instructionContainer: {
    backgroundColor: 'rgba(31, 41, 55, 0.9)',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 16,
  },
  scanIcon: {
    width: 48,
    height: 48,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
    margin: 2,
  },
  textContainer: {
    flex: 1,
  },
  instructionText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  frameOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  corner: {
    position: 'absolute',
    width: 64,
    height: 64,
  },
  topLeft: {
    top: 140,
    left: 24,
  },
  topRight: {
    top: 140,
    right: 24,
  },
  bottomLeft: {
    bottom: 140,
    left: 24,
  },
  bottomRight: {
    bottom: 140,
    right: 24,
  },
  horizontalLine: {
    position: 'absolute',
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  verticalLine: {
    position: 'absolute',
    width: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
  centerLine: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -128 }, { translateY: -1 }],
    zIndex: 10,
  },
  scanLine: {
    width: 256,
    height: 2,
    backgroundColor: '#FFFFFF',
    opacity: 0.5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    padding: 16,
    gap: 12,
    zIndex: 20,
  },
  backButton: {
    flex: 1,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#1F2937',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#1F2937',
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartButton: {
    flex: 1,
    paddingVertical: 16,
    backgroundColor: '#1F2937',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addToCartButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

// Add corner line positioning
StyleSheet.create({
  topLeft: {
    ...StyleSheet.absoluteFillObject,
    horizontalLine: {
      ...StyleSheet.flatten(styles.horizontalLine),
      top: 0,
      left: 0,
      width: '100%',
    },
    verticalLine: {
      ...StyleSheet.flatten(styles.verticalLine),
      top: 0,
      left: 0,
      height: '100%',
    },
  },
  topRight: {
    ...StyleSheet.absoluteFillObject,
    horizontalLine: {
      ...StyleSheet.flatten(styles.horizontalLine),
      top: 0,
      right: 0,
      width: '100%',
    },
    verticalLine: {
      ...StyleSheet.flatten(styles.verticalLine),
      top: 0,
      right: 0,
      height: '100%',
    },
  },
  bottomLeft: {
    ...StyleSheet.absoluteFillObject,
    horizontalLine: {
      ...StyleSheet.flatten(styles.horizontalLine),
      bottom: 0,
      left: 0,
      width: '100%',
    },
    verticalLine: {
      ...StyleSheet.flatten(styles.verticalLine),
      bottom: 0,
      left: 0,
      height: '100%',
    },
  },
  bottomRight: {
    ...StyleSheet.absoluteFillObject,
    horizontalLine: {
      ...StyleSheet.flatten(styles.horizontalLine),
      bottom: 0,
      right: 0,
      width: '100%',
    },
    verticalLine: {
      ...StyleSheet.flatten(styles.verticalLine),
      bottom: 0,
      right: 0,
      height: '100%',
    },
  },
});
