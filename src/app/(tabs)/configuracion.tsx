import AsyncStorage from '@react-native-async-storage/async-storage'
import Constants from 'expo-constants'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Brand } from '@/constants/theme'
import { BrandHeader } from '@/components/brand-header'
import {
  clearRadioUrlOverride,
  fetchRemoteURLs,
  getRadioUrlOverride,
  resolveRadioUrl,
  setRadioUrlOverride,
} from '@/hooks/fetch-firebasedata'
import i18n, { LANGUAGE_KEY, type AppLanguage } from '@/i18n'

const ADVANCED_UNLOCK_TAPS = 7
const APP_VERSION = Constants.expoConfig?.version ?? ''

export default function ConfiguracionScreen() {
  const { t } = useTranslation()
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const [currentLanguage, setCurrentLanguage] = useState<AppLanguage>(
    i18n.language as AppLanguage,
  )
  const [advancedUnlocked, setAdvancedUnlocked] = useState(false)
  const [remoteRadioUrl, setRemoteRadioUrl] = useState<string | null>(null)
  const [radioUrlOverride, setRadioUrlOverrideState] = useState<string | null>(null)
  const [draftRadioUrl, setDraftRadioUrl] = useState('')
  const unlockTapCountRef = useRef(0)

  const resolvedRadioUrl = resolveRadioUrl(radioUrlOverride, remoteRadioUrl)

  const loadRadioSettings = useCallback(async () => {
    const [override, remoteUrls] = await Promise.all([
      getRadioUrlOverride(),
      fetchRemoteURLs().catch(() => null),
    ])

    setRadioUrlOverrideState(override)
    if (remoteUrls) {
      setRemoteRadioUrl(remoteUrls.url_radio)
    }

    const resolved = resolveRadioUrl(override, remoteUrls?.url_radio)
    setDraftRadioUrl(resolved)
  }, [])

  useEffect(() => {
    loadRadioSettings().catch((err) => {
      console.error('[Config] Failed to load radio settings:', err)
    })
  }, [loadRadioSettings])

  async function handleLanguageChange(lang: AppLanguage) {
    if (lang === currentLanguage) return
    setCurrentLanguage(lang)
    await i18n.changeLanguage(lang)
    await AsyncStorage.setItem(LANGUAGE_KEY, lang)
  }

  function handleLanguageTitlePress() {
    unlockTapCountRef.current += 1
    if (unlockTapCountRef.current >= ADVANCED_UNLOCK_TAPS) {
      setAdvancedUnlocked(true)
      unlockTapCountRef.current = 0
    }
  }

  async function handleSaveRadioUrl() {
    const trimmed = draftRadioUrl.trim()
    if (!trimmed) return

    await setRadioUrlOverride(trimmed)
    setRadioUrlOverrideState(trimmed)
  }

  async function handleResetRadioUrl() {
    await clearRadioUrlOverride()
    setRadioUrlOverrideState(null)
    setDraftRadioUrl(resolveRadioUrl(null, remoteRadioUrl))
  }

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
      <BrandHeader title={t('config.title')} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SafeAreaView edges={['bottom']}>
          {/* Language section */}
          <View style={[styles.section, isDark && styles.sectionDark]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.iconCircle, { backgroundColor: Brand.primarySurface }]}>
                <Image
                  source={require('@/assets/IconoIdioma.png')}
                  style={styles.sectionIcon}
                  resizeMode="contain"
                />
              </View>
              <Pressable style={styles.sectionTitleBlock} onPress={handleLanguageTitlePress}>
                <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
                  {t('config.languageTitle')} --- {currentLanguage}
                </Text>
                <Text style={[styles.sectionSub, isDark && styles.textMuted]}>
                  {t('config.languageSubtitle')}
                </Text>
              </Pressable>
            </View>

            <View style={[styles.optionGroup, isDark && styles.optionGroupDark]}>
              <TouchableOpacity
                style={[
                  styles.option,
                  currentLanguage === 'castellano' && styles.optionActive,
                  isDark && styles.optionDark,
                ]}
                onPress={() => handleLanguageChange('castellano')}
                activeOpacity={0.8}
              >
                <View style={styles.optionLeft}>
                  <Text style={[styles.optionLabel, isDark && styles.textLight]}>
                    {t('config.castellano')}
                  </Text>
                </View>
                <View
                  style={[styles.radio, currentLanguage === 'castellano' && styles.radioActive]}
                >
                  {currentLanguage === 'castellano' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>

              <View style={[styles.optionSeparator, isDark && styles.optionSeparatorDark]} />

              <TouchableOpacity
                style={[
                  styles.option,
                  currentLanguage === 'tseltal' && styles.optionActive,
                  isDark && styles.optionDark,
                ]}
                onPress={() => handleLanguageChange('tseltal')}
                activeOpacity={0.8}
              >
                <View style={styles.optionLeft}>
                  <Text style={[styles.optionLabel, isDark && styles.textLight]}>
                    {t('config.tseltal')}
                  </Text>
                </View>
                <View style={[styles.radio, currentLanguage === 'tseltal' && styles.radioActive]}>
                  {currentLanguage === 'tseltal' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {advancedUnlocked && (
            <View style={[styles.section, isDark && styles.sectionDark]}>
              <View style={styles.sectionHeader}>
                <View style={[styles.iconCircle, { backgroundColor: Brand.primarySurface }]}>
                  <Text style={styles.wifiEmoji}>📡</Text>
                </View>
                <View style={styles.sectionTitleBlock}>
                  <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
                    {t('config.advancedTitle')}
                  </Text>
                  <Text style={[styles.sectionSub, isDark && styles.textMuted]}>
                    {t('config.advancedSubtitle')}
                  </Text>
                </View>
              </View>

              <Text style={[styles.advancedHint, isDark && styles.textMuted]}>
                {t('config.advancedHint')}
              </Text>

              <View style={[styles.urlBox, isDark && styles.urlBoxDark]}>
                <Text style={[styles.urlLabel, isDark && styles.textMuted]}>
                  {t('config.advancedCurrentUrl')}
                </Text>
                <Text style={[styles.urlValue, isDark && styles.textLight]} selectable>
                  {resolvedRadioUrl}
                </Text>
              </View>

              <Text style={[styles.versionLabel, isDark && styles.textMuted]}>
                v{APP_VERSION}
              </Text>

              <TextInput
                style={[styles.urlInput, isDark && styles.urlInputDark]}
                value={draftRadioUrl}
                onChangeText={setDraftRadioUrl}
                placeholder={t('config.advancedPlaceholder')}
                placeholderTextColor={isDark ? '#5A7280' : '#9AB0B8'}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
              />

              <View style={styles.advancedActions}>
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={handleSaveRadioUrl}
                  activeOpacity={0.85}
                >
                  <Text style={styles.saveButtonText}>{t('config.advancedSave')}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.resetButton, isDark && styles.resetButtonDark]}
                  onPress={handleResetRadioUrl}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.resetButtonText, isDark && styles.textLight]}>
                    {t('config.advancedReset')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FBFC' },
  containerDark: { backgroundColor: '#111416' },
  scrollContent: { padding: 20, gap: 16, paddingBottom: 40 },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 20,
    gap: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 14,
  },
  sectionDark: { backgroundColor: '#1E2427', shadowOpacity: 0 },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionIcon: { width: 32, height: 32, tintColor: Brand.primary },
  wifiEmoji: { fontSize: 22 },
  sectionTitleBlock: { flex: 1, gap: 2 },
  sectionTitle: { fontSize: 17, fontWeight: '700', color: '#1A2A30' },
  sectionSub: { fontSize: 13, color: '#7A9098' },
  optionGroup: {
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E0EBF0',
    overflow: 'hidden',
  },
  optionGroupDark: { borderColor: '#2A3A3E' },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FAFCFD',
  },
  optionDark: { backgroundColor: '#1A2225' },
  optionActive: { backgroundColor: Brand.primarySurface },
  optionLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  optionFlag: { fontSize: 22 },
  optionLabel: { fontSize: 16, fontWeight: '600', color: '#1A2A30' },
  optionHint: { fontSize: 12, color: '#7A9098', marginTop: 1 },
  optionSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0EBF0',
    marginHorizontal: 16,
  },
  optionSeparatorDark: { backgroundColor: '#2A3A3E' },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#C0D0D5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: Brand.primary },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Brand.primary,
  },
  textLight: { color: '#D8E8EC' },
  textMuted: { color: '#5A7280' },
  advancedHint: { fontSize: 13, color: '#7A9098', lineHeight: 19 },
  versionLabel: { fontSize: 12, color: '#7A9098', textAlign: 'right' },
  urlBox: {
    backgroundColor: '#FAFCFD',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0EBF0',
    padding: 14,
    gap: 6,
  },
  urlBoxDark: { backgroundColor: '#1A2225', borderColor: '#2A3A3E' },
  urlLabel: { fontSize: 12, fontWeight: '600', color: '#7A9098' },
  urlValue: { fontSize: 13, color: '#1A2A30', lineHeight: 18 },
  urlInput: {
    borderWidth: 1.5,
    borderColor: '#E0EBF0',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1A2A30',
    backgroundColor: '#FFFFFF',
  },
  urlInputDark: {
    borderColor: '#2A3A3E',
    backgroundColor: '#1A2225',
    color: '#D8E8EC',
  },
  advancedActions: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Brand.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  saveButtonText: {
    color: Brand.white,
    fontSize: 15,
    fontWeight: '700',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#FAFCFD',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0EBF0',
  },
  resetButtonDark: {
    backgroundColor: '#1A2225',
    borderColor: '#2A3A3E',
  },
  resetButtonText: {
    color: '#1A2A30',
    fontSize: 15,
    fontWeight: '600',
  },
  infoNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#E0EBF0',
  },
  infoNoteDark: { backgroundColor: '#1E2427', borderColor: '#2A3A3E' },
  infoIcon: { fontSize: 16 },
  infoText: { flex: 1, fontSize: 13, color: '#5A7A84', lineHeight: 19 },
})
