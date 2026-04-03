import '@/i18n'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { useColorScheme } from 'react-native'

import { AnimatedSplashOverlay } from '@/components/animated-icon'
import i18n, { LANGUAGE_KEY, type AppLanguage } from '@/i18n'

export default function RootLayout() {
  const colorScheme = useColorScheme()
  const [langReady, setLangReady] = useState(false)

  useEffect(() => {
    AsyncStorage.getItem(LANGUAGE_KEY)
      .then((saved) => {
        if (saved && saved !== i18n.language) {
          return i18n.changeLanguage(saved as AppLanguage)
        }
      })
      .finally(() => setLangReady(true))
  }, [])

  if (!langReady) return null

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style="dark" />
      <AnimatedSplashOverlay />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  )
}
