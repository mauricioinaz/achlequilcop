import { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { BrandHeader } from '@/components/brand-header'
import { Brand } from '@/constants/theme'
import { sayTseltal } from '@mauricioinaz/say-tseltal'

export default function AprenderScreen() {
  const { t } = useTranslation()
  const [input, setInput] = useState('')
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const numValue = parseInt(input, 10)
  let tseltalNumber: string | null = null
  let tseltalError: string | null = null
  if (input.length > 0 && !isNaN(numValue)) {
    try {
      tseltalNumber = sayTseltal(numValue)
    } catch (e: any) {
      tseltalError = e.message
    }
  }
  const hasResult = input.length > 0

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
      <BrandHeader title={t('aprender.title')} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.section}>
          <Text style={[styles.sectionSub, isDark && styles.textMuted]}>
            {t('aprender.subtitle')}
          </Text>

          <View style={[styles.inputCard, isDark && styles.inputCardDark]}>
            <TextInput
              style={[styles.numberInput, isDark && styles.numberInputDark]}
              value={input}
              onChangeText={(text) => setInput(text.replace(/[^0-9]/g, ''))}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={isDark ? '#3A5058' : '#C8D8DC'}
            />
          </View>

          <View style={[styles.inputCard, isDark && styles.inputCardDark]}>
            {hasResult ? (
              tseltalNumber ? (
                <Text style={styles.tseltalWord}>{tseltalNumber}</Text>
              ) : tseltalError ? (
                <Text style={[styles.outOfRange, isDark && styles.textMuted]}>
                  {tseltalError}
                </Text>
              ) : (
                <Text style={[styles.outOfRange, isDark && styles.textMuted]}>
                  {t('aprender.invalidNumber')}
                </Text>
              )
            ) : (
              <Text style={[styles.placeholder, isDark && styles.textMuted]}>--</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FBFC' },
  containerDark: { backgroundColor: '#111416' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  section: { gap: 14 },
  sectionSub: { fontSize: 13, color: '#7A9098' },
  textMuted: { color: '#5A7280' },
  inputCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    gap: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    borderWidth: 1.5,
    borderColor: '#D8EDF0',
  },
  inputCardDark: {
    backgroundColor: '#1E2427',
    borderColor: '#2A3A3E',
    shadowOpacity: 0,
  },
  numberInput: {
    fontSize: 64,
    fontWeight: '800',
    color: Brand.primary,
    textAlign: 'center',
    width: '100%',
    paddingVertical: 0,
  },
  numberInputDark: { color: Brand.primaryLight },
  tseltalWord: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1A2A30',
    letterSpacing: 1,
    textAlign: 'center',
  },
  placeholder: {
    fontSize: 18,
    color: '#A8BEC4',
    fontStyle: 'italic',
  },
  outOfRange: {
    fontSize: 15,
    color: '#A8BEC4',
    fontStyle: 'italic',
  },
})
