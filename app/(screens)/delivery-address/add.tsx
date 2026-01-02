import { ThemedText } from '@/components/themed-text';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function AddAddressScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  function submit() {
    // TODO: persist address
    router.back();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <IconSymbol name="chevron.left" size={20} color="#263a63" />
        </TouchableOpacity>
        <ThemedText type="title" style={styles.headerTitle}>Add New Address</ThemedText>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 18 }}>
          <ThemedText style={{ marginBottom: 12 }}>Delivery Details</ThemedText>

          <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
          <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />
          <TextInput placeholder="Phone number" value={phone} onChangeText={setPhone} style={styles.input} keyboardType="phone-pad" />
          <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} multiline numberOfLines={3} />

          <TouchableOpacity style={styles.submitBtn} activeOpacity={0.8} onPress={submit}>
            <ThemedText style={{ color: '#fff', fontWeight: '700' }}>Add new address</ThemedText>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { height: 80, paddingHorizontal: 14, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '700', color: '#263a63' },
  input: { backgroundColor: '#fff', height: 48, borderRadius: 8, paddingHorizontal: 12, marginBottom: 12, borderWidth: 1, borderColor: '#e6eaec' },
  submitBtn: { height: 56, borderRadius: 12, backgroundColor: '#263a63', alignItems: 'center', justifyContent: 'center', marginTop: 18, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 },
});
