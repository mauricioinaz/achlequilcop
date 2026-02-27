import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Brand } from '@/constants/theme';

const DAYS = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

type Program = {
  time: string;
  title: string;
  host: string;
  category: string;
  color: string;
};

const SCHEDULE: Record<string, Program[]> = {
  Lun: [
    { time: '6:00 – 8:00', title: 'Programa Matutino', host: 'José', category: 'Informativo', color: '#1B7B8A' },
    { time: '8:00 – 10:00', title: 'Círculo de Mujeres', host: 'Amalia', category: 'Cultural', color: '#8B3A9A' },
    { time: '10:00 – 12:00', title: 'La Radio de los Pueblos', host: 'Toño', category: 'Educativo', color: '#C04A2A' },
    { time: '12:00 – 13:00', title: 'Mediodía Informativo', host: 'Francisco', category: 'Informativo', color: '#1B7B8A' },
    { time: '15:00 – 17:00', title: 'Voces de la Selva', host: 'Gilberto', category: 'Ambiental', color: '#3A8A3A' },
    { time: '19:00 – 21:00', title: 'Noche Cultural', host: 'Ángel', category: 'Cultural', color: '#8B3A9A' },
  ],
  Mar: [
    { time: '6:00 – 8:00', title: 'Programa Matutino', host: 'José', category: 'Informativo', color: '#1B7B8A' },
    { time: '8:00 – 10:00', title: 'Educación en Familia', host: 'Toño', category: 'Educativo', color: '#C04A2A' },
    { time: '10:00 – 12:00', title: 'Medicina Tradicional', host: 'Amalia', category: 'Cultural', color: '#8B3A9A' },
    { time: '14:00 – 16:00', title: 'Derechos Comunitarios', host: 'Francisco', category: 'Social', color: '#C08A1A' },
    { time: '18:00 – 20:00', title: 'Música Tseltal', host: 'Ángel', category: 'Cultural', color: '#8B3A9A' },
  ],
  Mié: [
    { time: '6:00 – 8:00', title: 'Programa Matutino', host: 'José', category: 'Informativo', color: '#1B7B8A' },
    { time: '9:00 – 11:00', title: 'Aguas y Bosques', host: 'Gilberto', category: 'Ambiental', color: '#3A8A3A' },
    { time: '11:00 – 13:00', title: 'Tú Hablas con la Radio', host: 'Toño', category: 'Participativo', color: '#C04A2A' },
    { time: '16:00 – 18:00', title: 'Historia de los Pueblos', host: 'Francisco', category: 'Educativo', color: '#C04A2A' },
    { time: '20:00 – 22:00', title: 'El Rincón Nocturno', host: 'Ángel', category: 'Cultural', color: '#8B3A9A' },
  ],
  Jue: [
    { time: '6:00 – 8:00', title: 'Programa Matutino', host: 'José', category: 'Informativo', color: '#1B7B8A' },
    { time: '8:00 – 10:00', title: 'Artesanía de la Región', host: 'Amalia', category: 'Cultural', color: '#8B3A9A' },
    { time: '10:00 – 12:00', title: 'Soberanía Alimentaria', host: 'Gilberto', category: 'Ambiental', color: '#3A8A3A' },
    { time: '15:00 – 17:00', title: 'La Igualdad en las Comunidades', host: 'Francisco', category: 'Social', color: '#C08A1A' },
  ],
  Vie: [
    { time: '6:00 – 8:00', title: 'Programa Matutino', host: 'José', category: 'Informativo', color: '#1B7B8A' },
    { time: '8:00 – 10:00', title: 'Círculo de Mujeres', host: 'Amalia', category: 'Cultural', color: '#8B3A9A' },
    { time: '10:00 – 12:00', title: 'Mixturas Musicales', host: 'Ángel', category: 'Cultural', color: '#8B3A9A' },
    { time: '14:00 – 16:00', title: 'Noticias Regionales', host: 'Toño', category: 'Informativo', color: '#1B7B8A' },
    { time: '19:00 – 21:00', title: 'Viernes Cultural', host: 'Francisco', category: 'Cultural', color: '#8B3A9A' },
  ],
  Sáb: [
    { time: '8:00 – 10:00', title: 'Sabado Deportivo', host: 'Gilberto', category: 'Deportivo', color: '#2A6AC0' },
    { time: '10:00 – 12:00', title: 'Para los Niños', host: 'Amalia', category: 'Educativo', color: '#C04A2A' },
    { time: '14:00 – 16:00', title: 'Música de la Región', host: 'Ángel', category: 'Cultural', color: '#8B3A9A' },
    { time: '17:00 – 19:00', title: 'Tardes del Sabado', host: 'José', category: 'Cultural', color: '#8B3A9A' },
  ],
  Dom: [
    { time: '8:00 – 10:00', title: 'Buenos Dias Domingo', host: 'Francisco', category: 'Cultural', color: '#8B3A9A' },
    { time: '10:00 – 12:00', title: 'Misa Comunitaria', host: 'Comunidad', category: 'Religioso', color: '#C08A1A' },
    { time: '15:00 – 17:00', title: 'Cuentos de Chiapas', host: 'Amalia', category: 'Cultural', color: '#8B3A9A' },
    { time: '19:00 – 21:00', title: 'Nuevas Voces Tseltales', host: 'Ángel', category: 'Cultural', color: '#8B3A9A' },
  ],
};

