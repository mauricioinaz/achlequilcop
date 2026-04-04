import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Brand } from '@/constants/theme'

export default function SobreScreen() {
  const { t } = useTranslation()
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  const TEAM = [
    { role: t('sobre.teamDirectora'), name: 'Amalia Hernández' },
    { role: t('sobre.teamDesarrollo'), name: 'Mauricio González' },
    { role: t('sobre.teamTraduccion'), name: 'Francisco Guzmán' },
    { role: t('sobre.teamDiseno'), name: 'Aquila Diseño' },
    { role: t('sobre.teamEquipoRadio'), name: 'José Álvarez' },
  ]

  return (
    <SafeAreaView edges={['top']} style={[styles.container, isDark && styles.containerDark]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <SafeAreaView edges={['bottom']}>
          {/* Logo header */}
          <View style={styles.logoSection}>
            <View style={[styles.logoCircle, isDark && styles.logoCircleDark]}>
              <Image
                source={require('@/assets/LogoSinLetra.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <Text style={[styles.radioName, isDark && styles.textLight]}>Ach' Lequilc'op</Text>
            <Text style={styles.frequency}>98.7 FM</Text>
            <View style={styles.versionBadge}>
              <Text style={styles.versionText}>{t('sobre.version')}</Text>
            </View>
          </View>

          {/* About section */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeading, isDark && styles.textLight]}>
              {t('sobre.aboutTitle')}
            </Text>
            <Text style={[styles.body, isDark && styles.bodyDark]}>
              {t('sobre.aboutBody1')}
            </Text>
            <Text style={[styles.body, isDark && styles.bodyDark, styles.bodySpaced]}>
              {t('sobre.aboutBody2')}
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://achlequilcop.org')}>
              <Text style={styles.link}>achlequilcop.org</Text>
            </TouchableOpacity>
          </View>

          {/* App description */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeading, isDark && styles.textLight]}>
              {t('sobre.appTitle')}
            </Text>
            <Text style={[styles.body, isDark && styles.bodyDark]}>
              {t('sobre.appBody')}
            </Text>
          </View>

          {/* Team section */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeading, isDark && styles.textLight]}>
              {t('sobre.teamTitle')}
            </Text>
            <View style={styles.teamList}>
              {TEAM.map((member, i) => (
                <View
                  key={i}
                  style={[
                    styles.teamRow,
                    i < TEAM.length - 1 && styles.teamRowBorder,
                    isDark && styles.teamRowBorderDark,
                  ]}
                >
                  <Text style={[styles.teamRole, isDark && styles.teamRoleDark]}>
                    {member.role}
                  </Text>
                  <Text style={[styles.teamName, isDark && styles.textLight]}>{member.name}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* Licenses */}
          <TouchableOpacity
            style={[styles.licensesBtn, isDark && styles.licensesBtnDark]}
            activeOpacity={0.75}
          >
            <Text style={styles.licensesText}>{t('sobre.licenses')}</Text>
          </TouchableOpacity>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7FBFC' },
  containerDark: { backgroundColor: '#111416' },
  scrollContent: { padding: 20, gap: 16, paddingBottom: 40 },
  logoSection: {
    alignItems: 'center',
    paddingVertical: 24,
    gap: 8,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 6,
    shadowColor: Brand.primary,
    shadowOpacity: 0.15,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 5 },
    marginBottom: 4,
  },
  logoCircleDark: { backgroundColor: '#1E2427', shadowColor: '#000' },
  logo: { width: 100, height: 100 },
  radioName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A2A30',
    letterSpacing: 0.3,
  },
  frequency: {
    fontSize: 16,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: 1.5,
  },
  versionBadge: {
    backgroundColor: Brand.primarySurface,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#C8E8EE',
    marginTop: 4,
  },
  versionText: {
    fontSize: 12,
    fontWeight: '600',
    color: Brand.primary,
    letterSpacing: 0.5,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    gap: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 14,
  },
  cardDark: { backgroundColor: '#1E2427', shadowOpacity: 0 },
  cardHeading: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2A30',
  },
  body: {
    fontSize: 14,
    lineHeight: 22,
    color: '#3A5058',
  },
  bodyDark: { color: '#6A8890' },
  bodySpaced: { marginTop: 4 },
  link: {
    fontSize: 14,
    color: Brand.primary,
    fontWeight: '600',
    textDecorationLine: 'underline',
    marginTop: 4,
  },
  teamList: { gap: 0 },
  teamRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E8F0F3',
  },
  teamRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  teamRowBorderDark: { borderBottomColor: '#2A3A3E' },
  teamRole: { fontSize: 13, color: '#7A9098', fontWeight: '500' },
  teamRoleDark: { color: '#4A6870' },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A2A30',
    textAlign: 'right',
    flex: 1,
    paddingLeft: 12,
  },
  textLight: { color: '#D8E8EC' },
  licensesBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Brand.primary,
    backgroundColor: 'transparent',
    marginTop: 4,
  },
  licensesBtnDark: { borderColor: Brand.primaryDark },
  licensesText: {
    fontSize: 14,
    fontWeight: '600',
    color: Brand.primary,
    letterSpacing: 0.3,
  },
})
