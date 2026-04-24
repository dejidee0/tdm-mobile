import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ContactUsScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [focusedInput, setFocusedInput] = useState<any>(null);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#D4AF37" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Contact Us</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          <Text style={styles.sectionDesc}>We&rsquo;d love to hear from you. Send us a message and we&rsquo;ll respond as soon as possible.</Text>
        </View>

        {/* Form */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={[styles.input, focusedInput === 'name' && styles.inputFocused]}
            placeholder="John Doe"
            placeholderTextColor="#ccc"
            value={form.name}
            onChangeText={(val) => setForm({ ...form, name: val })}
            onFocus={() => setFocusedInput('name')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={[styles.input, focusedInput === 'email' && styles.inputFocused]}
            placeholder="john@example.com"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            value={form.email}
            onChangeText={(val) => setForm({ ...form, email: val })}
            onFocus={() => setFocusedInput('email')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Subject</Text>
          <TextInput
            style={[styles.input, focusedInput === 'subject' && styles.inputFocused]}
            placeholder="How can we help?"
            placeholderTextColor="#ccc"
            value={form.subject}
            onChangeText={(val) => setForm({ ...form, subject: val })}
            onFocus={() => setFocusedInput('subject')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Message</Text>
          <TextInput
            style={[styles.input, styles.messageInput, focusedInput === 'message' && styles.inputFocused]}
            placeholder="Tell us more..."
            placeholderTextColor="#ccc"
            multiline
            numberOfLines={5}
            value={form.message}
            onChangeText={(val) => setForm({ ...form, message: val })}
            onFocus={() => setFocusedInput('message')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <TouchableOpacity style={styles.submitBtn}>
          <Text style={styles.submitText}>Send Message</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#000000' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#000000', borderBottomWidth: 0, borderBottomColor: 'transparent' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#D4AF37' },
  container: { flex: 1, padding: 20, paddingBottom: 40 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#D4AF37', marginBottom: 8 },
  sectionDesc: { fontSize: 14, color: '#999', lineHeight: 20 },
  formGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#D4AF37', marginBottom: 8 },
  input: { backgroundColor: '#494845', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#FFFFFF', borderWidth: 1, borderColor: '#494845' },
  inputFocused: { borderColor: '#D4AF37', borderWidth: 2, backgroundColor: '#494845' },
  messageInput: { minHeight: 120, paddingTop: 12, textAlignVertical: 'top' },
  submitBtn: { backgroundColor: '#D4AF37', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 30, shadowColor: '#D4AF37', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  submitText: { color: '#FFFFFF', fontWeight: '900', fontSize: 15 },
});