export default function HorarioScreen() {
  const today = new Date().getDay();
  const initialDay = today === 0 ? 6 : today - 1;
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const programs = SCHEDULE[DAYS[selectedDay]] ?? [];

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      {/* Day selector */}
      <View style={[styles.dayRow, isDark && styles.dayRowDark]}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.dayScroll}>
          {DAYS.map((day, i) => (
            <TouchableOpacity
              key={day}
              style={[styles.dayChip, i === selectedDay && styles.dayChipActive]}
              onPress={() => setSelectedDay(i)}
              activeOpacity={0.75}>
              <Text style={[styles.dayLabel, i === selectedDay && styles.dayLabelActive, isDark && styles.dayLabelDark]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Program list */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <SafeAreaView edges={['bottom']}>
          {programs.map((prog, i) => (
            <View key={i} style={[styles.card, isDark && styles.cardDark]}>
              <View style={[styles.cardAccent, { backgroundColor: prog.color }]} />
              <View style={styles.cardBody}>
                <View style={styles.cardTop}>
                  <Text style={[styles.cardTime, isDark && styles.cardTimeDark]}>{prog.time}</Text>
                  <View style={[styles.badge, { backgroundColor: prog.color + '22' }]}>
                    <Text style={[styles.badgeText, { color: prog.color }]}>{prog.category}</Text>
                  </View>
                </View>
                <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>{prog.title}</Text>
                <Text style={[styles.cardHost, isDark && styles.cardHostDark]}>Con {prog.host}</Text>
              </View>
            </View>
          ))}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FBFC',
  },
  containerDark: {
    backgroundColor: '#111416',
  },
  dayRow: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E0EBF0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  dayRowDark: {
    backgroundColor: '#1A1D20',
    borderBottomColor: '#2A2E32',
  },
  dayScroll: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  dayChip: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F4F5',
  },
  dayChipActive: {
    backgroundColor: Brand.primary,
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5A7A84',
  },
  dayLabelDark: {
    color: '#7A9098',
  },
  dayLabelActive: {
    color: '#FFFFFF',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  cardDark: {
    backgroundColor: '#1E2427',
    shadowOpacity: 0,
  },
  cardAccent: {
    width: 5,
  },
  cardBody: {
    flex: 1,
    padding: 14,
    gap: 4,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7A9098',
    letterSpacing: 0.3,
  },
  cardTimeDark: {
    color: '#5A7280',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A2A30',
  },
  cardTitleDark: {
    color: '#D8E8EC',
  },
  cardHost: {
    fontSize: 13,
    color: '#7A9098',
  },
  cardHostDark: {
    color: '#5A7280',
  },
});
