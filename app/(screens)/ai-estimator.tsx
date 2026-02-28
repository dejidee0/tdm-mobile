import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AIEstimator() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="chevron-back" size={22} color="#273054" />
          </TouchableOpacity>
          <Text style={styles.header}>AI Estimator</Text>
        </View>

        <Text style={styles.title}>Start Your{`\n`}Renovation Project</Text>
        <Text style={styles.subtitle}>Upload your space details to get an instant AI-powered estimate.</Text>

        <Text style={styles.section}>PROPERTY TYPE</Text>
        <View style={styles.propRow}>
          <TouchableOpacity style={[styles.propCard, styles.propActive]}>
            <Ionicons name="business" size={22} color="#273054" />
            <Text style={styles.propText}>Apartment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.propCard}>
            <Ionicons name="home" size={22} color="#999" />
            <Text style={styles.propTextMuted}>Villa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.propCard}>
            <Ionicons name="business-outline" size={22} color="#999" />
            <Text style={styles.propTextMuted}>Office</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.section}>ROOM SCAN / PHOTOS</Text>
        <TouchableOpacity style={styles.uploadBox} onPress={() => {}}>
          <View style={styles.uploadInner}>
            <View style={styles.uploadIcon}>
              <Ionicons name="camera" size={20} color="#273054" />
            </View>
            <Text style={styles.uploadText}>Tap to Upload</Text>
            <Text style={styles.uploadSub}>JPG, PNG, or HEIC (Max 10MB)</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.thumbRow}>
          <Image source={require('@/assets/images/placeholder.jpg')} style={styles.thumb} />
          <Image source={require('@/assets/images/placeholder.jpg')} style={styles.thumb} />
        </View>

        <Text style={styles.section}>PROJECT DETAILS</Text>
        <TextInput placeholder="Approx. Area (sq ft)" style={styles.input} />
        <TextInput placeholder="Select Design Style" style={styles.input} />

        <View style={{ height: 40 }} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.outlineBtn} onPress={() => router.back()}>
          <Text style={styles.outlineText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryBtn} onPress={() => router.push('/(screens)/estimate-results')}>
          <Text style={styles.primaryText}>Generate AI Estimate</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20, paddingBottom: 120 },
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 6, height: 50 },
  backBtn: { padding: 6 },
  header: { flex: 1, textAlign: 'center', fontSize: 18, fontWeight: '800', color: '#273054', marginRight: 36 },
  title: { fontSize: 28, fontWeight: '900', color: '#273054', marginTop: 6 },
  subtitle: { color: '#8e98a9', marginTop: 8, marginBottom: 16 },
  section: { marginTop: 18, color: '#273054', fontWeight: '800', marginBottom: 8 },
  propRow: { flexDirection: 'row', gap: 12 },
  propCard: { flex: 1, backgroundColor: '#fafafa', borderRadius: 12, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: '#f0f0f0' },
  propActive: { borderColor: '#273054', backgroundColor: '#eef2ff' },
  propText: { marginTop: 8, color: '#273054', fontWeight: '700' },
  propTextMuted: { marginTop: 8, color: '#9aa0ae', fontWeight: '700' },
  uploadBox: { marginTop: 8, borderStyle: 'dashed', borderWidth: 2, borderColor: '#ddd', borderRadius: 12, padding: 24, alignItems: 'center' },
  uploadInner: { alignItems: 'center' },
  uploadIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6 },
  uploadText: { fontWeight: '700', color: '#273054' },
  uploadSub: { color: '#9aa0ae', fontSize: 12, marginTop: 6 },
  thumbRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  thumb: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#eee' },
  input: { marginTop: 12, backgroundColor: '#fff', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#f0f0f0' },
  footer: { position: 'absolute', left: 16, right: 16, bottom: 16, flexDirection: 'row', gap: 12 },
  outlineBtn: { flex: 1, height: 50, borderRadius: 12, borderWidth: 1.5, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  outlineText: { color: '#273054', fontWeight: '700' },
  primaryBtn: { flex: 2, height: 50, borderRadius: 12, backgroundColor: '#273054', alignItems: 'center', justifyContent: 'center' },
  primaryText: { color: '#fff', fontWeight: '900' },
});
