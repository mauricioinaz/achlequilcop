import { Brand } from '@/constants/theme'
import { fetchRemoteURLs } from '@/hooks/fetch-firebasedata'
import * as WebBrowser from 'expo-web-browser'
import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native'
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler'
import Reanimated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'

const SOUNDCLOUD_URL = 'https://soundcloud.com/achlequilcop-gmail-com'
const YOUTUBE_URL = 'https://www.youtube.com/@radioachlequilcop8876'

const TABS = [
  { id: 'parrilla', label: 'Parrilla', emoji: '🗓️' },
  { id: 'videos', label: 'Videos', emoji: '🎬' },
  { id: 'audio', label: 'Audio', emoji: '🎙️' },
] as const

type TabId = (typeof TABS)[number]['id']

// ─── Parrilla tab ──────────────────────────────────────────────────────────────

function ParrillaScreen({ isDark }: { isDark: boolean }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetchRemoteURLs()
      .then((data) => {
        setImageUrl(data.url_parrilla)
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <View style={[styles.centered, isDark && styles.centerDark]}>
        <ActivityIndicator size="large" color={Brand.primary} />
      </View>
    )
  }

  if (error || !imageUrl) {
    return (
      <View style={[styles.centered, isDark && styles.centerDark]}>
        <Text style={[styles.emptyIcon]}>📡</Text>
        <Text style={[styles.emptyTitle, isDark && styles.textLight]}>No se pudo cargar</Text>
        <Text style={[styles.emptySubtitle, isDark && styles.textMuted]}>
          Revisa tu conexión e intenta de nuevo.
        </Text>
      </View>
    )
  }

  return (
    <View style={[styles.fill, isDark && styles.centerDark]}>
      <ZoomableImage uri={imageUrl} />
    </View>
  )
}

// ─── Zoomable image ────────────────────────────────────────────────────────────

function ZoomableImage({ uri }: { uri: string }) {
  const scale = useSharedValue(1)
  const savedScale = useSharedValue(1)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const savedTranslateX = useSharedValue(0)
  const savedTranslateY = useSharedValue(0)

  const pinch = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = Math.max(1, Math.min(savedScale.value * e.scale, 6))
    })
    .onEnd(() => {
      savedScale.value = scale.value
      if (scale.value < 1.05) {
        scale.value = withSpring(1)
        savedScale.value = 1
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
        savedTranslateX.value = 0
        savedTranslateY.value = 0
      }
    })

  const pan = Gesture.Pan()
    .averageTouches(true)
    .onUpdate((e) => {
      translateX.value = savedTranslateX.value + e.translationX
      translateY.value = savedTranslateY.value + e.translationY
    })
    .onEnd(() => {
      savedTranslateX.value = translateX.value
      savedTranslateY.value = translateY.value
    })

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      if (scale.value > 1.05) {
        scale.value = withSpring(1)
        savedScale.value = 1
        translateX.value = withSpring(0)
        translateY.value = withSpring(0)
        savedTranslateX.value = 0
        savedTranslateY.value = 0
      } else {
        scale.value = withSpring(2.5)
        savedScale.value = 2.5
      }
    })

  const composed = Gesture.Simultaneous(pinch, pan)
  const withDoubleTap = Gesture.Exclusive(doubleTap, composed)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }))

  return (
    <GestureHandlerRootView style={styles.fill}>
      <GestureDetector gesture={withDoubleTap}>
        <Reanimated.View style={[styles.fill, animatedStyle]}>
          <Image source={{ uri }} style={styles.fill} resizeMode="contain" />
        </Reanimated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  )
}

// ─── Videos tab ────────────────────────────────────────────────────────────────

const VIDEO_THUMBNAILS = [{ color: '#C00000' }, { color: '#A00000' }, { color: '#D50000' }]

