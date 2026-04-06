import { createRenovationEstimate } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const COLORS = {
  primary: '#1A2138',
  accent: '#263A63',
  textHeader: '#1A2138',
  textSub: '#7B809A',
  bg: '#F7FAFC',
  white: '#FFFFFF',
  border: '#EDF2F7',
  success: '#2BB86B',
};

export default function AIEstimatorScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Form State
  const [formData, setFormData] = useState({
    projectName: '',
    roomType: 'Living Room',
    lengthMeters: '',
    widthMeters: '',
    heightMeters: '2.4',
    finishLevel: 'Premium',
    includeFlooring: true,
    includePainting: true,
    includeElectrical: false,
    includePlumbing: false,
    contingencyPercent: '10',
  });

  const ROOM_TYPES = ['Living Room', 'Kitchen', 'Bedroom', 'Bathroom', 'Office'];
  const FINISH_LEVELS = ['Standard', 'Premium', 'Luxury'];

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const validateForm = () => {
    if (!formData.projectName) return 'Project name is required';
    if (!formData.lengthMeters || isNaN(Number(formData.lengthMeters))) return 'Valid length is required';
    if (!formData.widthMeters || isNaN(Number(formData.widthMeters))) return 'Valid width is required';
    return null;
  };

  const handleGenerate = async () => {
    const error = validateForm();
    if (error) {
      Alert.alert('Required Fields', error);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        ...formData,
        lengthMeters: parseFloat(formData.lengthMeters),
        widthMeters: parseFloat(formData.widthMeters),
        heightMeters: parseFloat(formData.heightMeters),
        contingencyPercent: parseFloat(formData.contingencyPercent),
      };

      console.log('[AIEstimator] Sending request:', JSON.stringify(payload, null, 2));
      const res = await createRenovationEstimate(payload);
      console.log('[AIEstimator] Response:', JSON.stringify(res, null, 2));

      if (res.ok && res.data) {
        // Assume the response contains the estimateId
        const estimateId = res.data.id || res.data.estimateId;
        router.push({
          pathname: '/(ai)/detailed-estimate',
          params: { estimateId }
        });
      } else {
        throw new Error(res.data?.message || 'Failed to generate estimate');
      }
    } catch (err: any) {
      Alert.alert('Error', err.message || 'Something went wrong while generating your estimate.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>AI Renovation Estimator</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>New Project Estimate</Text>
        <Text style={styles.subtitle}>Enter your space details to get a professional grade BOQ and cost breakdown.</Text>

        {/* Project Name */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>PROJECT NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Master Bedroom Renovation"
            value={formData.projectName}
            onChangeText={(v) => handleInputChange('projectName', v)}
          />
        </View>

        {/* Room Type */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>ROOM TYPE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
            {ROOM_TYPES.map(type => (
              <TouchableOpacity
                key={type}
                style={[styles.chip, formData.roomType === type && styles.chipActive]}
                onPress={() => handleInputChange('roomType', type)}
              >
                <Text style={[styles.chipText, formData.roomType === type && styles.chipTextActive]}>{type}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Dimensions */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, { flex: 1 }]}>
            <Text style={styles.label}>LENGTH (M)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.0"
              keyboardType="numeric"
              value={formData.lengthMeters}
              onChangeText={(v) => handleInputChange('lengthMeters', v)}
            />
          </View>
          <View style={[styles.inputGroup, { flex: 1, marginLeft: 16 }]}>
            <Text style={styles.label}>WIDTH (M)</Text>
            <TextInput
              style={styles.input}
              placeholder="0.0"
              keyboardType="numeric"
              value={formData.widthMeters}
              onChangeText={(v) => handleInputChange('widthMeters', v)}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>CEILING HEIGHT (M)</Text>
          <TextInput
            style={styles.input}
            placeholder="2.4"
            keyboardType="numeric"
            value={formData.heightMeters}
            onChangeText={(v) => handleInputChange('heightMeters', v)}
          />
        </View>

        {/* Finish Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>FINISH LEVEL</Text>
          <View style={styles.levelsRow}>
            {FINISH_LEVELS.map(level => (
              <TouchableOpacity
                key={level}
                style={[styles.levelCard, formData.finishLevel === level && styles.levelCardActive]}
                onPress={() => handleInputChange('finishLevel', level)}
              >
                <Text style={[styles.levelText, formData.finishLevel === level && styles.levelTextActive]}>{level}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Inclusions */}
        <Text style={styles.sectionTitle}>WHAT TO INCLUDE</Text>
        <View style={styles.switchGroup}>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Flooring & Tiling</Text>
            <Switch
              value={formData.includeFlooring}
              onValueChange={(v) => handleInputChange('includeFlooring', v)}
              trackColor={{ true: COLORS.primary }}
            />
          </View>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Wall Painting & Finish</Text>
            <Switch
              value={formData.includePainting}
              onValueChange={(v) => handleInputChange('includePainting', v)}
              trackColor={{ true: COLORS.primary }}
            />
          </View>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Electrical & Lighting</Text>
            <Switch
              value={formData.includeElectrical}
              onValueChange={(v) => handleInputChange('includeElectrical', v)}
              trackColor={{ true: COLORS.primary }}
            />
          </View>
          <View style={styles.switchItem}>
            <Text style={styles.switchLabel}>Plumbing & Fixtures</Text>
            <Switch
              value={formData.includePlumbing}
              onValueChange={(v) => handleInputChange('includePlumbing', v)}
              trackColor={{ true: COLORS.primary }}
            />
          </View>
        </View>

        {/* Contingency */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>CONTINGENCY % (BUFFER)</Text>
          <TextInput
            style={styles.input}
            placeholder="10"
            keyboardType="numeric"
            value={formData.contingencyPercent}
            onChangeText={(v) => handleInputChange('contingencyPercent', v)}
          />
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.generateButton, loading && styles.buttonDisabled]} 
          onPress={handleGenerate}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <>
              <Text style={styles.generateButtonText}>Generate AI Estimate</Text>
              <Ionicons name="sparkles" size={18} color={COLORS.white} style={{ marginLeft: 8 }} />
            </>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: COLORS.bg,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.primary,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 120,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 15,
    color: COLORS.textSub,
    marginTop: 8,
    lineHeight: 22,
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.textSub,
    letterSpacing: 1,
    marginBottom: 10,
  },
  input: {
    backgroundColor: COLORS.bg,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipsRow: {
    gap: 10,
    paddingRight: 20,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    backgroundColor: COLORS.bg,
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
  chipActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  chipText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSub,
  },
  chipTextActive: {
    color: COLORS.white,
  },
  levelsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  levelCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
  levelCardActive: {
    backgroundColor: '#EBF4FF',
    borderColor: COLORS.accent,
  },
  levelText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textSub,
  },
  levelTextActive: {
    color: COLORS.accent,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.primary,
    marginTop: 8,
    marginBottom: 16,
  },
  switchGroup: {
    backgroundColor: COLORS.bg,
    borderRadius: 20,
    padding: 16,
    gap: 16,
    marginBottom: 24,
  },
  switchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switchLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.primary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
    paddingBottom: 40,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  generateButton: {
    backgroundColor: COLORS.primary,
    height: 64,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  generateButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
});
