import { useAuth } from '@/context/AuthContext';
import { getAIProjects } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#D4AF37',
  bannerBg: '#252523',
  white: '#FFFFFF',
  textHeader: '#D4AF37',
  textSubHeader: '#8e98a9',
  tagBg: '#494845',
  accent: '#D4AF37',
  inactive: '#9AA3A7',
};

const CATEGORIES = ['All', 'Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Office'];

export default function AIDesignsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = React.useState(true);
  const [designs, setDesigns] = React.useState<any[]>([]);
  const [activeCategory, setActiveCategory] = React.useState('All');

  const fetchDesigns = React.useCallback(async () => {
    setLoading(true);
    try {
      console.log('[AIDesigns] Fetching AI projects...');
      const res = await getAIProjects();
      console.log('[AIDesigns] Response:', JSON.stringify(res, null, 2));

      if (res.ok && res.data) {
        // API returns an array of projects
        const data = Array.isArray(res.data) ? res.data : (res.data.items || res.data.data || []);
        setDesigns(data);
      }
    } catch (err) {
      console.error('[AIDesigns] Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchDesigns();
  }, [fetchDesigns]);

  const filteredDesigns = activeCategory === 'All' 
    ? designs 
    : designs.filter(d => d.category === activeCategory || d.roomType === activeCategory);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={COLORS.textHeader} />
          </TouchableOpacity>
          <Text style={styles.title}>Welcome back, {user?.name?.split(' ')[0] || user?.firstName || 'Guest'}</Text>
          <Text style={styles.subtitle}>Your vision, powered by artificial intelligence.</Text>
        </View>

        {/* Subscription Banner */}
        <View style={styles.banner}>
          <LinearGradient
            colors={['#354475', '#2A365F']}
            style={styles.bannerGradient}
          >
            <View style={styles.bannerTop}>
              <Text style={styles.bannerTitle}>Go Pro for Unlimited Designs</Text>
              <Text style={styles.bannerText}>
                Access premium styles, 4K rendering, and priority AI processing.
              </Text>
            </View>
            <TouchableOpacity style={styles.upgradeButton}>
              <Text style={styles.upgradeText}>Upgrade Now</Text>
            </TouchableOpacity>
            <View style={styles.starIcon}>
              <Ionicons name="sparkles" size={60} color="rgba(255,255,255,0.1)" />
            </View>
          </LinearGradient>
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setActiveCategory(cat)}
              style={[
                styles.categoryTag,
                activeCategory === cat && styles.activeTag,
              ]}
            >
              <Text
                style={[
                  styles.categoryText,
                  activeCategory === cat && styles.activeTagText,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Designs List */}
        <View style={styles.designsList}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 40 }} />
          ) : filteredDesigns.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 60 }}>
              <Ionicons name="images-outline" size={64} color={COLORS.tagBg} />
              <Text style={{ marginTop: 16, color: COLORS.textSubHeader, fontWeight: '600' }}>No designs found</Text>
            </View>
          ) : (
            filteredDesigns.map((item) => (
              <View key={item.id} style={styles.designCard}>
                <View style={styles.imageWrapper}>
                  <Image source={item.imageUrl || item.image || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0'} style={styles.designImage} contentFit="cover" />
                  <View style={styles.categoryBadge}>
                    <Text style={styles.categoryBadgeText}>{item.category || item.roomType || 'DESIGN'}</Text>
                  </View>
                </View>
                <View style={styles.cardInfo}>
                  <View style={styles.titleRow}>
                    <View>
                      <Text style={styles.cardTitle}>{item.title || item.name || 'AI Concept'}</Text>
                      <Text style={styles.cardTime}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'Just now'}</Text>
                    </View>
                  </View>
                  <View style={styles.actions}>
                    <View style={styles.leftActions}>
                      <TouchableOpacity style={styles.actionIcon}>
                        <Ionicons name="pencil" size={20} color={COLORS.accent} />
                      </TouchableOpacity>
                      <TouchableOpacity style={[styles.actionIcon, { marginLeft: 12 }]}>
                        <Ionicons name="download-outline" size={20} color={COLORS.accent} />
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.actionIcon}>
                      <Ionicons name="share-social-outline" size={20} color={COLORS.accent} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  header: {
    marginTop: 10,
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#494845',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.textHeader,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSubHeader,
    marginTop: 4,
  },
  banner: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 30,
  },
  bannerGradient: {
    padding: 24,
    height: 180,
    justifyContent: 'space-between',
  },
  bannerTop: {
    flex: 1,
  },
  bannerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  bannerText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
    width: '70%',
    lineHeight: 20,
  },
  upgradeButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  upgradeText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  starIcon: {
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  filterScroll: {
    marginBottom: 24,
  },
  categoryTag: {
    backgroundColor: '#494845',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    marginRight: 10,
  },
  activeTag: {
    backgroundColor: COLORS.accent,
  },
  categoryText: {
    color: COLORS.textSubHeader,
    fontWeight: '600',
    fontSize: 16,
  },
  activeTagText: {
    color: COLORS.white,
  },
  designsList: {
    gap: 20,
  },
  designCard: {
    backgroundColor: '#252523',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  imageWrapper: {
    width: '100%',
    height: 200,
  },
  designImage: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: '#252523',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.textHeader,
  },
  cardInfo: {
    padding: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  cardTime: {
    fontSize: 13,
    color: COLORS.textSubHeader,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionIcon: {
    backgroundColor: '#494845',
    width: 42,
    height: 42,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#000000',
    height: 90,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabLabel: {
    fontSize: 11,
    marginTop: 4,
    fontWeight: '500',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: COLORS.accent,
    marginTop: 4,
  },
});