function VideosScreen({ isDark }: { isDark: boolean }) {
  const [opening, setOpening] = useState(false)

  async function openYouTube() {
    setOpening(true)
    await WebBrowser.openBrowserAsync(YOUTUBE_URL, {
      toolbarColor: isDark ? '#1A1D20' : '#FFFFFF',
      controlsColor: '#FF0000',
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
    })
    setOpening(false)
  }

  return (
    <View style={[styles.ytScreen, isDark && styles.centerDark]}>
      {/* YouTube card */}
      <View style={[styles.ytCard, isDark && styles.ytCardDark]}>
        {/* Red accent strip */}
        <View style={styles.ytStrip} />

        <View style={styles.ytBody}>
          {/* Logo row */}
          <View style={styles.ytLogoRow}>
            <View style={styles.ytIconCircle}>
              <Text style={styles.ytIconText}>▶</Text>
            </View>
            <View style={styles.ytLogoText}>
              <Text style={[styles.ytBrand, isDark && styles.textLight]}>YouTube</Text>
              <Text style={styles.ytHandle}>@radioachlequilcop8876</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={[styles.scDivider, isDark && styles.scDividerDark]} />

          {/* Description */}
          <Text style={[styles.ytDescription, isDark && styles.textMuted]}>
            Mira los videos, transmisiones y contenido especial de Ach Lequilcop en nuestro canal de
            YouTube.
          </Text>

          {/* Thumbnail row decoration */}
          <View style={styles.ytThumbRow}>
            {VIDEO_THUMBNAILS.map((t, i) => (
              <View key={i} style={[styles.ytThumb, { backgroundColor: t.color }]}>
                <View style={styles.ytThumbPlay}>
                  <Text style={styles.ytThumbPlayIcon}>▶</Text>
                </View>
              </View>
            ))}
          </View>

          {/* CTA button */}
          <TouchableOpacity
            style={[styles.ytButton, opening && styles.ytButtonDisabled]}
            onPress={openYouTube}
            activeOpacity={0.85}
            disabled={opening}
          >
            {opening ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.ytButtonIcon}>▶</Text>
                <Text style={styles.ytButtonLabel}>Abrir canal en YouTube</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.scFootnote, isDark && styles.textMuted]}>
        Se abrirá en el navegador integrado de la app
      </Text>
    </View>
  )
}

// ─── Producciones de audio tab ─────────────────────────────────────────────────

