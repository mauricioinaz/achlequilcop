import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio'
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Brand } from '@/constants/theme'

export default function RadioScreen() {
  const player = useAudioPlayer('http://109.169.15.21:12983')
  const status = useAudioPlayerStatus(player)
  const playing = status.playing
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <SafeAreaView style={styles.safeArea} edges={['bottom']}>
        {/* Logo circle */}
        <View style={[styles.logoWrapper, isDark && styles.logoWrapperDark]}>
          <Image
            source={require('@/assets/LogoSinLetra.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Station identity */}
        <View style={styles.stationBlock}>
          <Text style={[styles.stationName, isDark && styles.textLight]}>Ach' Lequilc'op</Text>
          <Text style={styles.frequency}>98.7 FM</Text>
          <Text style={[styles.tagline, isDark && styles.taglineDark]}>
            Radio Comunitaria · Selva Norte, Chiapas
          </Text>
        </View>

        {/* Live indicator + progress */}
        <View style={styles.progressBlock}>
          <View style={styles.progressTrack}>
            <View style={styles.progressPulse} />
          </View>
          <View style={styles.liveRow}>
            {playing ? (
              <>
                <View style={styles.liveDot} /> <Text style={styles.liveText}>EN VIVO</Text>
              </>
            ) : (
              <>
                <View style={styles.offlineDot} />{' '}
                <Text style={styles.offlineText}>FUERA DE LINEA</Text>
              </>
            )}
          </View>
        </View>

        {/* Playback controls */}
        <View style={styles.controls}>
          <TouchableOpacity
            style={[styles.playBtn, playing && styles.playBtnActive]}
            onPress={() => (playing ? player.pause() : player.play())}
            activeOpacity={0.85}
          >
            <Text style={styles.playIcon}>{playing ? '⏸' : '▶'}</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBFC',
  },
  containerDark: {
    backgroundColor: '#111416',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 28,
    paddingBottom: 16,
  },
  logoWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: Brand.primary,
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
  },
  logoWrapperDark: {
    backgroundColor: '#1E2427',
    shadowColor: '#000',
  },
  logo: {
    width: 172,
    height: 172,
  },
  stationBlock: {
    alignItems: 'center',
    gap: 4,
  },
  stationName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A2A30',
    letterSpacing: 0.3,
  },
  frequency: {
    fontSize: 22,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: 1.5,
    marginTop: 2,
  },
  tagline: {
    fontSize: 13,
    color: '#7A9098',
    marginTop: 2,
  },
  taglineDark: {
    color: '#6A8088',
  },
  textLight: {
    color: '#ECEFF0',
  },
  nowPlayingCard: {
    alignItems: 'center',
    gap: 5,
    backgroundColor: Brand.primarySurface,
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: 20,
    width: '100%',
    borderWidth: 1,
    borderColor: '#C8E8EE',
  },
  nowPlayingCardDark: {
    backgroundColor: '#1A2C30',
    borderColor: '#1B4550',
  },
  nowLabel: {
    fontSize: 10,
    fontWeight: '800',
    color: Brand.primary,
    letterSpacing: 2.5,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2A30',
  },
  programSub: {
    fontSize: 13,
    color: '#7A9098',
  },
  progressBlock: {
    width: '100%',
    gap: 8,
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#D8E8EC',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressPulse: {
    height: '100%',
    width: '100%',
    backgroundColor: Brand.primary,
    borderRadius: 2,
    opacity: 0.6,
  },
  liveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Brand.rojo,
  },
  offlineDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Brand.tabInactive,
  },
  liveText: {
    fontSize: 11,
    fontWeight: '700',
    color: Brand.rojo,
    letterSpacing: 2,
  },
  offlineText: {
    fontSize: 11,
    fontWeight: '700',
    color: Brand.tabInactive,
    letterSpacing: 2,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 36,
  },
  sideBtn: {
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideBtnIcon: {
    fontSize: 26,
    color: '#green',
  },
  sideBtnIconDark: {
    color: '#yellow',
  },
  playBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Brand.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
    shadowColor: Brand.primary,
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 5 },
  },
  playBtnActive: {
    backgroundColor: Brand.morado,
  },
  playIcon: {
    fontSize: 28,
    color: Brand.white,
    marginLeft: 3,
  },
})
