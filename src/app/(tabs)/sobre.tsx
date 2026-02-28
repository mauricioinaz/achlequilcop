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
import { SafeAreaView } from 'react-native-safe-area-context'

import { Brand } from '@/constants/theme'

const TEAM = [
  { role: 'Directora', name: 'Amalia Hernández' },
  { role: 'Desarrollo', name: 'Mauricio González' },
  { role: 'Traducción', name: 'Francisco Guzmán' },
  { role: 'Diseño Logo', name: 'Aquila Diseño' },
  { role: 'Equipo Radio', name: 'José Álvarez' },
]

export default function SobreScreen() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

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
              <Text style={styles.versionText}>Versión 1.03</Text>
            </View>
          </View>

          {/* About section */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeading, isDark && styles.textLight]}>
              Sobre nuestra radio
            </Text>
            <Text style={[styles.body, isDark && styles.bodyDark]}>
              Radio Ach' Lequilc'op es una radio comunitaria pertinente e integrada a la realidad de
              las comunidades de la Selva Norte de Chiapas. Sirve como sistema educativo,
              informativo y de concientización, para contribuir a una vida en armonía en la región,
              conformada por tseltales y mestizos.
            </Text>
            <Text style={[styles.body, isDark && styles.bodyDark, styles.bodySpaced]}>
              Además del equipo base, más de 30 personas dan su tiempo voluntario para traer la
              palabra de las diferentes regiones y procesos de las comunidades, brindando así un
              servicio a nuestro pueblo.
            </Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://achlequilcop.org')}>
              <Text style={styles.link}>achlequilcop.org</Text>
            </TouchableOpacity>
          </View>

          {/* App description */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeading, isDark && styles.textLight]}>Esta aplicación</Text>
            <Text style={[styles.body, isDark && styles.bodyDark]}>
              Desarrollamos esta app pensando en nuestros radioescuchas que están fuera de su
              comunidad, estado o país. Que con ella llevemos en nuestro bolsillo, donde quiera que
              estemos, los contenidos y horarios de Ach' Lequilc'op, y un pequeño recordatorio de
              nuestra cultura Tseltal.
            </Text>
          </View>

          {/* Team section */}
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardHeading, isDark && styles.textLight]}>Equipo</Text>
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
            <Text style={styles.licensesText}>Licencias y Dependencias</Text>
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
