import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MyDetailsScreen() {
  const router = useRouter();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phoneNumber: '' });
  const [focusedInput, setFocusedInput] = useState<any>(null);

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.sectionTitle}>Personal Information</Text>

        <View style={styles.row}>
          <View style={[styles.formGroup, { flex: 1, marginRight: 10 }]}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={[styles.input, focusedInput === 'firstName' && styles.inputFocused]}
              placeholder="John"
              placeholderTextColor="#ccc"
              value={form.firstName}
              onChangeText={(val) => setForm({ ...form, firstName: val })}
              onFocus={() => setFocusedInput('firstName')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
          <View style={[styles.formGroup, { flex: 1 }]}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={[styles.input, focusedInput === 'lastName' && styles.inputFocused]}
              placeholder="Doe"
              placeholderTextColor="#ccc"
              value={form.lastName}
              onChangeText={(val) => setForm({ ...form, lastName: val })}
              onFocus={() => setFocusedInput('lastName')}
              onBlur={() => setFocusedInput(null)}
            />
          </View>
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
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, focusedInput === 'phoneNumber' && styles.inputFocused]}
            placeholder="+234 801 234 5678"
            placeholderTextColor="#ccc"
            keyboardType="phone-pad"
            value={form.phoneNumber}
            onChangeText={(val) => setForm({ ...form, phoneNumber: val })}
            onFocus={() => setFocusedInput('phoneNumber')}
            onBlur={() => setFocusedInput(null)}
          />
        </View>

        <TouchableOpacity style={styles.saveBtn}>
          <Text style={styles.saveText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#273054' },
  container: { flex: 1, padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#273054', marginBottom: 20 },
  row: { flexDirection: 'row', marginBottom: 12 },
  formGroup: { marginBottom: 18 },
  label: { fontSize: 14, fontWeight: '600', color: '#273054', marginBottom: 8 },
  input: { backgroundColor: '#f5f5f5', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: '#273054', borderWidth: 1, borderColor: '#f0f0f0' },
  inputFocused: { borderColor: '#273054', borderWidth: 2, backgroundColor: '#fff' },
  saveBtn: { backgroundColor: '#273054', paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, marginBottom: 30, shadowColor: '#273054', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  saveText: { color: '#fff', fontWeight: '900', fontSize: 15 },
});
