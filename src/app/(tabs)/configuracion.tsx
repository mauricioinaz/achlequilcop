import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

type Language = 'castellano' | 'tseltal';
type Connection = 'wifi' | 'datos';

export default function ConfiguracionScreen() {
  const [language, setLanguage] = useState<Language>('castellano');
  const [connection, setConnection] = useState<Connection>('datos');
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
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
              <View style={styles.sectionTitleBlock}>
                <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Idioma</Text>
                <Text style={[styles.sectionSub, isDark && styles.textMuted]}>
                  Elige el idioma de la app
                </Text>
              </View>
            </View>

            <View style={[styles.optionGroup, isDark && styles.optionGroupDark]}>
              <TouchableOpacity
                style={[styles.option, language === 'castellano' && styles.optionActive, isDark && styles.optionDark]}
                onPress={() => setLanguage('castellano')}
                activeOpacity={0.8}>
                <View style={styles.optionLeft}>
                  <Text style={styles.optionFlag}>🇲🇽</Text>
                  <Text style={[styles.optionLabel, isDark && styles.textLight]}>Castellano</Text>
                </View>
                <View style={[styles.radio, language === 'castellano' && styles.radioActive]}>
                  {language === 'castellano' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>

              <View style={[styles.optionSeparator, isDark && styles.optionSeparatorDark]} />

              <TouchableOpacity
                style={[styles.option, language === 'tseltal' && styles.optionActive, isDark && styles.optionDark]}
                onPress={() => setLanguage('tseltal')}
                activeOpacity={0.8}>
                <View style={styles.optionLeft}>
                  <Text style={styles.optionFlag}>🌽</Text>
                  <Text style={[styles.optionLabel, isDark && styles.textLight]}>Tseltal</Text>
                </View>
                <View style={[styles.radio, language === 'tseltal' && styles.radioActive]}>
                  {language === 'tseltal' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Connection section */}
          <View style={[styles.section, isDark && styles.sectionDark]}>
            <View style={styles.sectionHeader}>
              <View style={[styles.iconCircle, { backgroundColor: '#F0F8FF' }]}>
                <Text style={styles.wifiEmoji}>📶</Text>
              </View>
              <View style={styles.sectionTitleBlock}>
                <Text style={[styles.sectionTitle, isDark && styles.textLight]}>Conexión</Text>
                <Text style={[styles.sectionSub, isDark && styles.textMuted]}>
                  Cómo escuchar la radio
                </Text>
              </View>
            </View>

            <View style={[styles.optionGroup, isDark && styles.optionGroupDark]}>
              <TouchableOpacity
                style={[styles.option, connection === 'wifi' && styles.optionActive, isDark && styles.optionDark]}
                onPress={() => setConnection('wifi')}
                activeOpacity={0.8}>
                <View style={styles.optionLeft}>
                  <Text style={styles.optionFlag}>📡</Text>
                  <View>
                    <Text style={[styles.optionLabel, isDark && styles.textLight]}>Sólo WiFi</Text>
                    <Text style={[styles.optionHint, isDark && styles.textMuted]}>Ahorra datos móviles</Text>
                  </View>
                </View>
                <View style={[styles.radio, connection === 'wifi' && styles.radioActive]}>
                  {connection === 'wifi' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>

              <View style={[styles.optionSeparator, isDark && styles.optionSeparatorDark]} />

              <TouchableOpacity
                style={[styles.option, connection === 'datos' && styles.optionActive, isDark && styles.optionDark]}
                onPress={() => setConnection('datos')}
                activeOpacity={0.8}>
                <View style={styles.optionLeft}>
                  <Text style={styles.optionFlag}>📱</Text>
                  <View>
                    <Text style={[styles.optionLabel, isDark && styles.textLight]}>WiFi y Datos</Text>
                    <Text style={[styles.optionHint, isDark && styles.textMuted]}>Escucha en cualquier lugar</Text>
                  </View>
                </View>
                <View style={[styles.radio, connection === 'datos' && styles.radioActive]}>
                  {connection === 'datos' && <View style={styles.radioDot} />}
                </View>
              </TouchableOpacity>
            </View>
          </View>

          {/* Info note */}
          <View style={[styles.infoNote, isDark && styles.infoNoteDark]}>
            <Text style={styles.infoIcon}>ℹ️</Text>
            <Text style={[styles.infoText, isDark && styles.textMuted]}>
              Los cambios se aplican la próxima vez que inicies la transmisión.
            </Text>
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
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
});