function ProduccionesScreen({ isDark }: { isDark: boolean }) {
  const [opening, setOpening] = useState(false)

  async function openSoundCloud() {
    setOpening(true)
    await WebBrowser.openBrowserAsync(SOUNDCLOUD_URL, {
      toolbarColor: isDark ? '#1A1D20' : '#FFFFFF',
      controlsColor: '#FF5500',
      presentationStyle: WebBrowser.WebBrowserPresentationStyle.FULL_SCREEN,
    })
    setOpening(false)
  }

  return (
    <View style={[styles.audioScreen, isDark && styles.centerDark]}>
      {/* SoundCloud card */}
      <View style={[styles.scCard, isDark && styles.scCardDark]}>
        {/* Orange accent strip */}
        <View style={styles.scStrip} />

        <View style={styles.scBody}>
          {/* Logo row */}
          <View style={styles.scLogoRow}>
            <View style={styles.scIconCircle}>
              <Text style={styles.scIconText}>☁️</Text>
            </View>
            <View style={styles.scLogoText}>
              <Text style={[styles.scBrand, isDark && styles.textLight]}>SoundCloud</Text>
              <Text style={styles.scHandle}>@achlequilcop-gmail-com</Text>
            </View>
          </View>

          {/* Divider */}
          <View style={[styles.scDivider, isDark && styles.scDividerDark]} />

          {/* Description */}
          <Text style={[styles.scDescription, isDark && styles.textMuted]}>
            Escucha las producciones de audio, podcasts y grabaciones de Ach Lequilcop directamente
            en SoundCloud.
          </Text>

          {/* Fake waveform decoration */}
          <View style={styles.waveRow}>
            {WAVE_BARS.map((h, i) => (
              <View
                key={i}
                style={[styles.waveBar, { height: h }, i % 3 === 0 && styles.waveBarAccent]}
              />
            ))}
          </View>

          {/* CTA button */}
          <TouchableOpacity
            style={[styles.scButton, opening && styles.scButtonDisabled]}
            onPress={openSoundCloud}
            activeOpacity={0.85}
            disabled={opening}
          >
            {opening ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <>
                <Text style={styles.scButtonIcon}>▶</Text>
                <Text style={styles.scButtonLabel}>Abrir en SoundCloud</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <Text style={[styles.scFootnote, isDark && styles.textMuted]}>
        Se abrirá en el navegador integrado de la app
      </Text>
    </View>
  )
}

const WAVE_BARS = [
  14, 22, 10, 28, 18, 32, 12, 24, 8, 30, 20, 14, 26, 16, 32, 10, 22, 18, 28, 12, 24, 30, 16, 20, 14,
]

// ─── Main screen ───────────────────────────────────────────────────────────────

export default function HorarioScreen() {
  const scheme = useColorScheme()
  const isDark = scheme === 'dark'
  const [activeTab, setActiveTab] = useState<TabId>('parrilla')

  return (
    <SafeAreaView edges={['top']} style={[styles.screen, isDark && styles.screenDark]}>
      {/* Chip-style tab bar */}
      <View style={[styles.catRow, isDark && styles.catRowDark]}>
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab
          return (
            <TouchableOpacity
              key={tab.id}
              style={[styles.catChip, isActive && styles.catChipActive]}
              onPress={() => setActiveTab(tab.id)}
              activeOpacity={0.8}
            >
              <Text style={styles.catEmoji}>{tab.emoji}</Text>
              <Text
                style={[
                  styles.catLabel,
                  isDark && styles.catLabelDark,
                  isActive && styles.catLabelActive,
                ]}
                numberOfLines={1}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          )
        })}
      </View>

      {/* Tab content */}
      <View style={styles.fill}>
        {activeTab === 'parrilla' && <ParrillaScreen isDark={isDark} />}
        {activeTab === 'videos' && <VideosScreen isDark={isDark} />}
        {activeTab === 'audio' && <ProduccionesScreen isDark={isDark} />}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F7FBFC',
  },
  screenDark: {
    backgroundColor: '#111416',
  },
  // ── Chip tab bar ──
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
  // ── Content ──
  fill: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FBFC',
    paddingHorizontal: 32,
  },
  centerDark: {
    backgroundColor: '#111416',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A2A30',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#7A9098',
    textAlign: 'center',
    lineHeight: 20,
  },
  textLight: {
    color: '#D8E8EC',
  },
  textMuted: {
    color: '#5A7280',
  },
  // ── SoundCloud screen ──
  audioScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FBFC',
    paddingHorizontal: 24,
    gap: 16,
  },
  scCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  scCardDark: {
    backgroundColor: '#1A1D20',
  },
  scStrip: {
    height: 5,
    backgroundColor: '#FF5500',
  },
  scBody: {
    padding: 20,
    gap: 14,
  },
  scLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  scIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF5500',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scIconText: {
    fontSize: 22,
  },
  scLogoText: {
    flex: 1,
    gap: 2,
  },
  scBrand: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2A30',
  },
  scHandle: {
    fontSize: 12,
    color: '#FF5500',
    fontWeight: '500',
  },
  scDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#E0EBF0',
  },
  scDividerDark: {
    backgroundColor: '#2A2E32',
  },
  scDescription: {
    fontSize: 14,
    color: '#5A7A84',
    lineHeight: 20,
  },
  waveRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
    height: 36,
    paddingVertical: 2,
  },
  waveBar: {
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#FFB899',
  },
  waveBarAccent: {
    backgroundColor: '#FF5500',
  },
  scButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF5500',
    borderRadius: 12,
    paddingVertical: 14,
  },
  scButtonDisabled: {
    opacity: 0.7,
  },
  scButtonIcon: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  scButtonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  scFootnote: {
    fontSize: 12,
    color: '#9AB0B8',
    textAlign: 'center',
  },
  // ── YouTube screen ──
  ytScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F7FBFC',
    paddingHorizontal: 24,
    gap: 16,
  },
  ytCard: {
    width: '100%',
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  ytCardDark: {
    backgroundColor: '#1A1D20',
  },
  ytStrip: {
    height: 5,
    backgroundColor: '#FF0000',
  },
  ytBody: {
    padding: 20,
    gap: 14,
  },
  ytLogoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  ytIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF0000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ytIconText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 3,
  },
  ytLogoText: {
    flex: 1,
    gap: 2,
  },
  ytBrand: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1A2A30',
  },
  ytHandle: {
    fontSize: 12,
    color: '#FF0000',
    fontWeight: '500',
  },
  ytDescription: {
    fontSize: 14,
    color: '#5A7A84',
    lineHeight: 20,
  },
  ytThumbRow: {
    flexDirection: 'row',
    gap: 8,
    height: 64,
  },
  ytThumb: {
    flex: 1,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ytThumbPlay: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ytThumbPlayIcon: {
    color: '#FF0000',
    fontSize: 12,
    fontWeight: '700',
    marginLeft: 2,
  },
  ytButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FF0000',
    borderRadius: 12,
    paddingVertical: 14,
  },
  ytButtonDisabled: {
    opacity: 0.7,
  },
  ytButtonIcon: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  ytButtonLabel: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
})
