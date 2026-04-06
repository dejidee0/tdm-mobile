import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCart } from '../../context/CartContext';

function parsePrice(v: any) {
  if (!v) return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const n = v.replace(/[^0-9.]/g, '');
    return parseFloat(n) || 0;
  }
  if (v.price) return parsePrice(v.price);
  return 0;
}

interface CartItemSwipeProps {
  item: any;
  onDelete: () => void;
}

function CartItemSwipe({ item, onDelete }: CartItemSwipeProps) {
  const translateX = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate((event) => {
      if (event.translationX < 0) {
        translateX.value = Math.max(event.translationX, -80);
      }
    })
    .onEnd(() => {
      if (translateX.value < -40) {
        translateX.value = withSpring(-80);
      } else {
        translateX.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const resetSwipe = () => {
    translateX.value = withSpring(0);
  };

  return (
    <View style={styles.swipeContainer}>
      <View style={styles.deleteAction}>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => {
            resetSwipe();
            onDelete();
          }}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <ThemedText style={styles.deleteText}>Delete</ThemedText>
        </TouchableOpacity>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyle]}>
          <View style={styles.card}>
            <Image
              source={
                typeof item.product?.image === 'string'
                  ? { uri: item.product.image }
                  : item.product?.image ?? require('@/assets/images/products/chair1.jpg')
              }
              style={styles.thumb}
            />
            <View style={styles.itemDetails}>
              <ThemedText style={styles.itemTitle} numberOfLines={1}>{item.productName}</ThemedText>
              <ThemedText style={styles.itemDelivery}>Est: {item.deliveryEstimate ?? '15 working days'}</ThemedText>
            </View>
            <ThemedText style={styles.itemPrice}>{`N${(parsePrice(item.unitPrice * item.quantity) || 0).toFixed(2)}`}</ThemedText>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export default function CartScreen() {
  const router = useRouter();
  const { cart, items, fetchCart, removeItem } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <GestureHandlerRootView style={styles.safe}>
      <SafeAreaView style={styles.safe}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.headerBack}>
            <Ionicons name="chevron-back" size={28} color="#273054" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>Cart</ThemedText>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.container}>
        {items && items.length ? (
          <>
            <FlatList
              data={items}
              keyExtractor={(i: any) => i.id ?? String(i.product?.id ?? Math.random())}
              renderItem={({ item }) => <CartItemSwipe item={item} onDelete={() => {
                const id = item.id ?? item.itemId ?? item.cartItemId ?? item.product?.id;
                if (!id) return Alert.alert('Unable to remove item', 'Item id not found');
                Alert.alert('Remove item', 'Remove this item from your cart?', [
                  { text: 'Cancel', style: 'cancel' },
                  {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: async () => {
                      try {
                        await removeItem(String(id));
                      } catch (e) {
                        console.warn('removeItem failed', e);
                        fetchCart();
                      }
                    },
                  },
                ]);
              }} />}
            />

            {/* Total Row */}
            <View style={styles.totalRow}>
              <View>
                <ThemedText style={styles.totalLabel}>Subtotal:</ThemedText>
                <ThemedText style={styles.totalPrice}>
                  N{(
                    (cart?.subTotal ?? items.reduce((s: number, it: any) => s + (parsePrice((it.unitPrice ?? it.price) as any) * (it.quantity ?? 1)), 0)) as number
                  ).toFixed(2)}
                </ThemedText>
                <ThemedText style={styles.deliveryNote}>Delivery exclusive</ThemedText>
              </View>

              <TouchableOpacity style={styles.checkoutBtn} onPress={() => router.push('/checkout')} activeOpacity={0.8}>
                <ThemedText style={styles.checkoutText}>Checkout</ThemedText>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={{ padding: 20, alignItems: 'center' }}>
            <ThemedText style={{ color: '#999' }}>Your cart is empty, add items to get started.</ThemedText>
          </View>
        )}
      </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerBack: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    fontSize: 18,
    color: '#273054',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'flex-start',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    zIndex: 1,
    position: 'relative',
  },
  thumb: {
    width: 100,
    height: 100,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  itemDetails: {
    flex: 1,
    gap: 6,
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#273054',
  },
  itemDelivery: {
    fontSize: 12,
    color: '#999',
  },
  itemPrice: {
    fontWeight: '900',
    fontSize: 14,
    color: '#273054',
  },
  swipeContainer: {
    marginBottom: 20,
    overflow: 'hidden',
    borderRadius: 12,
    position: 'relative',
  },
  deleteAction: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 80,
    backgroundColor: '#ff4d4f',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  deleteBtn: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  deleteText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 14,
    marginTop: 24,
  },
  totalLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  totalPrice: {
    fontWeight: '900',
    fontSize: 20,
    color: '#273054',
    marginBottom: 4,
  },
  deliveryNote: {
    fontSize: 11,
    color: '#999',
  },
  checkoutBtn: {
    backgroundColor: '#273054',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#273054',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 14,
  },
});
