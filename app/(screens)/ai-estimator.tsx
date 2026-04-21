// API_BASE_URL removed; using service helpers in services/api
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createRenovationEstimate, uploadRoomImage } from '../../services/api';

export default function AIEstimator() {
  const router = useRouter();
  const [propType, setPropType] = useState('Apartment');
  const [area, setArea] = useState('');
  const [style, setStyle] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([]);
  const [loading, setLoading] = useState(false);

  async function pickImages() {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsMultipleSelection: true,
      quality: 0.8,
    });
    if (!res.canceled) {
      setImages([...images, ...res.assets]);
    }
  }

  function removeImage(index: number) {
    const newImgs = [...images];
    newImgs.splice(index, 1);
    setImages(newImgs);
  }

  async function handleGenerate() {
    if (!images.length) return Alert.alert('Photos required', 'Please upload at least one photo of the room');
    if (!area && !(length && width)) return Alert.alert('Area or dimensions required', 'Please provide the approximate area or both length and width');
    if (!style) return Alert.alert('Style required', 'Please provide a design style');

    setLoading(true);
    try {
      // Upload images first (optional) - server may use uploaded photos to improve estimate
      if (images.length) {
        const formData = new FormData();
        images.forEach((img, i) => {
          const file = {
            uri: img.uri,
            name: img.fileName || `room_${i}.jpg`,
            type: img.mimeType || 'image/jpeg',
          } as any;
          formData.append('file', file);
        });
        formData.append('Title', 'Room Scan');
        formData.append('RoomType', propType);

        await uploadRoomImage(formData);
      }

      // Determine dimensions: prefer explicit length/width if provided, otherwise infer from area (sq ft)
      let lengthMeters = 0;
      let widthMeters = 0;
      let heightMeters = 2.7;

      if (length && width) {
        lengthMeters = Number(length) || 0;
        widthMeters = Number(width) || 0;
      } else {
        console.log('Input area (sq ft):', area);
        const areaSqFt = Number(area || 0);
        const areaSqM = isNaN(areaSqFt) ? 0 : areaSqFt * 0.092903;
        lengthMeters = areaSqM > 0 ? Math.sqrt(areaSqM) : 3.0;
        widthMeters = areaSqM > 0 ? Math.sqrt(areaSqM) : 3.0;
      }

      if (height) {
        heightMeters = Number(height) || 2.7;
      }

      const payload = {
        projectName: `AI Estimate - ${propType}`,
        roomType: propType,
        lengthMeters: parseFloat(lengthMeters.toFixed(2)),
        widthMeters: parseFloat(widthMeters.toFixed(2)),
        heightMeters: parseFloat(heightMeters.toFixed(2)),
        finishLevel: style || 'Standard',
        includeFlooring: true,
        includePainting: true,
        includeElectrical: true,
        includePlumbing: true,
        contingencyPercent: 10,
      };

      const res = await createRenovationEstimate(payload);
      if (res.ok) {
        // navigate to results list; detailed view may be opened from there
        router.push('/(screens)/estimate-results');
      } else {
        throw new Error(res.data?.message || 'Failed to create renovation estimate');
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#D4AF37" />
          </TouchableOpacity>
          <Text style={styles.header}>AI Estimator</Text>
        </View>

        <Text style={styles.title}>Start Your{`\n`}Renovation Project</Text>
        <Text style={styles.subtitle}>Upload your space details to get an instant AI-powered estimate.</Text>

        <Text style={styles.section}>PROPERTY TYPE</Text>
        <View style={styles.propRow}>
          <TouchableOpacity style={[styles.propCard, propType === 'Apartment' && styles.propActive]} onPress={() => setPropType('Apartment')}>
            <Ionicons name="business" size={22} color={propType === 'Apartment' ? "#D4AF37" : "#999"} />
            <Text style={propType === 'Apartment' ? styles.propText : styles.propTextMuted}>Apartment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.propCard, propType === 'Villa' && styles.propActive]} onPress={() => setPropType('Villa')}>
            <Ionicons name="home" size={22} color={propType === 'Villa' ? "#D4AF37" : "#999"} />
            <Text style={propType === 'Villa' ? styles.propText : styles.propTextMuted}>Villa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.propCard, propType === 'Office' && styles.propActive]} onPress={() => setPropType('Office')}>
            <Ionicons name="business-outline" size={22} color={propType === 'Office' ? "#D4AF37" : "#999"} />
            <Text style={propType === 'Office' ? styles.propText : styles.propTextMuted}>Office</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.section}>ROOM SCAN / PHOTOS</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={pickImages}>
          <View style={styles.uploadInner}>
            <View style={styles.uploadIcon}>
              <Ionicons name="camera" size={20} color="#D4AF37" />
            </View>
            <Text style={styles.uploadText}>Tap to Upload</Text>
            <Text style={styles.uploadSub}>JPG, PNG, or HEIC (Max 10MB)</Text>
          </View>
        </TouchableOpacity>

        {images.length > 0 && (
          <ScrollView horizontal style={styles.thumbRow} contentContainerStyle={{ gap: 12 }}>
            {images.map((img, i) => (
              <View key={i} style={{ position: 'relative' }}>
                <Image source={{ uri: img.uri }} style={styles.thumb} />
                <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(i)}>
                  <Ionicons name="close" size={14} color="#fff" />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        )}

        <Text style={styles.section}>PROJECT DETAILS</Text>
        <TextInput placeholder="Approx. Area (sq ft)" style={styles.input} keyboardType="numeric" value={area} onChangeText={setArea} />
        <View style={styles.dimRow}>
          <TextInput placeholder="Length (m)" style={[styles.input, styles.dimInput]} keyboardType="numeric" value={length} onChangeText={setLength} />
          <TextInput placeholder="Width (m)" style={[styles.input, styles.dimInput]} keyboardType="numeric" value={width} onChangeText={setWidth} />
          <TextInput placeholder="Height (m)" style={[styles.input, styles.dimInput]} keyboardType="numeric" value={height} onChangeText={setHeight} />
        </View>
        <TextInput placeholder="Select Design Style (e.g. Modern, Minimalist)" style={styles.input} value={style} onChangeText={setStyle} />

        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.outlineBtn} onPress={() => router.back()} disabled={loading}>
          <Text style={styles.outlineText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} onPress={handleGenerate} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.primaryText}>Generate AI Estimate</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000000' },
  container: { padding: 20, paddingBottom: 120 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6, height: 50 },
  backBtn: { padding: 6 },
  header: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '800', color: '#D4AF37', marginRight: 36 },
  title: { fontSize: 28, fontWeight: '900', color: '#D4AF37', marginTop: 6 },
  subtitle: { color: '#9aa0ae', marginTop: 8, marginBottom: 16 },
  section: { marginTop: 18, color: '#D4AF37', fontWeight: '800', marginBottom: 8 },
  propRow: { flexDirection: 'row', gap: 12 },
  propCard: { flex: 1, backgroundColor: '#252523', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#494845' },
  propActive: { borderColor: '#D4AF37', backgroundColor: '#252523' },
  propText: { marginTop: 8, color: '#D4AF37', fontWeight: '700' },
  propTextMuted: { marginTop: 8, color: '#9aa0ae', fontWeight: '700' },
  uploadBox: { marginTop: 8, borderStyle: 'dashed', borderWidth: 2, borderColor: '#ddd', borderRadius: 12, padding: 24, alignItems: 'center' },
  uploadInner: { alignItems: 'center' },
  uploadIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#252523', alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 },
  uploadText: { fontWeight: '700', color: '#FFFFFF' },
  uploadSub: { color: '#9aa0ae', fontSize: 12, marginTop: 6 },
  thumbRow: { marginTop: 12, flexDirection: 'row' },
  thumb: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#252523' },
  removeBtn: { position: 'absolute', top: -6, right: -6, backgroundColor: 'red', borderRadius: 10, width: 20, height: 20, alignItems: 'center', justifyContent: 'center' },
  input: { marginTop: 12, backgroundColor: '#494845', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#494845' },
  dimRow: { flexDirection: 'row', gap: 8, marginTop: 12 },
  dimInput: { flex: 1, paddingHorizontal: 12, paddingVertical: 10 },
  footer: { position: 'absolute', left: 16, right: 16, bottom: 16, flexDirection: 'row', gap: 12 },
  outlineBtn: { flex: 1, height: 50, borderRadius: 12, borderWidth: 1.5, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' },
  outlineText: { color: '#000000', fontWeight: '700' },
  primaryBtn: { flex: 2, height: 50, borderRadius: 12, backgroundColor: '#D4AF37', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#FFFFFF', fontWeight: '900' },
});
