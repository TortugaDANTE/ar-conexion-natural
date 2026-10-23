/* Especies: nombre = texto impreso en la carta del memorama (sin cambios).
   Grupo, nombre científico, estatus y distribución: tabla de especies del proyecto (especies_slp.csv, base del memorama).
   Región(es) = SOLO las que menciona esa distribución; si no la precisa: [] = [POR DEFINIR]. Todo el estado = las 4. */
const T4=['altiplano','centro','media','huasteca'];
window.ESPECIES=[
 ['c00','Guacamaya verde','Ave','Ara militaris','P (NOM-059); UICN VU','Huasteca y Sierra Gorda potosina; nidos en Sótano de las Huahuas/Golondrinas (Aquismón)',['huasteca']],
 ['c01','Loro tamaulipeco','Ave','Amazona viridigenalis','P (NOM-059); UICN EN','Endémico del NE de México; Huasteca potosina',['huasteca']],
 ['c02','Tucán pico canoa','Ave','Ramphastos sulfuratus','A (NOM-059)','Selvas de la Huasteca potosina (Xilitla, Tamasopo)',['huasteca']],
 ['c03','Chachalaca','Ave','Ortalis vetula','—','Común en Huasteca y matorrales del oriente de SLP',['huasteca']],
 ['c04','Águila real','Ave','Aquila chrysaetos','A (NOM-059)','Altiplano y Sierra de Catorce; ave nacional',['altiplano']],
 ['c05','Correcaminos','Ave','Geococcyx californianus','—','Altiplano potosino, matorral desértico',['altiplano']],
 ['c06','Cardenal rojo','Ave','Cardinalis cardinalis','—','Matorrales del Altiplano y Zona Media',['altiplano','media']],
 ['c07','Colibrí pico ancho','Ave','Cynanthus latirostris','—','Zonas áridas y Zona Media de SLP',['media']],
 ['c08','Cernícalo americano','Ave','Falco sparverius','—','Residente/invernante en todo el estado',T4],
 ['c09','Búho cornudo','Ave','Bubo virginianus','—','Altiplano y sierras',['altiplano']],
 ['c10','Mariposa monarca','Insecto','Danaus plexippus','Pr (NOM-059)','Ruta migratoria otoñal por SLP',[]],
 ['c11','Abeja sin aguijón','Insecto','Scaptotrigona mexicana','—','Meliponicultura tének/nahua en la Huasteca',['huasteca']],
 ['c12','Grana cochinilla','Insecto','Dactylopius coccus','— (domesticada)','Se cría sobre nopal; presencia por cultivo, no silvestre',[]],
 ['c13','Hormiga escamolera','Insecto','Liometopum apiculatum','—','Altiplano (magueyales/nopaleras); escamoles',['altiplano']],
 ['c14','Chapulín','Insecto','Sphenarium purpurascens','—','Centro de México; presencia en SLP poco documentada, verificar localmente',[]],
 ['c15','Escarabajo rinoceronte','Insecto','Dynastes hyllus','—','Bosques húmedos de la Huasteca y Sierra Gorda',['huasteca']],
 ['c16','Luciérnaga','Insecto','Photinus spp.','—','Bosques y cañadas de Xilitla y Huasteca',['huasteca']],
 ['c17','Mantis religiosa','Insecto','[POR DEFINIR]','[POR DEFINIR]','[POR DEFINIR]',[]],
 ['c18','Mariposa cebra','Insecto','Heliconius charithonia','—','Huasteca y Zona Media',['huasteca','media']],
 ['c19','Abeja carpintera','Insecto','Xylocopa spp.','—','Todo el estado; polinizador',T4],
 ['c20','Mezquite','Planta','Prosopis laevigata','—','Altiplano y Zona Media',['altiplano','media']],
 ['c21','Biznaga burra','Planta','Echinocactus platyacanthus','Pr (NOM-059)','Altiplano potosino; uso en dulce de acitrón',['altiplano']],
 ['c22','Palma china','Planta','Yucca filifera','—','Altiplano potosino',['altiplano']],
 ['c23','Lechuguilla','Planta','Agave lechuguilla','—','Matorral chihuahuense; ixtle',[]],
 ['c24','Nopal cardón','Planta','Opuntia streptacantha','—','Nopaleras del Altiplano (tuna)',['altiplano']],
 ['c25','Gobernadora','Planta','Larrea tridentata','—','Matorral desértico del N de SLP',['altiplano']],
 ['c26','Sabino','Árbol','Taxodium mucronatum','—','Riberas (ríos de la Huasteca y Zona Media); árbol nacional',['huasteca','media']],
 ['c27','Ceiba','Árbol','Ceiba pentandra','—','Huasteca potosina',['huasteca']],
 ['c28','Encino','Árbol','Quercus spp.','—','Sierras de Álvarez, San Miguelito, Sierra Gorda',['centro']],
 ['c29','Cempasúchil','Planta','Tagetes erecta','— (nativa, cultivada)','Cultivo para Xantolo en la Huasteca',['huasteca']]
].map(a=>({id:a[0],nombre:a[1],grupo:a[2],cientifico:a[3],estatus:a[4],distribucion:a[5],regiones:a[6]}));
/* Regiones: fuentes en README (Wikipedia "Regiones de San Luis Potosí"; SEDECO SLP; INEGI Marco Geoestadístico 2023). */
window.REGIONES={
 altiplano:{nombre:'Altiplano',color:'#D99E4C',sede:'Matehuala',municipios:15,
  texto:'La mayor de las regiones. Zona norte del estado, en gran parte del área conocida como "El Salado"; altura media aprox. 2,221 m s. n. m. Clima seco estepario, con escasas lluvias en el extremo norte.'},
 centro:{nombre:'Centro',color:'#8DB35A',sede:'San Luis Potosí',municipios:11,
  texto:'Región donde se ubica la capital del estado. Se encuentra al sur del Altiplano y al oeste de la Zona Media. (11 municipios según SEDECO; 12 con Villa de Pozos, creado en 2024.)'},
 media:{nombre:'Media',color:'#4D9E8C',sede:'Rioverde',municipios:12,
  texto:'Clima predominante seco estepario y templado lluvioso. Terreno accidentado entre 2 sierras de gran tamaño; de ~840 m s. n. m. en el valle del río Verde a poco más de 1,600 m en Alaquines, Cárdenas y Ciudad del Maíz.'},
 huasteca:{nombre:'Huasteca',color:'#228C40',sede:'[POR DEFINIR]',municipios:20,
  texto:'Se destaca por la ganadería, el turismo y la gastronomía; es la zona con mayor turismo del estado.'}
};
