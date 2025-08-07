# Cubo di Rubik 3D Interattivo

Un'implementazione web interattiva del classico Cubo di Rubik utilizzando JavaScript vanilla e Three.js per la grafica 3D.

## 🎮 Caratteristiche

- **Cubo 3D Interattivo**: Visualizzazione realistica del cubo di Rubik con animazioni fluide
- **Controlli Intuitivi**: Ruota le facce del cubo con mouse/touch
- **Timer Integrato**: Cronometra i tuoi tempi di risoluzione
- **Sistema di Punteggi**: Traccia le tue performance e migliori tempi
- **Temi Personalizzabili**: Scegli tra diversi temi di colore
- **Configurazioni Multiple**: Supporta cubi di diverse dimensioni (2x2, 3x3, 4x4, 5x5)
- **Scramble Automatico**: Mescola automaticamente il cubo per nuove sfide
- **Statistiche Dettagliate**: Visualizza le tue statistiche di gioco
- **Responsive Design**: Funziona su desktop e dispositivi mobili

## 🚀 Come Iniziare

1. Clona o scarica il repository
2. Apri `index.html` in un browser web moderno
3. Inizia a giocare!

## 🎯 Come Giocare

1. **Avvia una Nuova Partita**: Con un doppio click (o tap) sulla scacchiera centrale avvia una nuova partita
2. **Ruota le Facce**: Clicca e trascina sulle facce del cubo per ruotarle
3. **Cronometra**: Il timer si avvia automaticamente alla prima mossa
4. **Risolvi**: Cerca di riportare tutte le facce al loro colore originale
5. **Visualizza Statistiche**: Controlla i tuoi tempi e miglioramenti con il pulsante "Statistiche"
6. **Personalizza**: Scegli il tema, la dimensione del cubo e la configurazione di scramble preferita con il pulsante "Opzioni"

## 🛠️ Struttura del Progetto

```
CuboDiRubik/
├── index.html          # File HTML principale
├── assets/
│   ├── css/
│   │   ├── style.css   # Stili CSS compilati
│   │   └── style.sass  # File sorgente SASS
│   └── js/
│       └── script.js   # Logica principale del gioco
└── README.md           # Questo file
```

## 🔧 Tecnologie Utilizzate

- **HTML5**: Struttura della pagina
- **CSS3/SASS**: Styling e animazioni
- **JavaScript ES6+**: Logica del gioco
- **Three.js**: Rendering 3D e animazioni
- **LocalStorage**: Salvataggio delle preferenze e statistiche

## 📱 Compatibilità

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Dispositivi mobili iOS/Android

## 🎨 Personalizzazione

### Temi

Il gioco include diversi temi di colore preimpostati. Puoi personalizzare i colori modificando la sezione `Themes` nel file `script.js`.

### Dimensioni del Cubo

Supporta cubi di diverse dimensioni:

- 2x2x2 (Pocket Cube)
- 3x3x3 (Cubo di Rubik classico)
- 4x4x4 (Revenge Cube)
- 5x5x5 (Professor Cube)

### Configurazioni di Scramble

- Facile: 10 mosse
- Medio: 25 mosse
- Difficile: 50 mosse

## 🏆 Sistema di Punteggi

- Tracciamento automatico dei tempi di risoluzione
- Salvataggio del miglior tempo personale
- Statistiche dettagliate delle performance
- Cronologia delle ultime 100 risoluzioni

## 🔄 Miglioramenti Recenti

- ✅ Correzione bug nel sistema di punteggi
- ✅ Gestione migliorata degli errori
- ✅ Ottimizzazione delle performance
- ✅ Aggiunta costanti per evitare magic numbers
- ✅ Gestione sicura dei timeout e callback
- ✅ Validazione dei parametri nelle classi principali

## 🤝 Contribuire

I contributi sono benvenuti! Sentiti libero di:

- Segnalare bug
- Suggerire nuove funzionalità
- Migliorare il codice esistente
- Aggiungere nuovi temi o configurazioni

## 📄 Licenza

Questo progetto è open source e disponibile sotto la licenza MIT.

## 🎯 Roadmap Futura

- [ ] Modalità multiplayer online
- [ ] Tutorial interattivo per principianti
- [ ] Algoritmi di risoluzione automatica
- [ ] Esportazione/importazione delle configurazioni
- [ ] Modalità sfida con obiettivi specifici
- [ ] Integrazione con social media per condividere i risultati

---

**Divertiti a risolvere il cubo! 🧩**
