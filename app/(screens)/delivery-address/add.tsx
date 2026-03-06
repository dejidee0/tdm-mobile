import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function AddAddressScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [focusedInput, setFocusedInput] = useState<any>(null);

  function submit() {
    (async () => {
      try {
        const key = '@app_addresses';
        const raw = await AsyncStorage.getItem(key);
        const list = raw ? JSON.parse(raw) : [];
        const id = String(Date.now());
        list.unshift({ id, name, email, phone, address });
        await AsyncStorage.setItem(key, JSON.stringify(list));
      } catch {
        // ignore
      }
      router.back();
    })();
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Address</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.label}>Delivery Details</Text>

          <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={[styles.input, focusedInput === 'name' && styles.inputFocused]} placeholderTextColor="#ccc" onFocus={() => setFocusedInput('name')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Email Address" value={email} onChangeText={setEmail} style={[styles.input, focusedInput === 'email' && styles.inputFocused]} keyboardType="email-address" placeholderTextColor="#ccc" onFocus={() => setFocusedInput('email')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Phone Number" value={phone} onChangeText={setPhone} style={[styles.input, focusedInput === 'phone' && styles.inputFocused]} keyboardType="phone-pad" placeholderTextColor="#ccc" onFocus={() => setFocusedInput('phone')} onBlur={() => setFocusedInput(null)} />
          <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={[styles.input, { minHeight: 100 }, focusedInput === 'address' && styles.inputFocused]} multiline numberOfLines={4} placeholderTextColor="#ccc" onFocus={() => setFocusedInput('address')} onBlur={() => setFocusedInput(null)} />

          <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={submit}>
            <Text style={styles.submitBtnText}>Add New Address</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#273054' },
  container: { padding: 20, paddingBottom: 40 },
  label: { fontSize: 14, fontWeight: '600', color: '#273054', marginBottom: 16 },
  input: { backgroundColor: '#f5f5f5', height: 48, borderRadius: 10, paddingHorizontal: 14, marginBottom: 12, fontSize: 14, color: '#273054', borderWidth: 1, borderColor: '#f0f0f0' },
  inputFocused: { borderColor: '#273054', borderWidth: 2, backgroundColor: '#fff' },
  submitBtn: { height: 48, borderRadius: 10, backgroundColor: '#273054', alignItems: 'center', justifyContent: 'center', marginTop: 20, shadowColor: '#273054', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
  submitBtnText: { color: '#fff', fontWeight: '900', fontSize: 15 },
});
