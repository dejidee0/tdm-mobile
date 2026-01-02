import { ThemedText } from '@/components/themed-text';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderSuccess() {
	const router = useRouter();

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: '#F7F9FB' }}>
			<View style={styles.header} />

			<View style={{ padding: 24, alignItems: 'center' }}>
				<Image source={require('@/assets/images/order-success.png')} style={{ width: 220, height: 220 }} />

				<ThemedText type="title" style={{ marginTop: 18, textAlign: 'center', color: '#263a63' }}>Your Order has been accepted</ThemedText>

				<ThemedText style={{ color: '#9aa3a7', marginTop: 12, textAlign: 'center' }}>Your item is being processed! A confirmation email will be sent to you!</ThemedText>

				<TouchableOpacity style={styles.orderBtn} onPress={() => router.replace('/orders')} activeOpacity={0.9}>
					<ThemedText style={{ color: '#fff', fontWeight: '700' }}>My Order</ThemedText>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: { height: 80, backgroundColor: '#fff' },
	orderBtn: { marginTop: 24, height: 64, width: '100%', borderRadius: 12, backgroundColor: '#263a63', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8 },
});
