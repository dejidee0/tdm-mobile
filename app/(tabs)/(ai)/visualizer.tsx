import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#1A2138',
  white: '#FFFFFF',
  textHeader: '#11181C',
  textSubHeader: '#7B818C',
  accent: '#263A63',
  inactive: '#9AA3A7',
  border: '#E2E8F0',
};

export default function AIVisualizerScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
        <Text style={styles.navTitle}>AI Visualizer</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical" size={24} color={COLORS.textHeader} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Page Title */}
        <View style={styles.titleSection}>
          <Text style={styles.title}>Nordic Living</Text>
          <Text style={styles.subtitle}>Renovation Simulation v2.4</Text>
        </View>

        {/* Split View Comparison */}
        <View style={styles.comparisonContainer}>
          <View style={styles.splitView}>
            <View style={styles.leftView}>
              <Image
                source="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop"
                style={styles.comparisonImage}
              />
              <View style={styles.tagEconomic}>
                <Text style={styles.tagTextSmall}>ECONOMIC</Text>
              </View>
              <TouchableOpacity style={styles.viewMaterialBtn}>
                <Text style={styles.viewMaterialText}>View Material</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rightView}>
              <Image
                source="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=600&auto=format&fit=crop"
                style={styles.comparisonImage}
              />
              <View style={styles.tagLuxury}>
                <Text style={styles.tagTextSmall}>LUXURY</Text>
              </View>
              <TouchableOpacity style={[styles.viewMaterialBtn, { backgroundColor: COLORS.white }]}>
                <Text style={[styles.viewMaterialText, { color: COLORS.accent }]}>View Material</Text>
              </TouchableOpacity>
            </View>
            {/* Slider Handle */}
            <View style={styles.sliderHandle}>
              <Ionicons name="chevron-back" size={12} color={COLORS.accent} />
              <Ionicons name="chevron-forward" size={12} color={COLORS.accent} />
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <TouchableOpacity style={styles.downloadBtn}>
          <Text style={styles.downloadBtnText}>Download High-Res</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.contactBtn}>
          <Ionicons name="chatbubble-outline" size={20} color={COLORS.accent} style={{marginRight: 8}} />
          <Text style={styles.contactBtnText}>Contact Designer</Text>
        </TouchableOpacity>

        {/* AI Metrics Card */}
        <View style={styles.metricsCard}>
          <View>
            <Text style={styles.metricLabel}>AI INTEGRITY</Text>
            <View style={styles.metricValueRow}>
              <Text style={styles.metricValue}>98.4%</Text>
              <Text style={styles.metricSubValue}>High Fidelity</Text>
            </View>
          </View>
          <View style={styles.integrityIcon}>
            <Ionicons name="checkmark-seal-outline" size={24} color={COLORS.accent} />
          </View>
        </View>

        {/* Material Blend Card */}
        <View style={styles.blendCard}>
          <View style={styles.blendHeader}>
            <View>
              <Text style={styles.blendLabel}>MATERIAL BLEND</Text>
              <Text style={styles.blendTitle}>Luxury vs Economy</Text>
            </View>
            <Text style={styles.blendPercent}>70%</Text>
          </View>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: '70%' }]} />
          </View>
          <View style={styles.blendFooter}>
            <Text style={styles.blendFooterText}>OAK & MARBLE</Text>
            <Text style={styles.blendFooterText}>COMPOSITE</Text>
          </View>
        </View>

        {/* Lighting Status */}
        <View style={styles.lightingCard}>
          <View style={styles.lightingIconWrapper}>
            <Ionicons name="sunny-outline" size={24} color={COLORS.textHeader} />
          </View>
          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={styles.lightingTitle}>Ray-Traced Lighting</Text>
            <Text style={styles.lightingSubtitle}>Global illumination active</Text>
          </View>
          <View style={styles.activeBadge}>
            <Text style={styles.activeBadgeText}>ACTIVE</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 60,
  },
  navTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 120,
  },
  titleSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSubHeader,
    marginTop: 4,
  },
  comparisonContainer: {
    width: '100%',
    height: 420,
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 20,
  },
  splitView: {
    flexDirection: 'row',
    flex: 1,
  },
  leftView: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: 'rgba(255,255,255,0.3)',
  },
  rightView: {
    flex: 1,
  },
  comparisonImage: {
    width: '100%',
    height: '100%',
  },
  tagEconomic: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255,255,255,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagLuxury: {
    position: 'absolute',
    top: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  tagTextSmall: {
    fontSize: 10,
    fontWeight: '900',
    color: COLORS.white,
    letterSpacing: 1,
  },
  viewMaterialBtn: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: COLORS.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  viewMaterialText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  sliderHandle: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -15,
    marginTop: -20,
    width: 30,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  downloadBtn: {
    backgroundColor: COLORS.accent,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  downloadBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactBtn: {
    backgroundColor: COLORS.white,
    height: 60,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 24,
  },
  contactBtnText: {
    color: COLORS.accent,
    fontSize: 16,
    fontWeight: 'bold',
  },
  metricsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.accent,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  metricLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 4,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.textHeader,
  },
  metricSubValue: {
    fontSize: 14,
    color: COLORS.textSubHeader,
    marginLeft: 8,
  },
  integrityIcon: {
    backgroundColor: '#F0F4F8',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blendCard: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  blendHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  blendLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.textSubHeader,
    letterSpacing: 1,
  },
  blendTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.textHeader,
    marginTop: 4,
  },
  blendPercent: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.accent,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#EDF2F7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.accent,
  },
  blendFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  blendFooterText: {
    fontSize: 11,
    fontWeight: '700',
    color: COLORS.accent,
  },
  lightingCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  lightingIconWrapper: {
    backgroundColor: COLORS.white,
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightingTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.textHeader,
  },
  lightingSubtitle: {
    fontSize: 13,
    color: COLORS.textSubHeader,
    marginTop: 2,
  },
  activeBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeBadgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: '900',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: 90,
    paddingBottom: 25,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
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
