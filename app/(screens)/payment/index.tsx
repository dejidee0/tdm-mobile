import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { checkoutPayment, verifyPaystackPayment } from '../../../services/api';

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const orderId = params.orderId as string;

  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [authUrl, setAuthUrl] = useState<string | null>(null);
  const [paymentReference, setPaymentReference] = useState<string | null>(null);

  useEffect(() => {
    async function initPayment() {
      // If no order ID, we can't tie the payment to anything
      if (!orderId) {
        Alert.alert('Error', 'No order ID provided. Please return and try checkout again.');
        router.back();
        return;
      }

      try {
        console.log('[Payment] Initializing with orderId:', orderId);
        // Build the precise payload for the Checkout payment DTO.
        // The backend expects CheckoutPaymentRequestDto structure.
        const payload = {
          payment: {
            method: 'paystack',
            reference: orderId, 
            callbackUrl: 'https://standard.paystack.co/close'
          }
        };

        const res = await checkoutPayment(payload);
        console.log('[Payment] checkoutPayment response:', res);

        if (res.ok && res.data) {
           // Extract the authorization URL returned by Paystack via your backend wrapper
           const url = res.data?.data?.authorization_url || res.data?.authorizationUrl || res.data?.data?.authorizationUrl || (typeof res.data === 'string' && res.data.startsWith('http') ? res.data : null);
           const ref = res.data?.data?.reference || res.data?.reference || orderId;

           if (url) {
             setAuthUrl(url);
             setPaymentReference(ref);
           } else {
             Alert.alert('Payment Error', 'Could not extract payment authorization URL from server response.');
             router.back();
           }
        } else {
           Alert.alert('Payment Error', res.data?.message || res.data?.title || 'Failed to initialize payment securely on the server.');
           router.back();
        }
      } catch (err: any) {
        console.error('[Payment] exception:', err);
        Alert.alert('Error', 'Something went wrong while connecting to the payment server. ' + (err?.message || ''));
        router.back();
      } finally {
        setLoading(false);
      }
    }

    initPayment();
  }, [orderId]);

  const handleNavigationStateChange = async (navState: any) => {
    const { url } = navState;
    console.log('[Payment] WebView navigation state changed. URL:', url);
    
    // Check if the URL indicates Paystack has reached our callback or a success param
    if (url.includes('standard.paystack.co/close') || url.includes('trxref=') || url.includes('reference=')) {
      if (verifying) return; // Prevent double trigger
      setVerifying(true);
      
      // Attempt to extract reference from URL query params
      let refToVerify = paymentReference || orderId;
      try {
        const queryParams = url.split('?')[1];
        if (queryParams) {
          const paramsList = queryParams.split('&');
          for (let p of paramsList) {
            const [key, val] = p.split('=');
            if (key === 'reference') {
              refToVerify = decodeURIComponent(val);
            }
          }
        }
      } catch (e) {
        console.warn('Could not parse trxref from url', e);
      }

      console.log('[Payment] Verifying reference via server:', refToVerify);
      try {
        const verRes = await verifyPaystackPayment(refToVerify);
        console.log('[Payment] verify result:', verRes);
        
        // If the backend validates the payment successfully
        if (verRes.ok) {
          router.replace('/(screens)/order-placement/order-success');
        } else {
          Alert.alert('Verification Failed', 'Could not verify payment status with our servers: ' + (verRes.data?.message || 'Unknown error'));
          router.replace('/(screens)/orders'); 
        }
      } catch (err: any) {
        console.error('[Payment] Verify exception', err);
        Alert.alert('Error', 'Failed to verify transaction: ' + (err?.message || ''));
        router.replace('/(screens)/orders');
      }
    }
  };

  if (loading || verifying) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#273054" />
        <Text style={styles.loadingText}>{verifying ? 'Verifying your payment, please wait...' : 'Initializing Secure Payment Gate...'}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
          <Ionicons name="chevron-back" size={24} color="#273054" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Complete Payment</Text>
        <View style={{ width: 40 }} />
      </View>
      
      {authUrl ? (
        <WebView 
          source={{ uri: authUrl }} 
          style={{ flex: 1 }} 
          onNavigationStateChange={handleNavigationStateChange}
          javaScriptEnabled
          domStorageEnabled
          startInLoadingState
          renderLoading={() => (
            <View style={[styles.center, StyleSheet.absoluteFillObject, { backgroundColor: '#fff', zIndex: 10 }]}>
              <ActivityIndicator size="large" color="#273054" />
            </View>
          )}
        />
      ) : (
        <View style={styles.center}>
          <Text style={{color: '#999'}}>No payment frame could be loaded.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  center: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 16, fontSize: 15, color: '#273054', fontWeight: '500' },
  header: { height: 60, paddingHorizontal: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  headerBack: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontWeight: '600', fontSize: 18, color: '#273054' }
});
