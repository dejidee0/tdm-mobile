import { createAIProject, generateAIImage, generateAIVideo, uploadRoomImage } from '@/services/api';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#1A2138',
  textHeader: '#1A2138',
  textSubHeader: '#7B809A',
  white: '#FFFFFF',
  inputBg: '#FFFFFF',
  shadow: '#000000',
  accent: '#263A63',
  inactive: '#9AA3A7',
};

export default function AIHomeScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [outputType, setOutputType] = useState<number>(2); // 2 = Video (default)
  const [contextLabel, setContextLabel] = useState<string>('');
  const [durationSeconds, setDurationSeconds] = useState<number>(9);

  const handlePickImage = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permission needed', 'Please allow media access to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
    });
    
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      setIsUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', {
          uri: asset.uri,
          name: asset.fileName || 'image.jpg',
          type: asset.mimeType || 'image/jpeg',
        } as any);

        const res = await uploadRoomImage(formData);
        if (res.ok) {
           const finalUrl = res.data?.imageUrl || res.data?.image || res.data?.url || res.data?.data?.imageUrl || res.data?.data?.url || res.data;
           const resolved = typeof finalUrl === 'string' ? finalUrl : finalUrl?.url || finalUrl?.fileUrl || '';
           setImageUrl(resolved);
           Alert.alert('Upload successful', 'Image attached to prompt!');
        } else {
           Alert.alert('Upload Failed', 'Could not upload image.');
        }
      } catch {
        Alert.alert('Upload Error', 'Something went wrong.');
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleGenerate = async () => {
    // QA validations: require uploaded image and prompt
    if (!imageUrl) {
      Alert.alert('Missing image', 'Please upload a source image before generating.');
      return;
    }
    if (!prompt.trim()) {
      Alert.alert('Missing prompt', 'Please enter a prompt to generate from.');
      return;
    }

    setIsGenerating(true);
    try {
      // 1. Create project
      const createRes = await createAIProject({
        sourceImageUrl: imageUrl,
        outputType,
        prompt,
        contextLabel: contextLabel || undefined,
      });

      if (!createRes.ok) {
        const msg = createRes.data?.message || 'Failed to create AI project';
        Alert.alert('Project Error', msg);
        return;
      }

      const project = createRes.data || createRes.data?.data || {};
      const projectId = project.id || project.projectId || (project.data && project.data.id);
      if (!projectId) {
        Alert.alert('Project Error', 'Could not read project id from response.');
        return;
      }

      // 2. Generate
      if (outputType === 1) {
        const genRes = await generateAIImage({ projectId });
        if (!genRes.ok) {
          const message = genRes.data?.message || 'Image generation failed.';
          Alert.alert('Generation Error', message);
          return;
        }
        Alert.alert('Generation started', 'Image generation completed.');
      } else {
        const genRes = await generateAIVideo({ projectId, durationSeconds });
        if (!genRes.ok) {
          const data = genRes.data || {};
          const message = data.message || data?.error || 'Video generation failed.';
          if (data.code === 'subscription_quota_exceeded') {
            Alert.alert('Quota exceeded', message);
          } else {
            Alert.alert('Generation Error', message);
          }
          return;
        }
        Alert.alert('Generation started', 'Video generation completed.');
      }

      // Navigate to designs list (refresh will pick up new project)
      router.push('/(ai)/designs');
    } catch (err) {
      console.error('[AI] generate error', err);
      Alert.alert('Error', 'AI generation failed.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!user ? (
        <View style={styles.guestSection}>
          <View style={styles.guestCenter}>
            <View style={styles.guestIconWrap}>
              <Ionicons name="lock-closed" size={48} color="#273054" />
            </View>
            <Text style={styles.guestTitle}>Sign in to continue</Text>
            <Text style={styles.guestSubTitle}>Access AI-powered design tools, save projects, and manage your estimates.</Text>
            <TouchableOpacity style={styles.loginBtn} onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginBtnText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signupBtn} onPress={() => router.push('/(auth)/register')}>
              <Text style={styles.signupBtnText}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.header}>
              <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color={COLORS.primary} />
              </TouchableOpacity>
              <Text style={styles.greeting}>Hey, {user.name ? user.name.split(' ')[0] : 'there'}.</Text>
              <Text style={styles.subGreeting}>What shall we build today?</Text>
            </View>

            {/* Output controls */}
            <View style={styles.controlsRow}>
              <View style={styles.outputToggle}>
                <TouchableOpacity
                  onPress={() => setOutputType(2)}
                  style={[styles.outputButton, outputType === 2 && styles.outputActive]}
                >
                  <Text style={outputType === 2 ? styles.outputActiveText : styles.outputText}>Video</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setOutputType(1)}
                  style={[styles.outputButton, outputType === 1 && styles.outputActive]}
                >
                  <Text style={outputType === 1 ? styles.outputActiveText : styles.outputText}>Image</Text>
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="Room label (optional)"
                placeholderTextColor="#9AA3A7"
                style={styles.contextInput}
                value={contextLabel}
                onChangeText={setContextLabel}
              />

              {outputType === 2 && (
                <TextInput
                  placeholder="Duration (s)"
                  placeholderTextColor="#9AA3A7"
                  keyboardType="numeric"
                  style={styles.durationInput}
                  value={String(durationSeconds)}
                  onChangeText={(t) => setDurationSeconds(Number(t) || 9)}
                />
              )}
            </View>

            {/* Recent Generations Card */}
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => router.push('/(ai)/designs')}
            >
              <Image
                source={require("@/assets/images/ai-chatbot.png")}
                style={styles.cardImage}
                contentFit="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.4)']}
                style={styles.cardOverlay}
              >
                <Text style={styles.cardLabel}>RECENT GENERATIONS</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>

          {/* Floating Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TouchableOpacity style={styles.addIcon} onPress={handlePickImage} disabled={isUploading}>
                {isUploading ? <ActivityIndicator size="small" color="#4A5568" /> : (
                  <Ionicons name={imageUrl ? "checkmark-circle" : "add"} size={24} color={imageUrl ? "#38A169" : "#4A5568"} />
                )}
              </TouchableOpacity>
              <TextInput
                placeholder="Ask anything..."
                placeholderTextColor="#718096"
                style={styles.input}
                value={prompt}
                onChangeText={setPrompt}
                editable={!isGenerating}
                onSubmitEditing={handleGenerate}
                returnKeyType="send"
              />
              <TouchableOpacity 
                style={styles.sendButton} 
                onPress={handleGenerate}
                disabled={isGenerating || !prompt.trim() || !imageUrl}
              >
                {isGenerating ? (
                  <ActivityIndicator color={COLORS.white} size="small" />
                ) : (
                  <Ionicons name="arrow-up" size={20} color={COLORS.white} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 200,
  },
  header: {
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    marginBottom: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 48,
    fontWeight: '800',
    color: '#2D3748',
    letterSpacing: -1,
  },
  subGreeting: {
    fontSize: 48,
    fontWeight: '600',
    color: '#8289A5',
    lineHeight: 52,
    letterSpacing: -1,
  },
  toolsSection: {
    marginTop: 40,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 20,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  toolCard: {
    width: (width - 64) / 2,
    backgroundColor: '#F7FAFC',
    padding: 20,
    borderRadius: 24,
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#EDF2F7',
  },
  toolIconWrapper: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4A5568',
    textAlign: 'center',
  },
  selector: {
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 28,
    borderRadius: 40,
    alignSelf: 'flex-start',
    marginBottom: 50,
  },
  selectorText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
    marginRight: 10,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 18,
  },
  outputToggle: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 4,
  },
  outputButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  outputActive: {
    backgroundColor: COLORS.primary,
  },
  outputText: {
    color: '#374151',
    fontWeight: '600',
  },
  outputActiveText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  contextInput: {
    flex: 1,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    color: COLORS.textHeader,
  },
  durationInput: {
    width: 86,
    backgroundColor: '#F7FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    color: COLORS.textHeader,
    textAlign: 'center',
  },
  cardContainer: {
    width: '100%',
    height: 240,
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#F7FAFC',
  },
  cardImage: {
    width: '100%',
    height: '100%',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    padding: 24,
  },
  cardLabel: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 120,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  inputWrapper: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 72,
    borderRadius: 20,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
  addIcon: {
    marginRight: 16,
  },
  input: {
    flex: 1,
    fontSize: 19,
    color: COLORS.textHeader,
    fontWeight: '400',
  },
  sendButton: {
    backgroundColor: COLORS.primary,
    width: 44,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    height: 100,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: '#F7FAFC',
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
    fontSize: 12,
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
  guestSection: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: '#F7FAFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  guestCenter: {
    alignItems: 'center',
    width: '100%',
  },
  guestIcon: {
    width: 80,
    height: 80,
    marginBottom: 20,
    opacity: 0.8,
    tintColor: '#273054',
  },
  guestIconWrap: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#EDF2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#273054',
    marginBottom: 12,
    textAlign: 'center',
  },
  guestSubTitle: {
    fontSize: 16,
    color: '#7B809A',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#1A2138',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  loginBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  signupBtn: {
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  signupBtnText: {
    color: '#1A2138',
    fontSize: 16,
    fontWeight: '600',
  },
});
