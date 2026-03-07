import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { useCart } from '../../context/CartContext';

const { width } = Dimensions.get('window');

export default function ARView() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { addItem } = useCart();
  
  const modelUrl = (params.model as string) || 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/Chair/glTF/Chair.gltf';
  const iosModelUrl = (params.iosModel as string) || 'https://developer.apple.com/augmented-reality/quick-look/models/chair/chair.usdz';
  const id = (params.id as string) || undefined;

  const [loading, setLoading] = useState(true);

  const handleBack = () => {
    router.back();
  };

  const handleAddToCart = async () => {
    if (id) {
      try {
        await addItem({ productId: id, quantity: 1 });
        router.back();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log('Add to cart');
    }
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <script type="module" src="https://ajax.googleapis.com/ajax/libs/model-viewer/4.0.0/model-viewer.min.js"></script>
        <style>
          body, html { width: 100%; height: 100%; margin: 0; padding: 0; background-color: #000; overflow: hidden; }
          model-viewer { 
            width: 100%; 
            height: 100%; 
            --poster-color: transparent; 
          }
          /* Custom AR button styling */
          #ar-button {
            position: absolute;
            top: 250px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #273054;
            color: #fff;
            border: none;
            border-radius: 12px;
            padding: 16px 24px;
            font-size: 16px;
            font-weight: bold;
            box-shadow: 0 4px 8px rgba(0,0,0,0.3);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            z-index: 100;
          }
        </style>
      </head>
      <body>
        <model-viewer 
          src="${modelUrl}" 
          ios-src="${iosModelUrl}" 
          ar 
          ar-scale="auto"
          ar-placement="floor"
          ar-modes="scene-viewer webxr quick-look" 
          camera-controls 
          auto-rotate
          shadow-intensity="1"
          alt="A 3D model of the product"
          autoplay>
          <button slot="ar-button" id="ar-button">
            Launch AR Engine
          </button>
        </model-viewer>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* 3D Model View */}
      <View style={styles.camera}>
        <WebView
          source={{ html: htmlContent }}
          style={styles.webview}
          originWhitelist={['*']}
          allowsInlineMediaPlayback
          javaScriptEnabled
          domStorageEnabled
          onLoadEnd={() => setLoading(false)}
          onShouldStartLoadWithRequest={(request) => {
            if (
              request.url.startsWith('intent://') || 
              request.url.endsWith('.usdz') ||
              (!request.url.startsWith('http') && !request.url.startsWith('about:blank'))
            ) {
              let urlToOpen = request.url;
              if (urlToOpen.startsWith('intent://')) {
                // Convert intent:// arvr.google.com/scene-viewer...#Intent... to standard HTTPS deep link
                const intentRegex = /^intent:\/\/([^\#]+)/;
                const match = urlToOpen.match(intentRegex);
                if (match && match[1]) {
                  urlToOpen = 'https://' + match[1];
                }
              }
              Linking.openURL(urlToOpen).catch(err => console.error("Couldn't load page", err));
              return false;
            }
            return true;
          }}
        />
        {loading && (
          <View style={styles.loadingContainer} pointerEvents="none">
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        )}

        {/* Instruction Banner */}
        <View style={styles.instructionBanner} pointerEvents="none">
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
        <View style={styles.frameOverlay} pointerEvents="none">
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
      </View>
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
  webview: {
    flex: 1,
    backgroundColor: '#000000',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
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
    paddingBottom: 32,
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
