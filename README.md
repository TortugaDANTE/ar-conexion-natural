# Conexión Natural · Memorama en RA (Agenda Ambiental UASLP)
Tercera app RA de la serie (después de *Separa tus residuos* y *El ciclo del agua en mi casa*).
- `index.html`: RA con cámara (MindAR 1.2.5 + A-Frame 1.5). Apunta al cartel: las cartas flotan sobre la ilustración. Modo Pared/Mesa/Auto.
- `visor.html`: mismo juego sin cámara.
- **Memorama** (misma dinámica del juego físico): voltea dos cartas; si forman par se quedan descubiertas, sumas puntos y la especie se **desbloquea en el Mapa de SLP**; si no, se vuelven a voltear. Tableros: Fácil 3×4 (6 pares), Medio 4×4 (8), Difícil 4×6 (12). Puntos (+100 por par, +50 por racha, bono de tiempo), movimientos y tiempo.
- **Mapa de SLP**: modelo 3D flotante del estado en sus 4 regiones (Altiplano, Centro, Media, Huasteca). Pines por especie: bloqueados = "?", desbloqueados = carta. Toca región → infografía de la región; toca pin → carta de la especie. Arrastra para girar, pellizca para zoom. Progreso guardado en `localStorage` (botón *Reiniciar progreso*).

## Material y fuentes
- Cartas (imágenes y nombres) y reverso: `Memorama_Conexion_Natural_FINAL.pdf` (Agenda Ambiental UASLP), recortadas sin alterar → `js/cartas.js`. Portada: lona promocional `CN_Lona_100x50_FINAL` → `js/portada.js`.
- Datos de especies (grupo, nombre científico, estatus NOM-059/UICN, distribución en SLP): tabla de especies del proyecto (`especies_slp.csv`). Región = solo la que menciona esa distribución; si no la precisa → **[POR DEFINIR]** (no se ubica en el mapa).
- Contorno y municipios: **INEGI, Marco Geoestadístico 2023** (GeoJSON vía https://github.com/PhantomInsights/mexico-geojson). Agrupación en regiones: *Regiones de San Luis Potosí* (es.wikipedia.org/wiki/Regiones_de_San_Luis_Potosí) y SEDECO SLP (sedeco.slp.gob.mx). Modelo generado con `tools/mapa.py` (simplificado, extruido, ~38 KB).
- Textos de regiones: Wikipedia (Regiones de SLP) y SEDECO SLP; superficie y municipios del estado: Periódico Oficial del Estado de SLP.
- Logos UASLP y Agenda Ambiental: sin modificar (solo escala).

## Archivos
`targets/cartel.mind.b64` = marcador (ilustración ancla del cartel, base64 de .mind). `models/slp_regiones.gltf` (embebido). `data/regiones_geo.json` (centros y ranuras de pines). Todo es texto, listo para GitHub Pages.

Contacto: Agenda Ambiental UASLP · ext. 7200 y 7210. Uso educativo.
