/* Infografías por especie (ficha azul al hacer par).
   Campos: hab=hábitat, ali=alimentación, tam=tamaño, dato=rol ecológico/dato curioso, ame=amenaza principal.
   Datos generales y bien documentados de: CONABIO-EncicloVida (enciclovida.mx), NaturaLista (naturalista.mx),
   UICN Lista Roja (iucnredlist.org), NOM-059-SEMARNAT-2010 (estatus ya en datos.js). [POR DEFINIR] = sin fuente verificada.
   F = fuentes por especie (E=EncicloVida, N=NaturaLista, U=UICN Lista Roja, C=CONABIO fichas/Biodiversidad Mexicana). */
window.FICHAS={
c00:{hab:'Selva baja y cañones con paredes rocosas',ali:'Semillas, frutos y flores',tam:'~70 cm de largo',dato:'Anida en colonias en sótanos y acantilados',ame:'Pérdida de hábitat y tráfico ilegal',F:'E,N,U'},
c01:{hab:'Selvas tropicales y bosques ribereños',ali:'Frutos, semillas y flores',tam:'~33 cm de largo',dato:'Endémico del noreste de México',ame:'Captura para mascota y deforestación',F:'E,N,U'},
c02:{hab:'Selvas altas y medianas',ali:'Frutos; también insectos y huevos',tam:'~50 cm (pico ~15 cm)',dato:'Dispersa semillas de árboles de la selva',ame:'Deforestación y tráfico ilegal',F:'E,N,U'},
c03:{hab:'Matorrales, bordes de selva y huertos',ali:'Frutos, hojas, brotes e insectos',tam:'~55 cm de largo',dato:'Su canto ruidoso al amanecer le da nombre',ame:'[POR DEFINIR]',F:'E,N,U'},
c04:{hab:'Pastizales, matorral y zonas montañosas abiertas',ali:'Liebres, conejos, ardillas y otros vertebrados',tam:'Envergadura ~2 m',dato:'Símbolo del escudo nacional de México',ame:'Electrocución, envenenamiento y pérdida de hábitat',F:'E,N,U'},
c05:{hab:'Matorral desértico y pastizales',ali:'Insectos, lagartijas, serpientes y roedores',tam:'~55 cm de largo',dato:'Corre a más de 30 km/h',ame:'[POR DEFINIR]',F:'E,N,U'},
c06:{hab:'Matorrales, bordes de bosque y jardines',ali:'Semillas, frutos e insectos',tam:'~22 cm de largo',dato:'El macho es rojo; la hembra pardo-rojiza',ame:'Captura para venta como ave de ornato',F:'E,N,U'},
c07:{hab:'Matorral árido, cañadas y jardines',ali:'Néctar e insectos pequeños',tam:'~9 cm de largo',dato:'Poliniza flores tubulares',ame:'[POR DEFINIR]',F:'E,N,U'},
c08:{hab:'Áreas abiertas, pastizales y orillas de caminos',ali:'Insectos, roedores y lagartijas',tam:'~25 cm; el halcón más pequeño de América',dato:'Se cierne en el aire antes de cazar',ame:'[POR DEFINIR]',F:'E,N,U'},
c09:{hab:'Bosques, matorrales y cañadas',ali:'Roedores, conejos, aves y otros vertebrados',tam:'~55 cm; envergadura ~1.3 m',dato:'Cazador nocturno; controla roedores',ame:'[POR DEFINIR]',F:'E,N,U'},
c10:{hab:'Zonas con algodoncillo; migra en otoño',ali:'Oruga: algodoncillo (Asclepias); adulto: néctar',tam:'Envergadura ~10 cm',dato:'Migra miles de km hasta México',ame:'Pérdida de hábitat invernal y de algodoncillo',F:'E,N,U,C'},
c11:{hab:'Selvas y bosques tropicales; meliponarios',ali:'Néctar y polen',tam:'~6 mm',dato:'Su miel se aprovecha desde tiempos prehispánicos',ame:'Deforestación y plaguicidas',F:'E,N,C'},
c12:{hab:'Sobre nopales (Opuntia)',ali:'Savia del nopal',tam:'~5 mm (hembra)',dato:'Produce ácido carmínico, colorante rojo',ame:'[POR DEFINIR]',F:'E,N,C'},
c13:{hab:'Matorral y zonas semiáridas',ali:'Néctar, mielecilla de pulgones e insectos',tam:'[POR DEFINIR]',dato:'Sus larvas y pupas son los escamoles',ame:'Sobrecosecha de escamoles',F:'E,N,C'},
c14:{hab:'Milpas, pastizales y matorrales',ali:'Hojas de plantas',tam:'[POR DEFINIR]',dato:'Se consume tostado en la cocina mexicana',ame:'[POR DEFINIR]',F:'E,N'},
c15:{hab:'Bosques húmedos y selvas',ali:'Larva: madera en descomposición; adulto: savia y frutos',tam:'[POR DEFINIR]',dato:'El macho tiene cuernos para pelear',ame:'[POR DEFINIR]',F:'E,N'},
c16:{hab:'Pastizales y bosques húmedos',ali:'Larvas: caracoles y gusanos',tam:'[POR DEFINIR]',dato:'Produce luz (bioluminiscencia) para cortejar',ame:'Contaminación lumínica y plaguicidas',F:'E,N'},
c17:{hab:'[POR DEFINIR]',ali:'Insectos (depredador)',tam:'[POR DEFINIR]',dato:'Caza con sus patas delanteras prensiles',ame:'[POR DEFINIR]',F:'N'},
c18:{hab:'Selvas, bordes de bosque y jardines',ali:'Oruga: pasifloras; adulto: néctar y polen',tam:'Envergadura ~8 cm',dato:'Puede alimentarse de polen; vive varios meses',ame:'[POR DEFINIR]',F:'E,N'},
c19:{hab:'Matorrales, bosques y jardines',ali:'Néctar y polen',tam:'[POR DEFINIR]',dato:'Hace su nido perforando madera',ame:'[POR DEFINIR]',F:'E,N'},
c20:{hab:'Matorral y planicies semiáridas',ali:'Planta (fija nitrógeno)',tam:'Árbol o arbusto de hasta ~10 m',dato:'Sus vainas alimentan fauna y ganado',ame:'Tala para leña y carbón',F:'E,N,C'},
c21:{hab:'Matorral desértico del Altiplano',ali:'Planta',tam:'Hasta ~2 m de alto',dato:'Una de las biznagas más grandes; crece muy lento',ame:'Saqueo y uso para dulce de acitrón',F:'E,N,U'},
c22:{hab:'Matorral y planicies del Altiplano',ali:'Planta',tam:'Hasta ~10 m de alto',dato:'Sus flores son comestibles',ame:'[POR DEFINIR]',F:'E,N'},
c23:{hab:'Matorral desértico chihuahuense',ali:'Planta',tam:'Roseta de ~50 cm',dato:'De sus hojas se extrae fibra (ixtle)',ame:'[POR DEFINIR]',F:'E,N,C'},
c24:{hab:'Matorral y nopaleras del Altiplano',ali:'Planta',tam:'Hasta ~4 m de alto',dato:'Produce tuna cardona, alimento de fauna',ame:'[POR DEFINIR]',F:'E,N'},
c25:{hab:'Matorral desértico',ali:'Planta',tam:'Arbusto de 1-3 m',dato:'Huele a creosota tras la lluvia',ame:'[POR DEFINIR]',F:'E,N'},
c26:{hab:'Orillas de ríos y manantiales',ali:'Planta',tam:'Árbol de hasta ~40 m',dato:'Árbol nacional de México (ahuehuete)',ame:'Desecación de ríos y manantiales',F:'E,N,C'},
c27:{hab:'Selvas tropicales',ali:'Planta',tam:'Árbol de hasta ~50 m',dato:'Árbol sagrado maya; fibra de sus frutos (kapok)',ame:'[POR DEFINIR]',F:'E,N'},
c28:{hab:'Bosques templados de sierras',ali:'Planta',tam:'Árboles o arbustos según especie',dato:'México tiene gran diversidad de encinos',ame:'Tala y cambio de uso de suelo',F:'E,N,C'},
c29:{hab:'Cultivos y zonas abiertas',ali:'Planta',tam:'Hasta ~1 m de alto',dato:'Flor tradicional del Día de Muertos',ame:'[POR DEFINIR]',F:'E,N,C'}
};
window.FICHAS_FUENTES={E:'CONABIO · EncicloVida (enciclovida.mx)',N:'NaturaLista (naturalista.mx)',U:'UICN Lista Roja (iucnredlist.org)',C:'CONABIO · Biodiversidad Mexicana (biodiversidad.gob.mx)'};
