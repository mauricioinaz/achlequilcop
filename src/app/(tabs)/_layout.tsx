import { Tabs } from 'expo-router';
import { Image, ImageSourcePropType, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

type IconProps = { focused: boolean; size: number; src: ImageSourcePropType };

function TabIcon({ src, focused, size }: IconProps) {
  return (
    <Image
      source={src}
      style={{ width: size, height: size, opacity: focused ? 1 : 0.4 }}
      resizeMode="contain"
    />
  );
}

const TAB_BAR_BASE_HEIGHT = 56;
const TAB_BAR_PADDING_TOP = 6;
const TAB_BAR_PADDING_BOTTOM = 8;

export default function TabsLayout() {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const insets = useSafeAreaInsets();

  const tabBarHeight = TAB_BAR_BASE_HEIGHT + insets.bottom;
  const tabBarPaddingBottom = TAB_BAR_PADDING_BOTTOM + insets.bottom;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Brand.primary,
        tabBarInactiveTintColor: Brand.tabInactive,
        tabBarStyle: [
          styles.tabBar,
          isDark && styles.tabBarDark,
          { height: tabBarHeight, paddingBottom: tabBarPaddingBottom },
        ],
        tabBarLabelStyle: styles.label,
        headerStyle: { backgroundColor: Brand.primary },
        headerTintColor: Brand.white,
        headerTitleStyle: styles.headerTitle,
        headerTitleAlign: 'center',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Radio',
          headerTitle: "Ach' Lequilc'op",
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/LogoSinLetraMenu.png')} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="horario"
        options={{
          title: 'Horario',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/IconoMaiz.png')} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="aprender"
        options={{
          title: 'Aprender',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/IconoMano.png')} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          headerTitle: 'Sobre la Radio',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/IconoPersonas.png')} focused={focused} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="configuracion"
        options={{
          title: 'Config',
          headerTitle: 'Configuración',
          tabBarIcon: ({ focused, size }) => (
            <TabIcon src={require('@/assets/IconoIdioma.png')} focused={focused} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#E4EDF0',
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: TAB_BAR_PADDING_TOP,
    elevation: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -3 },
  },
  tabBarDark: {
    backgroundColor: '#1A1D20',
    borderTopColor: '#2A2E32',
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  headerTitle: {
    fontWeight: '700',
    fontSize: 18,
    color: Brand.white,
  },
});
