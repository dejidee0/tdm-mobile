import { useRouter } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OrderSuccess() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.safe}>
			<View style={styles.header} />

			<View style={styles.contentContainer}>
				<Image source={require('@/assets/images/order-success.png')} style={styles.successImage} />

				<Text style={styles.title}>Your Order has been accepted</Text>

				<Text style={styles.description}>Your item is being processed! A confirmation email will be sent to you!</Text>

				<TouchableOpacity style={styles.orderBtn} onPress={() => router.replace('/orders')} activeOpacity={0.8}>
					<Text style={styles.orderBtnText}>My Orders</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safe: { flex: 1, backgroundColor: '#fff' },
	header: { height: 60, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
	contentContainer: { flex: 1, padding: 24, alignItems: 'center', justifyContent: 'center', gap: 16 },
	successImage: { width: 200, height: 200, marginBottom: 10 },
	title: { fontSize: 20, fontWeight: '900', color: '#D4AF37', textAlign: 'center', marginBottom: 8 },
	description: { fontSize: 14, color: '#999', textAlign: 'center', lineHeight: 20, marginBottom: 24 },
	orderBtn: { marginTop: 20, height: 48, width: '100%', maxWidth: 320, borderRadius: 10, backgroundColor: '#D4AF37', alignItems: 'center', justifyContent: 'center', shadowColor: '#D4AF37', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 8, elevation: 5 },
	orderBtnText: { color: '#fff', fontWeight: '900', fontSize: 15 },
});
