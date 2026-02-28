import { useState } from 'react'
import {
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
import { sayTseltal } from '@mauricioinaz/say-tseltal'

const CATEGORIES = [
  { id: 'numbers', label: 'Números', emoji: '🔢' },
  { id: 'greetings', label: 'Saludos', emoji: '👋' },
  { id: 'nature', label: 'Naturaleza', emoji: '🌿' },
]

const GREETINGS: Array<{ spanish: string; tseltal: string }> = [
  { spanish: 'Buenos días', tseltal: "Lek awal te k'inal" },
  { spanish: 'Buenas tardes', tseltal: "Lek awal te ajk'ubal" },
  { spanish: 'Buenas noches', tseltal: "Lek awal te ak'ubal" },
  { spanish: '¿Cómo estás?', tseltal: "K'ux awutsil?" },
  { spanish: 'Estoy bien', tseltal: 'Lek jinutik' },
  { spanish: 'Gracias', tseltal: 'Kolawal' },
  { spanish: 'Por favor', tseltal: 'Sjalel' },
  { spanish: 'Sí / No', tseltal: "Jo'  /  Ma'" },
]

const NATURE: Array<{ spanish: string; tseltal: string }> = [
  { spanish: 'Agua', tseltal: "ja'" },
  { spanish: 'Tierra', tseltal: 'lum' },
  { spanish: 'Sol', tseltal: "k'inal" },
  { spanish: 'Luna', tseltal: "u'" },
  { spanish: 'Maíz', tseltal: 'ixim' },
  { spanish: 'Árbol', tseltal: "te'" },
  { spanish: 'Montaña', tseltal: 'wits' },
  { spanish: 'Río', tseltal: 'nab' },
]

export default function AprenderScreen() {
  const [input, setInput] = useState('')
  const [activeCategory, setActiveCategory] = useState<'numbers' | 'greetings' | 'nature'>(
    'numbers',
  )
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
    <View style={[styles.container, isDark && styles.containerDark]}>
      <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
        {/* Category tabs */}
        <View style={[styles.catRow, isDark && styles.catRowDark]}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={[styles.catChip, activeCategory === cat.id && styles.catChipActive]}
              onPress={() => setActiveCategory(cat.id as typeof activeCategory)}
              activeOpacity={0.8}
            >
              <Text style={styles.catEmoji}>{cat.emoji}</Text>
              <Text
                style={[
                  styles.catLabel,
                  activeCategory === cat.id && styles.catLabelActive,
                  isDark && styles.catLabelDark,
                ]}
              >
                {cat.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {activeCategory === 'numbers' && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
                Aprende a contar en Tseltal
              </Text>
              <Text style={[styles.sectionSub, isDark && styles.textMuted]}>
                Escribe cualquier número para traducirlo
              </Text>

              {/* Input + result card */}
              <View style={[styles.inputCard, isDark && styles.inputCardDark]}>
                <TextInput
                  style={[styles.numberInput, isDark && styles.numberInputDark]}
                  value={input}
                  onChangeText={(t) => setInput(t.replace(/[^0-9]/g, ''))}
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
                      Número no válido
                    </Text>
                  )
                ) : (
                  <Text style={[styles.placeholder, isDark && styles.textMuted]}>--</Text>
                )}
              </View>
            </View>
          )}

          {activeCategory === 'greetings' && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
                Saludos en Tseltal
              </Text>
              <Text style={[styles.sectionSub, isDark && styles.textMuted]}>
                Frases cotidianas básicas
              </Text>
              {GREETINGS.map((item, i) => (
                <View key={i} style={[styles.phraseCard, isDark && styles.phraseCardDark]}>
                  <Text style={[styles.phraseSpanish, isDark && styles.textLight]}>
                    {item.spanish}
                  </Text>
                  <Text style={styles.phraseTseltal}>{item.tseltal}</Text>
                </View>
              ))}
            </View>
          )}

          {activeCategory === 'nature' && (
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, isDark && styles.textLight]}>
                La naturaleza en Tseltal
              </Text>
              <Text style={[styles.sectionSub, isDark && styles.textMuted]}>
                Palabras del entorno natural
              </Text>
              <View style={styles.natureGrid}>
                {NATURE.map((item, i) => (
                  <View key={i} style={[styles.natureCell, isDark && styles.natureCellDark]}>
                    <Text style={styles.natureTseltal}>{item.tseltal}</Text>
                    <Text style={[styles.natureSpanish, isDark && styles.textMuted]}>
                      {item.spanish}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FBFC' },
  containerDark: { backgroundColor: '#111416' },
  safeArea: { flex: 1 },
  catRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0EBF0',
    gap: 8,
  },
  catRowDark: { backgroundColor: '#1A1D20', borderBottomColor: '#2A2E32' },
  catChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 9,
    borderRadius: 12,
    backgroundColor: '#F0F4F5',
  },
  catChipActive: { backgroundColor: Brand.primary },
  catEmoji: { fontSize: 14 },
  catLabel: { fontSize: 13, fontWeight: '600', color: '#5A7A84' },
  catLabelDark: { color: '#6A8890' },
  catLabelActive: { color: '#FFFFFF' },
  scrollContent: { padding: 20, paddingBottom: 40 },
  section: { gap: 14 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#1A2A30' },
  sectionSub: { fontSize: 13, color: '#7A9098', marginTop: -8 },
  textLight: { color: '#D8E8EC' },
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
  divider: {
    width: '60%',
    height: 1.5,
    backgroundColor: '#E0EDF0',
    borderRadius: 1,
  },
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
  phraseCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    gap: 6,
    borderLeftWidth: 4,
    borderLeftColor: Brand.primary,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  phraseCardDark: { backgroundColor: '#1E2427' },
  phraseSpanish: { fontSize: 15, fontWeight: '600', color: '#1A2A30' },
  phraseTseltal: { fontSize: 18, fontWeight: '700', color: Brand.primary, letterSpacing: 0.5 },
  natureGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  natureCell: {
    width: '47%',
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    gap: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
  },
  natureCellDark: { backgroundColor: '#1E2427' },
  natureTseltal: { fontSize: 22, fontWeight: '700', color: Brand.primary },
  natureSpanish: { fontSize: 13, color: '#7A9098' },
})
