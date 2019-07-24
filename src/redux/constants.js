export const ONLY_WIFI = 'wifiOnly';
export const ALWAYS_CONNECTED = 'alwaysConnected';
export const TSELTAL = 'tseltal';
export const CASTILLA = 'castilla'
export const PLAYING = 'REPRODUCIR';
export const STOPPING = 'DETENER'
export const LANGUAGE_ASYNC = "ach:language"
export const CONNECTION_ASYNC = "ach:connection"
export const COLORS = {
  blue: "#00678F",
  yellow: "#FAB431",
  red: "#DE202E",
  purple: "#9C174E",
  lightGray: "#707070",
  darkGray: "#494D4B",
  black: "#0B0F0D",
  brightGreen: "#3DCE58"
}
export const FIREB = {
  name: 0,
  spanish: 1,
  tseltal: 2,
  color: 3
}
export const INTRO_1_CONFIG_LANGUAGE = 'INTRO_1_CONFIG_LANGUAGE'
export const INTRO_2_CONFIG_DATA = 'INTRO_2_CONFIG_DATA'
export const INTRO_3_WELCOME = 'INTRO_3_WELCOME'
export const SPANISH_DATA = {
  drawer: {
    scheduleTitle: 'Horario',
    learningTitle: 'Aprender',
    aboutTitle: 'Sobre la Radio',
    configureTitle: 'Configuración',
    scheduleHeader: 'Horario',
    learningHeader: 'Aprender a Contar',
    aboutHeader: 'Acerca de',
    configureHeader: 'Configuración'
  },
  numbers: {
    numbersTitle: 'Escribe un número:'
  },
  config: {
    langTitle: 'Elige tu idioma',
    buttonSpanish: 'Castellano',
    buttonTseltal: "Tseltal",
    dataTitle: "Escucha la radio con\ntus datos o sólo en Wifi", //`Escucha la radio con\ntus datos o sólo en Wifi`,
    buttonWifi: "Sólo WiFi",
    buttonData: "Datos",
    welcomeText: "¡Listo! Ahora explora los horarios, los números en Tseltal y ¡escucha Ach'Lequilc'op!"
  },
  about: {
    aboutTitle: "Sobre nuestra radio",
    aboutInfo: "Radio Ach’ Lequilc’op es una radio comunitaria pertinente e integrada a la realidad de las comunidades de la Selva Norte de Chiapas. Sirve como sistema educativo, informativo y de concientización, para contribuir a una vida en armonía en la región, conformada por tseltales y mestizos. Además del equipo base, más de 30 personas dan su tiempo voluntario para traer la palabra de las diferentes regiones y procesos de las comunidades, brindando así un servicio a nuestro pueblo.",
    aboutApp: "Desarrollamos esta app pensando en nuestros radioescuchas que están fuera de su comunidad, estado o país. Que con ella llevemos en nuestro bolsillo, donde quiera que estemos, los contenidos y horarios de Ach’ Lequilc’op, y un pequeño recordatorio de nuestra cultura Tseltal.",
    appVersion: "Version 1.01",
    aboutAck: "Coordinadora:  Amalia Hernández\nDesarrollo:  Mauricio González\n\
Traducción:  Francisco Guzmán\nDiseño Logo:  Aquila Diseño\nEquipo Radio:  Gilberto Miranda y Ángel López"
  },
  errorMess: {
    errorServer: "Error: El Servidor de Streaming no responde. :( Intenta más tarde",
    errorStream: "Error: Falla de Streaming.",
    errorConn1: 'Error de Conexión: Activa el Wifi, o el "uso de datos" en Configuración',
    errorConn2: "Error de Conexión: Verifica que tengas acceso a Internet",
    dataAlert: "El streaming sin Wifi podría consumir datos de tu saldo."
  }
}
export const TSELTAL_DATA = {
  drawer: {
    scheduleTitle: "Sc'ahc'alel a'tel",
    learningTitle: "Snopel",
    aboutTitle: "Ta sc'oblal te C'opojibal",
    configureTitle: "Schahpanel",
    scheduleHeader: "Sc'ahc'alel a'tel",
    learningHeader: "Snopel ahtal",
    aboutHeader: "Ta sc'oblal ha'i a'tel ini",
    configureHeader: "Schahpanel"
  },
  numbers: {
    numbersTitle: "Ts'ihbaya ochel te caxlan ahtal"
  },
  config: {
    langTitle: "Tsaha te ac'opojel",
    buttonSpanish: "Castilla",
    buttonTseltal: "Tseltal",
    dataTitle: "Ts'ehchiquintaya te c'opojibal ta jayeb taqu'in awotsesbeyoj te ac'opojib ma'uc ta WiFi ", //`Escucha la radio con\ntus datos o sólo en Wifi`,
    buttonWifi: "Ha' nax ta WiFi",
    buttonData: "Staqu'inul jc'opojib",
    welcomeText: "¡Lequix ay! Xhu' ya cawilix binut'il chapal sbehlal ya'tel te jc'opojibtic, yu'un canop tseltal ahtal soc nix ehuc ¡a'iya te bin ya xlaj chicnaj ta a'iyel ta Ach' Lequilc'op C'opojibal cu'untic!"
  },
  about: {
    aboutTitle: "Sc'oblal te Ach' Lequilc'op C'opojibal cu'untic",
    aboutInfo: "Te Ach' Lequilc'op C'opojibal ha' jchahp c'opojibal te ha' stuc soc melel ya x'a'tej ta ts'acal ta bin ay sc'oblal yu'un te jaychahp comonal ban c'alal ya smac ta squ'inal Chiapas. \
Ha' yac ta tuquinel binut'il jtojobteswanej, yaqu'el ta na'el smelelil c'op soc nix yac'beyel swic' sit jaytuhl tseltal soc jcaxlan ants winic. Ha' nix hich chapal ta jaytuhl j'a'tel ta yutil te c'opojibal soc nix c'axen wan ta lajuneb scha'winic xan ta tuhl jcoltaywanejetic te ya yac' ya'telic ta yich'el talel c'op ban c'alal jujun smacoj squ'inalic soc sc'op jaychahp a'tel ay ta jujun comonal, yu'un hich melel ay yaqu'el bah abatinel ta yutil jlumaltic.",
    aboutApp: "Laj jchahpancotic ha'i a'tel ini ta sc'oblal jaytuhl mach'atic ma' nacal ta slumalic, chican teme li' ta yutil nix squ'inal Chiapas ay ma'uc teme ayic ta namal. Yu'un hich xhu' bayuc ban ayotic, ya jchupojtic ta jujutuhl bin a'tel ya xlaj pasaluc soc nix na'alotic ah bintic ya xlaj c'ax ta Ach' Lequilc'op C'opojibal, ha' nix hich jchahp sna'ojibal te banti loqu'em talel jts'umbaltic te ho'otic melel tseltalotique.",
    appVersion: "Version 1.01",
    aboutAck: "Jolal ta c'opojibal:  Amalia Hernández\nSchahpanej te a'tejibal:  Mauricio González\n\
Sohltesej ta tseltal c'op:  Francisco Guzmán\nRadio:  Gilberto Miranda soc j'Angel López"
  },
  errorMess: {
    errorServer: "ila awil: Te banti ya xtal te sc'op c'opojibal ma' yac stsacbel. :( Pasa jts'ihnuc",
    errorStream: "ila awil: Ma' laj stsac sbah te c'opojibal",
    errorConn1: "Ma' lec ay: Jama Wifi ma'uc Staqu'inul C'opojib banti ya xchahpaj",
    errorConn2: "Ma' stsac sbah: Ila awil ah teme jamal sbeh te banti ya xtal sc'op te c'opojibal",
    dataAlert: "Te ma' stuquinel Wifi ya me slajimbat staqu'inul te ac'opojibe"
  }
}
