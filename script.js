// --- 1. CONTROLES GLOBAIS E DO HUB / GLOBAL & HUB CONTROLS ---

// PT: Seleciona os principais elementos da interface para manipulação.
// EN: Selects the main UI elements for manipulation.
const hubScreen = document.getElementById('hub-screen');
const languageGameWrapper = document.getElementById('language-game-wrapper');
const robotGameWrapper = document.getElementById('robot-game-wrapper');
const bodyEl = document.querySelector('body');
const themeToggleButton = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const langSelector = document.getElementById('lang-selector');
const langSlider = document.getElementById('lang-slider');
let confettiInterval; 

// PT: Funções que controlam a exibição de cada tela principal do aplicativo.
// EN: Functions that control the display of each main screen of the application.
function showHub() {
    if (robotGame.gameStarted && !robotGame.gameOver) {
        robotGame.gameOver = true;
    }
    langSelector.classList.remove('hidden');
    hubScreen.classList.remove('hidden');
    languageGameWrapper.classList.add('hidden');
    robotGameWrapper.classList.add('hidden');
}

function showLanguageGame() {
    langSelector.classList.remove('hidden');
    hubScreen.classList.add('hidden');
    languageGameWrapper.classList.remove('hidden');
    robotGameWrapper.classList.add('hidden');
    languageGame.showScreen('language-screen');
}

function showRobotGame() {
    langSelector.classList.remove('hidden'); 
    hubScreen.classList.add('hidden');
    languageGameWrapper.classList.add('hidden');
    robotGameWrapper.classList.remove('hidden');
    robotGame.showInitialScreen();
}

// --- LÓGICA DO MODO ESCURO / DARK MODE LOGIC ---

// PT: Atualiza os ícones de sol/lua com base no tema ativo.
// EN: Updates the sun/moon icons based on the active theme.
function updateThemeIcons() {
    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.add('hidden');
        themeToggleDarkIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.add('hidden');
        themeToggleLightIcon.classList.remove('hidden');
    }
}

// PT: Adiciona o evento de clique para alternar o tema e salvar a preferência.
// EN: Adds the click event to toggle the theme and save the preference.
themeToggleButton.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    document.documentElement.classList.toggle('light');

    if (localStorage.getItem('theme') === 'dark') {
        localStorage.setItem('theme', 'light');
    } else {
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcons();
});

// --- LÓGICA DO EFEITO DE CONFETES NO HUB / HUB CONFETTI EFFECT LOGIC ---

// PT: Inicia a animação contínua de confetes atrás do card.
// EN: Starts the continuous confetti animation behind the card.
function startCardConfetti(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const originX = (rect.left + rect.width / 2) / window.innerWidth;
    const originY = (rect.top + rect.height / 2) / window.innerHeight;

    stopCardConfetti(); 
    confettiInterval = setInterval(() => {
        confetti({
            particleCount: 20,
            startVelocity: 20,
            spread: 60,
            origin: { x: originX, y: originY },
            shapes: ['circle'],
            gravity: 0,
            drift: Math.random() * 2 - 1,
            zIndex: 1 
        });
    }, 250);
}

// PT: Para a animação de confetes quando o mouse sai do card.
// EN: Stops the confetti animation when the mouse leaves the card.
function stopCardConfetti() {
    clearInterval(confettiInterval);
}


// --- 2. LÓGICA DO JOGO DE IDIOMAS (INCLUI TRADUÇÃO) / LANGUAGE GAME LOGIC (INCLUDES TRANSLATION) ---

const languageGame = {
    data: {
        de: {
            foods: [{ word: 'Banane', emoji: '🍌' }, { word: 'Apfel', emoji: '🍎' }, { word: 'Keks', emoji: '🍪' }, { word: 'Brokkoli', emoji: '🥦' }, { word: 'Sandwich', emoji: '🥪' }, { word: 'Spaghetti', emoji: '🍝' }, { word: 'Kuchen', emoji: '🥧' }, { word: 'Eier', emoji: '🥚' }, { word: 'Pizza', emoji: '🍕' }, { word: 'Salat', emoji: '🥗' }, { word: 'Karotte', emoji: '🥕' }, { word: 'Eis', emoji: '🍦' }, { word: 'Suppe', emoji: '🥣' }, { word: 'Popcorn', emoji: '🍿' }, { word: 'Torte', emoji: '🎂' }, { word: 'Saft', emoji: '🧃' }, { word: 'Wasser', emoji: '💧' }],
            colors: [{ word: 'Rot', color: '#ef4444' }, { word: 'Blau', color: '#3b82f6' }, { word: 'Grün', color: '#22c55e' }, { word: 'Gelb', color: '#eab308' }, { word: 'Orange', color: '#f97316' }, { word: 'Lila', color: '#8b5cf6' }, { word: 'Schwarz', color: '#000000' }, { word: 'Weiß', color: '#ffffff' }],
            objects: [{ word: 'Ball', emoji: '⚽️' }, { word: 'Auto', emoji: '🚗' }, { word: 'Buch', emoji: '📖' }, { word: 'Stuhl', emoji: '🪑' }, { word: 'Tisch', emoji: '🪵' }, { word: 'Haus', emoji: '🏠' }, { word: 'Schlüssel', emoji: '🔑' }, { word: 'Uhr', emoji: '⏰' }],
            animals: [{ word: 'Hund', emoji: '🐶' }, { word: 'Katze', emoji: '🐱' }, { word: 'Löwe', emoji: '🦁' }, { word: 'Pferd', emoji: '🐴' }, { word: 'Fisch', emoji: '🐠' }, { word: 'Vogel', emoji: '🐦' }, { word: 'Kuh', emoji: '🐮' }, { word: 'Affe', emoji: '🐵' }]
        },
        en: {
            foods: [{ word: 'Banana', emoji: '🍌' }, { word: 'Apple', emoji: '🍎' }, { word: 'Cookie', emoji: '🍪' }, { word: 'Broccoli', emoji: '🥦' }, { word: 'Sandwich', emoji: '🥪' }, { word: 'Spaghetti', emoji: '🍝' }, { word: 'Pie', emoji: '🥧' }, { word: 'Eggs', emoji: '🥚' }, { word: 'Pizza', emoji: '🍕' }, { word: 'Salad', emoji: '🥗' }, { word: 'Carrot', emoji: '🥕' }, { word: 'Ice Cream', emoji: '🍦' }, { word: 'Soup', emoji: '🥣' }, { word: 'Popcorn', emoji: '🍿' }, { word: 'Cake', emoji: '🎂' }, { word: 'Juice', emoji: '🧃' }, { word: 'Water', emoji: '💧' }],
            colors: [{ word: 'Red', color: '#ef4444' }, { word: 'Blue', color: '#3b82f6' }, { word: 'Green', color: '#22c55e' }, { word: 'Yellow', color: '#eab308' }, { word: 'Orange', color: '#f97316' }, { word: 'Purple', color: '#8b5cf6' }, { word: 'Black', color: '#000000' }, { word: 'White', color: '#ffffff' }],
            objects: [{ word: 'Ball', emoji: '⚽️' }, { word: 'Car', emoji: '🚗' }, { word: 'Book', emoji: '📖' }, { word: 'Chair', emoji: '🪑' }, { word: 'Table', emoji: '🪵' }, { word: 'House', emoji: '🏠' }, { word: 'Key', emoji: '🔑' }, { word: 'Clock', emoji: '⏰' }],
            animals: [{ word: 'Dog', emoji: '🐶' }, { word: 'Cat', emoji: '🐱' }, { word: 'Lion', emoji: '🦁' }, { word: 'Horse', emoji: '🐴' }, { word: 'Fish', emoji: '🐠' }, { word: 'Bird', emoji: '🐦' }, { word: 'Cow', emoji: '🐮' }, { word: 'Monkey', emoji: '🐵' }]
        }
    },
    translations: {
        pt: {
            hub_title: "Hub de Jogos", hub_subtitle: "Escolha uma aventura para começar!", lang_game_title: "Jogo de Idiomas", lang_game_desc: "Aprenda novas palavras em inglês e alemão de forma divertida.", robot_game_title: "Aventura de Pulos", robot_game_desc: "Ajude o robô a desviar dos monstros e coletar moedas.", back_to_hub: "Voltar ao Hub", german: "Alemão", english: "Inglês", robot_game_title_ingame: "Aventura de Pulos", robot_game_instructions: "Use ESPAÇO, ENTER (OK no controle) ou o TOQUE para pular!", start_game_robot: "Iniciar Jogo", score: "Pontos", level: "Nível", coins: "Moedas",
            choose_language_title: 'Escolha o Idioma para Aprender',
            select_category: 'Escolha uma Categoria', foods: 'Alimentos', colors: 'Cores', objects: 'Objetos', animals: 'Animais',
            dictation_practice: 'Prática', category: 'Categoria', dictation_mode_1p: 'Modo Ditado (1 Jogador)',
            reading_mode_1p: 'Modo Leitura (1 Jogador)', multiplayer_mode: '🎉 Modo Multiplayer 🎉', change_category: 'Mudar Categoria',
            single_player_setup: 'Configurar Jogo', choose_avatar_sp: 'Escolha seu nome e avatar:',
            multiplayer_setup: 'Configurar Jogo Multiplayer', how_many_players: '1. Quantos jogadores?',
            players_2: '2 Jogadores', players_3: '3 Jogadores', players_4: '4 Jogadores', which_game_mode: '2. Qual modo de jogo?',
            dictation_mode: 'Modo Ditado', reading_mode: 'Modo Leitura', choose_avatars: '3. Escolham seus nomes e avatares:',
            player: 'Jogador', type_name: 'Digite o nome', back: '← Voltar', start_game: 'Começar Jogo!', back_to_menu: '← Voltar ao Menu',
            turn_of: 'É a vez de', question_of: 'Questão {x} de {y}', correct: 'Certo! 👍', incorrect: 'Errado! 😢',
            next_turn: 'Próximo Turno →', game_over: 'Fim de Jogo!', final_report: 'Relatório Final:',
            winner: 'Vencedor:', tie: 'Empate!', final_score: 'Pontuação final: {x} de {y} acertos!',
            review_words: 'Palavras para revisar:', all_correct: 'Acertou tudo! 🥳', play_again: 'Jogar Novamente',
            say_the_word: 'Diga a palavra:', click_correct_figure: 'Agora, clique na figura correta!',
            what_food_is_this: 'Qual item é este?'
        },
        en: {
            hub_title: "Game Hub", hub_subtitle: "Choose an adventure to begin!", lang_game_title: "Language Game", lang_game_desc: "Learn new words in English and German in a fun way.", robot_game_title: "Jumping Adventure", robot_game_desc: "Help the robot dodge monsters and collect coins.", back_to_hub: "Back to Hub", german: "German", english: "English", robot_game_title_ingame: "Jumping Adventure", robot_game_instructions: "Use SPACE, ENTER (OK on remote) or TOUCH to jump!", start_game_robot: "Start Game", score: "Score", level: "Level", coins: "Coins",
            choose_language_title: 'Choose the Language to Learn',
            select_category: 'Choose a Category', foods: 'Foods', colors: 'Colors', objects: 'Objects', animals: 'Animals',
            dictation_practice: 'Practice', category: 'Category', dictation_mode_1p: 'Dictation Mode (1 Player)',
            reading_mode_1p: 'Reading Mode (1 Player)', multiplayer_mode: '🎉 Multiplayer Mode 🎉', change_category: 'Change Category',
            single_player_setup: 'Game Setup', choose_avatar_sp: 'Choose your name and avatar:',
            multiplayer_setup: 'Multiplayer Game Setup', how_many_players: '1. How many players?',
            players_2: '2 Players', players_3: '3 Players', players_4: '4 Players', which_game_mode: '2. Which game mode?',
            dictation_mode: 'Dictation Mode', reading_mode: 'Reading Mode', choose_avatars: '3. Choose your names and avatars:',
            player: 'Player', type_name: 'Enter name', back: '← Back', start_game: 'Start Game!', back_to_menu: '← Back to Menu',
            turn_of: "It's", question_of: 'Question {x} of {y}', correct: 'Correct! 👍', incorrect: 'Wrong! 😢',
            next_turn: 'Next Turn →', game_over: 'Game Over!', final_report: 'Final Report:',
            winner: 'Winner:', tie: 'It\'s a Tie!', final_score: 'Final score: {x} of {y} correct!',
            review_words: 'Words to review:', all_correct: 'You got everything right! 🥳', play_again: 'Play Again',
            say_the_word: 'Say the word:', click_correct_figure: 'Now, click the correct figure!',
            what_food_is_this: 'What item is this?'
        },
        es: {
            hub_title: "Centro de Juegos", hub_subtitle: "¡Elige una aventura para empezar!", lang_game_title: "Juego de Idiomas", lang_game_desc: "Aprende nuevas palabras en inglés y alemán de forma divertida.", robot_game_title: "Aventura de Saltos", robot_game_desc: "Ayuda al robot a esquivar monstruos y recoger monedas.", back_to_hub: "Volver al Centro", german: "Alemán", english: "Inglés", robot_game_title_ingame: "Aventura de Saltos", robot_game_instructions: "¡Usa ESPACIO, ENTER (OK en el control) o TOQUE para saltar!", start_game_robot: "Empezar Juego", score: "Puntos", level: "Nivel", coins: "Monedas",
            choose_language_title: 'Elige el Idioma para Aprender',
            select_category: 'Elige una Categoría', foods: 'Alimentos', colors: 'Colores', objects: 'Objetos', animals: 'Animales',
            dictation_practice: 'Práctica', category: 'Categoría', dictation_mode_1p: 'Modo Dictado (1 Jugador)',
            reading_mode_1p: 'Modo Lectura (1 Jugador)', multiplayer_mode: '🎉 Modo Multijugador 🎉', change_category: 'Cambiar Categoría',
            single_player_setup: 'Configurar Juego', choose_avatar_sp: 'Elige tu nombre y avatar:',
            multiplayer_setup: 'Configurar Juego Multijugador', how_many_players: '1. ¿Cuántos jugadores?',
            players_2: '2 Jugadores', players_3: '3 Jugadores', players_4: '4 Jugadores', which_game_mode: '2. ¿Qué modo de juego?',
            dictation_mode: 'Modo Dictado', reading_mode: 'Modo Lectura', choose_avatars: '3. Elijan sus nombres y avatares:',
            player: 'Jugador', type_name: 'Escribe el nombre', back: '← Volver', start_game: '¡Empezar Juego!', back_to_menu: '← Volver al Menú',
            turn_of: 'Es el turno de', question_of: 'Pregunta {x} de {y}', correct: '¡Correcto! 👍', incorrect: '¡Incorrecto! 😢',
            next_turn: 'Siguiente Turno →', game_over: '¡Fin del Juego!', final_report: 'Reporte Final:',
            winner: 'Ganador:', tie: '¡Empate!', final_score: 'Puntuación final: ¡{x} de {y} aciertos!',
            review_words: 'Palavras para repasar:', all_correct: '¡Acertaste todo! 🥳', play_again: 'Jugar de Nuevo',
            say_the_word: 'Di la palabra:', click_correct_figure: '¡Ahora, haz clic en la figura correcta!',
            what_food_is_this: '¿Qué artículo es este?'
        }
    },
    avatars: [ '🦁', '🦄', '🦒', '🐬' ],
    gameState: {},
    allScreens: ['language-screen', 'category-screen', 'start-screen', 'single-player-setup-screen', 'multiplayer-setup-screen', 'game-screen', 'end-screen'],
    myConfetti: null,

    // PT: Inicializa o jogo de idiomas, define o idioma da UI e adiciona eventos.
    // EN: Initializes the language game, sets the UI language, and adds events.
    init: function() {
        this.myConfetti = confetti.create(document.getElementById('confetti-canvas'), { resize: true, useWorker: true });
        document.getElementById('next-btn').addEventListener('click', () => this.nextTurn());

        const savedLang = localStorage.getItem('uiLang') || 'pt';
        this.setUILanguage(savedLang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setUILanguage(btn.dataset.lang));
        });
    },

    // PT: Atalho para obter um elemento pelo seu ID.
    // EN: Shortcut to get an element by its ID.
    getEl: function(id) { return document.getElementById(id); },

    // PT: Define o idioma da interface, traduz os textos e move o slider.
    // EN: Sets the UI language, translates texts, and moves the slider.
    setUILanguage: function(lang) {
        localStorage.setItem('uiLang', lang);
        this.gameState.uiLang = lang;

        document.querySelectorAll('[data-translate-key]').forEach(el => {
            const key = el.getAttribute('data-translate-key');
            if (this.translations[lang] && this.translations[lang][key]) {
                el.innerHTML = this.translations[lang][key];
            }
        });

        const langPositions = { 'pt': 0, 'en': 1, 'es': 2 };
        const position = langPositions[lang] * 100;
        langSlider.style.transform = `translateX(${position}%)`;


        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        if (this.gameState.lang) {
            this.selectLanguage(this.gameState.lang);
        }
        if (this.gameState.category) {
             this.getEl('start-screen-category').innerText = `${this.translations[lang].category}: ${this.translations[lang][this.gameState.category]}`;
        }
    },
    
    // PT: Controla a visibilidade das diferentes telas do jogo de idiomas.
    // EN: Controls the visibility of the different screens in the language game.
    showScreen: function(screenId) {
        this.allScreens.forEach(id => this.getEl(id).classList.add('hidden'));
        this.getEl(screenId).classList.remove('hidden');
    },
    
    // PT: Seleciona o idioma a ser aprendido e monta a tela de categorias.
    // EN: Selects the language to be learned and builds the category screen.
    selectLanguage: function(lang) {
        this.gameState.lang = lang;
        const uiLang = this.gameState.uiLang || 'pt';
        
        const categoryButtons = this.getEl('category-buttons');
        categoryButtons.innerHTML = '';
        Object.keys(this.data[lang]).forEach(categoryKey => {
            const categoryName = this.translations[uiLang][categoryKey];
            categoryButtons.innerHTML += `<button onclick="languageGame.selectCategory('${categoryKey}')" class="btn w-full bg-white hover:bg-stone-50 text-indigo-600 font-bold py-8 lg:py-12 px-6 rounded-xl shadow-md text-2xl lg:text-3xl">${categoryName}</button>`;
        });
        const playerCountSelect = this.getEl('player-count');
        playerCountSelect.innerHTML = `<option value="2">${this.translations[uiLang].players_2}</option><option value="3">${this.translations[uiLang].players_3}</option><option value="4">${this.translations[uiLang].players_4}</option>`;
        this.showScreen('category-screen');
    },
    
    // PT: Seleciona a categoria de palavras e vai para o menu principal do jogo.
    // EN: Selects the word category and goes to the main game menu.
    selectCategory: function(category) {
        this.gameState.category = category;
        this.gameState.words = this.data[this.gameState.lang][category];
        const uiLang = this.gameState.uiLang || 'pt';
        this.getEl('start-screen-category').innerText = `${this.translations[uiLang].category}: ${this.translations[uiLang][category]}`;
        this.showScreen('start-screen');
    },
    
    // PT: Retorna para a tela de menu do jogo.
    // EN: Returns to the game menu screen.
    showStartScreen: function() { this.showScreen('start-screen'); },
    
    // PT: Mostra a tela de configuração para o modo de um jogador.
    // EN: Shows the setup screen for single-player mode.
    showSinglePlayerSetup: function(mode) {
        this.gameState.mode = mode;
        const nameInput = this.getEl('single-player-name');
        const avatarContainer = this.getEl('single-player-avatars');
        
        nameInput.value = '';
        nameInput.placeholder = this.translations[this.gameState.uiLang].player + ' 1';

        avatarContainer.innerHTML = '';
        this.avatars.forEach((avatar, index) => {
            avatarContainer.innerHTML += `<button class="avatar-btn btn text-4xl lg:text-5xl p-2 rounded-full ${index === 0 ? 'selected' : ''}" data-avatar="${avatar}" onclick="languageGame.selectSinglePlayerAvatar(this)">${avatar}</button>`;
        });
        this.getEl('single-player-avatar').value = this.avatars[0];
        this.showScreen('single-player-setup-screen');
    },
    
    // PT: Lógica para selecionar um avatar no modo de um jogador.
    // EN: Logic for selecting an avatar in single-player mode.
    selectSinglePlayerAvatar: function(btn) {
        this.getEl('single-player-avatars').querySelectorAll('button').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.getEl('single-player-avatar').value = btn.dataset.avatar;
    },
    
    // PT: Inicia o jogo no modo de um jogador.
    // EN: Starts the game in single-player mode.
    startSinglePlayerGame: function() {
        const uiLang = this.gameState.uiLang;
        const playerName = this.getEl('single-player-name').value || this.translations[uiLang].player + ' 1';
        const playerAvatar = this.getEl('single-player-avatar').value;
        const playerData = { name: playerName, avatar: playerAvatar, score: 0, availableWords: this.shuffleArray(this.gameState.words), incorrectlyAnsweredWords: [] };
        this.startGame(this.gameState.mode, 1, [playerData]);
    },
    
    // PT: Mostra a tela de configuração para o modo multijogador.
    // EN: Shows the setup screen for multiplayer mode.
    showMultiplayerSetup: function() {
        this.showScreen('multiplayer-setup-screen');
        this.generatePlayerInputs(this.getEl('player-count').value);
        this.selectGameMode('dictation');
    },
    
    // PT: Embaralha um array.
    // EN: Shuffles an array.
    shuffleArray: function(array) {
        let newArr = [...array];
        for (let i = newArr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
        }
        return newArr;
    },
    
    // PT: Lógica para selecionar o modo de jogo (ditado ou leitura).
    // EN: Logic for selecting the game mode (dictation or reading).
    selectGameMode: function(mode) {
        this.getEl('multiplayer-game-mode').value = mode;
        const dictationBtn = this.getEl('mode-btn-dictation');
        const readingBtn = this.getEl('mode-btn-reading');
        if (mode === 'dictation') {
            dictationBtn.classList.add('selected', 'border-teal-500', 'bg-teal-50');
            dictationBtn.classList.remove('border-transparent', 'bg-stone-100');
            readingBtn.classList.remove('selected', 'border-amber-500', 'bg-amber-50');
            readingBtn.classList.add('border-transparent', 'bg-stone-100');
        } else {
            readingBtn.classList.add('selected', 'border-amber-500', 'bg-amber-50');
            readingBtn.classList.remove('border-transparent', 'bg-stone-100');
            dictationBtn.classList.remove('selected', 'border-teal-500', 'bg-teal-50');
            dictationBtn.classList.add('border-transparent', 'bg-stone-100');
        }
    },
    
    // PT: Gera os campos de nome e avatar para cada jogador no modo multijogador.
    // EN: Generates the name and avatar fields for each player in multiplayer mode.
    generatePlayerInputs: function(count) {
        const container = this.getEl('player-inputs');
        const uiLang = this.gameState.uiLang;
        container.innerHTML = '';
        for (let i = 0; i < count; i++) {
            const playerHtml = `<div class="p-4 border rounded-lg bg-stone-50/70"><h3 class="font-bold text-lg lg:text-xl text-stone-800 mb-2">${this.translations[uiLang].player} ${i + 1}</h3><input type="text" id="player-name-${i}" placeholder="${this.translations[uiLang].player} ${i + 1}" class="w-full p-3 border border-stone-300 rounded-lg mb-3 lg:text-lg" value=""><div class="flex justify-around">${this.avatars.map((avatar, avatarIndex) => `<button class="avatar-btn btn text-4xl lg:text-5xl p-2 rounded-full ${avatarIndex % this.avatars.length === i ? 'selected' : ''}" data-player="${i}" data-avatar="${avatar}" onclick="languageGame.selectAvatar(this, ${i})">${avatar}</button>`).join('')}</div><input type="hidden" id="player-avatar-${i}" value="${this.avatars[i % this.avatars.length]}"></div>`;
            container.innerHTML += playerHtml;
        }
    },
    
    // PT: Lógica para selecionar um avatar no modo multijogador.
    // EN: Logic for selecting an avatar in multiplayer mode.
    selectAvatar: function(btn, playerIndex) {
        document.querySelectorAll(`button[data-player="${playerIndex}"]`).forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        this.getEl(`player-avatar-${playerIndex}`).value = btn.dataset.avatar;
    },
    
    // PT: Inicia o jogo no modo multijogador.
    // EN: Starts the game in multiplayer mode.
    startMultiplayerGame: function() {
        const playerCount = parseInt(this.getEl('player-count').value);
        const uiLang = this.gameState.uiLang;
        let players = [];
        for (let i = 0; i < playerCount; i++) {
            players.push({ name: this.getEl(`player-name-${i}`).value || `${this.translations[uiLang].player} ${i + 1}`, avatar: this.getEl(`player-avatar-${i}`).value, score: 0, availableWords: this.shuffleArray(this.gameState.words), incorrectlyAnsweredWords: [] });
        }
        const gameMode = this.getEl('multiplayer-game-mode').value;
        this.startGame(gameMode, playerCount, players);
    },
    
    // PT: Função principal que inicializa o estado do jogo.
    // EN: Main function that initializes the game state.
    startGame: function(mode, playerCount, playersData) {
        this.gameState.mode = mode;
        this.gameState.playerCount = playerCount;
        this.gameState.players = playersData;
        this.gameState.currentPlayerIndex = 0;
        this.gameState.totalTurns = 0;
        this.gameState.maxTurns = this.gameState.words.length * playerCount;
        this.showScreen('game-screen');
        this.nextTurn();
    },
    
    // PT: Avança para o próximo turno ou finaliza o jogo.
    // EN: Advances to the next turn or ends the game.
    nextTurn: function() {
        if (this.gameState.totalTurns >= this.gameState.maxTurns) {
            this.showEndScreen();
            return;
        }
        this.getEl('next-btn').classList.add('hidden');
        this.getEl('feedback-message').innerHTML = '';
        this.getEl('question-area').classList.remove('hidden');
        this.updateUI();
        this.generateQuestion();
    },
    
    // PT: Atualiza a interface do jogo com informações do turno atual.
    // EN: Updates the game interface with current turn information.
    updateUI: function() {
        const currentPlayer = this.gameState.players[this.gameState.currentPlayerIndex];
        const questionNumber = this.gameState.words.length - currentPlayer.availableWords.length + 1;
        const uiLang = this.gameState.uiLang;

        if (this.gameState.playerCount > 1) {
            this.getEl('turn-indicator').classList.remove('hidden');
            this.getEl('multiplayer-scoreboard').classList.remove('hidden');
            const turnText = uiLang === 'en' ? `${this.translations[uiLang].turn_of} ${currentPlayer.name}'s turn!` : `${this.translations[uiLang].turn_of} ${currentPlayer.name}`;
            this.getEl('turn-indicator').innerHTML = `<div><span class="text-2xl lg:text-3xl">${currentPlayer.avatar}</span> <span class="text-xl lg:text-2xl font-bold align-middle">${turnText}</span></div><div class="text-md lg:text-lg text-stone-600 font-semibold mt-1">(${this.translations[uiLang].question_of.replace('{x}', questionNumber).replace('{y}', this.gameState.words.length)})</div>`;
            let scoreboardHtml = '';
            this.gameState.players.forEach(p => {
                scoreboardHtml += `<div class="p-2 card-base ${this.gameState.players.indexOf(p) === this.gameState.currentPlayerIndex ? 'ring-2 ring-indigo-500' : ''}"><span class="text-2xl lg:text-4xl">${p.avatar}</span><span class="block font-bold lg:text-2xl">${p.score}</span></div>`;
            });
            this.getEl('multiplayer-scoreboard').innerHTML = scoreboardHtml;
        } else {
            this.getEl('turn-indicator').classList.remove('hidden');
            this.getEl('multiplayer-scoreboard').classList.add('hidden');
            this.getEl('turn-indicator').innerHTML = `<div class="flex items-center justify-center space-x-4 text-lg lg:text-2xl font-semibold"><span>${currentPlayer.avatar} ${currentPlayer.name}</span><span>|</span><span>${this.translations[uiLang].question_of.replace('{x}', questionNumber).replace('{y}', this.gameState.words.length)}</span><span>|</span><span>${currentPlayer.score}</span></div>`;
        }
    },
    
    // PT: Gera a pergunta e as opções de resposta.
    // EN: Generates the question and answer options.
    generateQuestion: function() {
        const currentPlayer = this.gameState.players[this.gameState.currentPlayerIndex];
        const question = currentPlayer.availableWords.pop();
        this.gameState.currentQuestion = question;
        let options = [question];
        let otherWords = this.gameState.words.filter(w => w.word !== question.word);
        otherWords = this.shuffleArray(otherWords);
        const optionsCount = this.gameState.mode === 'dictation' ? 3 : 2;
        for (let i = 0; i < optionsCount; i++) {
            if(otherWords[i]) options.push(otherWords[i]);
        }
        options = this.shuffleArray(options);
        let questionHtml = '';
        const uiLang = this.gameState.uiLang;
        if (this.gameState.mode === 'dictation') {
            questionHtml = `<div class="lg:flex lg:items-center lg:gap-12"><div class="lg:w-1/2 lg:text-center mb-8 lg:mb-0"><p class="text-stone-600 mb-4 text-lg lg:text-xl">${this.translations[uiLang].say_the_word}</p><h2 class="text-4xl md:text-5xl font-bold mb-8">${question.word}</h2><p class="text-stone-600 mb-6 text-lg lg:text-xl">${this.translations[uiLang].click_correct_figure}</p></div><div class="lg:w-1/2 grid grid-cols-2 gap-4">${options.map(opt => { const display = opt.color ? `<div class="w-full h-full rounded-full" style="background-color: ${opt.color}; border: 1px solid #ccc;"></div>` : `<span class="text-5xl md:text-6xl">${opt.emoji}</span>`; return `<button data-word="${opt.word}" class="emoji-btn btn card-base p-4 h-24 md:h-32 lg:h-40 flex items-center justify-center border-4 border-transparent" onclick="languageGame.checkAnswer(this, '${opt.word}')">${display}</button>` }).join('')}</div></div>`;
        } else {
            const display = question.color ? `<div class="w-24 h-24 md:w-32 md:h-32 rounded-full mx-auto" style="background-color: ${question.color}; border: 1px solid #ccc;"></div>` : `<div class="text-8xl md:text-9xl">${question.emoji}</div>`;
            questionHtml = `<div class="lg:flex lg:items-center lg:gap-12"><div class="lg:w-2/5 text-center mb-8 lg:mb-0"><p class="text-stone-600 mb-6 text-lg lg:text-xl">${this.translations[uiLang].what_food_is_this}</p>${display}</div><div class="lg:w-3/5 space-y-3">${options.map(opt => `<button data-word="${opt.word}" class="emoji-btn btn card-base w-full p-4 lg:p-5 text-2xl font-semibold border-4 border-transparent" onclick="languageGame.checkAnswer(this, '${opt.word}')">${opt.word}</button>`).join('')}</div></div>`;
        }
        this.getEl('question-area').innerHTML = questionHtml;
    },
    
    // PT: Verifica se a resposta está correta e atualiza o estado do jogo.
    // EN: Checks if the answer is correct and updates the game state.
    checkAnswer: function(selectedButton, selectedWord) {
        const allButtons = this.getEl('question-area').querySelectorAll('button');
        allButtons.forEach(btn => btn.disabled = true);
        const currentPlayer = this.gameState.players[this.gameState.currentPlayerIndex];
        const uiLang = this.gameState.uiLang;
        if (selectedWord === this.gameState.currentQuestion.word) {
            currentPlayer.score++;
            selectedButton.classList.add('selected-correct');
            this.getEl('feedback-message').innerHTML = `<p class="text-3xl lg:text-4xl font-bold text-green-600">${this.translations[uiLang].correct}</p>`;
            this.myConfetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        } else {
            currentPlayer.incorrectlyAnsweredWords.push(this.gameState.currentQuestion);
            selectedButton.classList.add('selected-incorrect');
            this.getEl('feedback-message').innerHTML = `<p class="text-3xl lg:text-4xl font-bold text-red-600">${this.translations[uiLang].incorrect}</p>`;
            const correctButton = Array.from(allButtons).find(btn => btn.dataset.word === this.gameState.currentQuestion.word);
            if (correctButton) {
                correctButton.classList.add('correct-answer-highlight');
            }
        }
        this.gameState.totalTurns++;
        this.gameState.currentPlayerIndex = (this.gameState.currentPlayerIndex + 1) % this.gameState.playerCount;
        this.getEl('next-btn').classList.remove('hidden');
    },
    
    // PT: Mostra a tela de fim de jogo com o placar e relatório.
    // EN: Shows the game over screen with the scoreboard and report.
    showEndScreen: function() {
        this.showScreen('end-screen');
        const players = this.gameState.players;
        const uiLang = this.gameState.uiLang;
        
        if (this.gameState.playerCount > 1) {
            players.sort((a, b) => b.score - a.score);
            const winnerScore = players[0].score;
            const winners = players.filter(p => p.score === winnerScore);
            let winnerHtml = winners.length > 1 ? `<h3 class="text-2xl lg:text-4xl font-bold text-amber-500 mb-4">${this.translations[uiLang].tie}</h3>` : `<h3 class="text-2xl lg:text-4xl font-bold text-amber-500 mb-4">${this.translations[uiLang].winner} ${winners.map(w => w.avatar + ' ' + w.name).join(' & ')}! 🏆</h3>`;
            this.getEl('final-scoreboard').innerHTML = winnerHtml;
            let reportHtml = `<h3 class="text-xl lg:text-2xl font-bold mb-3 text-stone-700">${this.translations[uiLang].final_report}</h3>`;
            players.forEach(p => {
                reportHtml += `<div class="mb-4 p-4 card-base"><p class="font-bold text-lg lg:text-xl">${p.avatar} ${p.name} - ${p.score}</p>`;
                if (p.incorrectlyAnsweredWords.length > 0) {
                    reportHtml += `<p class="text-sm lg:text-base mt-1">${this.translations[uiLang].review_words}</p><ul>${p.incorrectlyAnsweredWords.map(item => { const display = item.color ? `<span class="inline-block w-4 h-4 rounded-full mr-2" style="background-color: ${item.color}; border: 1px solid #ccc;"></span>` : item.emoji; return `<li class="ml-4 text-stone-600 lg:text-lg flex items-center">${display} ${item.word}</li>` }).join('')}</ul>`;
                } else {
                    reportHtml += `<p class="text-green-600 font-semibold lg:text-lg">${this.translations[uiLang].all_correct}</p>`;
                }
                reportHtml += `</div>`;
            });
            this.getEl('report-area').innerHTML = reportHtml;
        } else {
            const player = players[0];
            this.getEl('final-scoreboard').innerHTML = `<p class="text-2xl lg:text-4xl font-bold mb-6">${player.avatar} ${player.name} - ${this.translations[uiLang].final_score.replace('{x}', player.score).replace('{y}', this.gameState.words.length)}</p>`;
            if (player.incorrectlyAnsweredWords.length > 0) {
                this.getEl('report-area').innerHTML = `<h3 class="text-xl lg:text-2xl font-bold mb-3 text-stone-700">${this.translations[uiLang].review_words}</h3><ul class="list-disc list-inside card-base p-4">${player.incorrectlyAnsweredWords.map(item => { const display = item.color ? `<span class="inline-block w-4 h-4 rounded-full mr-2" style="background-color: ${item.color}; border: 1px solid #ccc;"></span>` : item.emoji; return `<li class="text-lg lg:text-xl text-stone-600 flex items-center">${display} ${item.word}</li>` }).join('')}</ul>`;
            } else {
                this.getEl('report-area').innerHTML = `<p class="text-xl lg:text-2xl font-bold text-green-600 card-base p-4">${this.translations[uiLang].all_correct}</p>`;
            }
        }
    }
};

// --- 3. LÓGICA DO JOGO DO ROBÔ / ROBOT GAME LOGIC ---

const robotGame = {
    canvas: null, ctx: null, scoreEl: null, levelEl: null, coinsEl: null,
    messageBox: null, startButton: null, levelUpMessageEl: null,
    GAME_WIDTH: 800, GAME_HEIGHT: 500,
    player: {}, gravity: 0, gameSpeed: 0, platforms: [], score: 0, level: 0,
    gameOver: true, gameStarted: false, backgroundHills1: [], backgroundHills2: [],
    coins: [], coinCount: 0, obstacles: [], obstacleImage: new Image(),
    playerImage: new Image(), isJumpButtonPressed: false, jumpTimeCounter: 0,
    jumpsLeft: 0, MAX_JUMPS: 2, JUMP_TIME_LIMIT: 25, JUMP_FORCE: -14,
    animationFrameId: null,
    
    levels: [
        { speed: 3.5, minGap: 100, maxGap: 180, color: '#4CAF50' }, 
        { speed: 4, minGap: 110, maxGap: 200, color: '#FFC107' }, 
        { speed: 4.5, minGap: 120, maxGap: 220, color: '#FF9800' },
        { speed: 5, minGap: 130, maxGap: 240, color: '#F44336' },
        { speed: 5.5, minGap: 140, maxGap: 260, color: '#9C27B0' },
    ],

    // PT: Seleciona os elementos do canvas e da UI do jogo do robô.
    // EN: Selects the canvas and UI elements for the robot game.
    initElements: function() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.scoreEl = document.getElementById('score');
        this.levelEl = document.getElementById('level');
        this.coinsEl = document.getElementById('coins');
        this.messageBox = document.getElementById('message-box');
        this.startButton = document.getElementById('start-button');
        this.levelUpMessageEl = document.getElementById('level-up-message');
        this.canvas.width = this.GAME_WIDTH;
        this.canvas.height = this.GAME_HEIGHT;
    },
    
    // PT: Carrega as imagens SVG do jogador e dos obstáculos.
    // EN: Loads the SVG images for the player and obstacles.
    loadAssets: function() {
        const playerSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="60" viewBox="0 0 50 60"><ellipse cx="25" cy="58" rx="20" ry="2" fill="rgba(0,0,0,0.3)"/><rect x="8" y="45" width="12" height="10" fill="#333" rx="3"/><rect x="30" y="45" width="12" height="10" fill="#333" rx="3"/><rect x="5" y="15" width="40" height="35" fill="#d3d3d3" rx="8"/><rect x="10" y="25" width="30" height="15" fill="#4a4a4a" rx="5"/><rect x="12" y="0" width="26" height="20" fill="#a9a9a9" rx="5"/><circle cx="25" cy="10" r="6" fill="#00f5d4"/><circle cx="26" cy="9" r="2" fill="#16213e"/></svg>`;
        const obstacleSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"><path d="M20,38 C30,38 35,30 35,20 C35,10 30,2 20,2 C10,2 5,10 5,20 C5,30 10,38 20,38 Z" fill="#c1121f"/><path d="M20,35 C28,35 32,28 32,20 C32,12 28,5 20,5 C12,5 8,12 8,20 C8,28 12,35 20,35 Z" fill="#e63946"/><circle cx="15" cy="18" r="3" fill="#fff"/><circle cx="25" cy="18" r="3" fill="#fff"/><circle cx="15.5" cy="18.5" r="1" fill="#000"/><circle cx="25.5" cy="18.5" r="1" fill="#000"/><path d="M15,28 Q20,25 25,28" stroke="#fff" stroke-width="2" fill="none"/></svg>`;
        
        let assetsLoaded = 0;
        const onAssetLoad = () => {
            assetsLoaded++;
            if (assetsLoaded === 2) {
                this.showInitialScreen();
            }
        };
        
        this.playerImage.onload = onAssetLoad;
        this.obstacleImage.onload = onAssetLoad;
        this.playerImage.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(playerSVG);
        this.obstacleImage.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(obstacleSVG);
    },

    // PT: Mostra a tela inicial do jogo do robô.
    // EN: Shows the initial screen of the robot game.
    showInitialScreen: function() {
        this.gameStarted = false;
        this.gameOver = true;
        this.backgroundHills1 = [{x: 0, y: 300, w: 400, h: 200}, {x: 500, y: 250, w: 500, h: 250}];
        this.backgroundHills2 = [{x: 200, y: 350, w: 600, h: 150}, {x: 900, y: 320, w: 400, h: 180}];
        this.drawBackground();
        this.messageBox.style.display = 'flex';
    },

    // PT: Inicializa ou reseta as variáveis para um novo jogo.
    // EN: Initializes or resets the variables for a new game.
    initGame: function() {
        this.player = { x: 100, y: 100, width: 50, height: 60, dy: 0 };
        this.gravity = 0.5;
        this.score = 0;
        this.level = 0;
        this.coinCount = 0;
        this.gameSpeed = this.levels[this.level].speed;
        this.gameOver = false;
        this.gameStarted = true;
        this.isJumpButtonPressed = false;
        this.jumpTimeCounter = 0;
        this.jumpsLeft = this.MAX_JUMPS;
        this.platforms = [];
        this.coins = [];
        this.obstacles = [];
        let lastPlatformX = 0;
        while (lastPlatformX < this.GAME_WIDTH + 100) {
            const width = Math.random() * (250 - 100) + 100;
            this.platforms.push({ x: lastPlatformX, y: this.GAME_HEIGHT - 80, width: width, height: 80 });
            lastPlatformX += width;
        }
        this.backgroundHills1 = [{x: 0, y: 300, w: 400, h: 200}, {x: 500, y: 250, w: 500, h: 250}];
        this.backgroundHills2 = [{x: 200, y: 350, w: 600, h: 150}, {x: 900, y: 320, w: 400, h: 180}];
        this.messageBox.style.display = 'none';
        if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
        this.loop();
    },
    
    // PT: Lógica para iniciar o pulo do jogador.
    // EN: Logic to start the player's jump.
    handleJumpStart: function() {
        if (this.jumpsLeft > 0 && this.gameStarted && !this.gameOver) {
            this.jumpsLeft--;
            this.jumpTimeCounter = this.JUMP_TIME_LIMIT;
            this.player.dy = this.JUMP_FORCE;
            this.isJumpButtonPressed = true;
        }
    },
    // PT: Lógica para finalizar o pulo do jogador.
    // EN: Logic to end the player's jump.
    handleJumpEnd: function() { this.isJumpButtonPressed = false; },

    // PT: Atualiza a posição do jogador (gravidade, pulo, colisão com plataformas).
    // EN: Updates the player's position (gravity, jump, platform collision).
    updatePlayer: function() {
        if (this.isJumpButtonPressed && this.jumpTimeCounter > 0) {
            this.player.dy = this.JUMP_FORCE;
            this.jumpTimeCounter--;
        }
        const previousBottom = this.player.y + this.player.height;
        this.player.dy += this.gravity;
        this.player.y += this.player.dy;
        let onPlatform = false;
        this.platforms.forEach(platform => {
            if (this.player.x + this.player.width > platform.x && this.player.x < platform.x + platform.width && this.player.y + this.player.height >= platform.y && previousBottom <= platform.y && this.player.dy > 0) {
                this.player.y = platform.y - this.player.height;
                this.player.dy = 0;
                this.jumpsLeft = this.MAX_JUMPS;
                onPlatform = true;
            }
        });
        if (this.player.y + this.player.height > this.GAME_HEIGHT) { this.gameOver = true; }
    },
    
    // PT: Move e gera novas plataformas, obstáculos e moedas.
    // EN: Moves and generates new platforms, obstacles, and coins.
    updatePlatformsAndObstacles: function() {
        let maxPlatformX = 0;
        this.platforms.forEach(p => { p.x -= this.gameSpeed; if (p.x + p.width > maxPlatformX) maxPlatformX = p.x + p.width; });
        this.obstacles.forEach(o => o.x -= this.gameSpeed);
        this.platforms = this.platforms.filter(p => p.x + p.width > 0);
        this.obstacles = this.obstacles.filter(o => o.x + o.width > 0);
        if (maxPlatformX < this.GAME_WIDTH + 100) {
            const config = this.levels[Math.min(this.level, this.levels.length - 1)];
            const gap = Math.random() * (config.maxGap - config.minGap) + config.minGap;
            const width = Math.random() * (300 - 150) + 150;
            const newPlatformX = maxPlatformX + gap;
            this.platforms.push({ x: newPlatformX, y: this.GAME_HEIGHT - 80, width: width, height: 80 });
            if (Math.random() < 0.45) {
                this.obstacles.push({ x: newPlatformX + width / 2 - 20, y: this.GAME_HEIGHT - 80 - 40, width: 40, height: 40 });
            } else {
                const numberOfCoins = Math.floor(Math.random() * 3) + 1;
                for (let i = 0; i < numberOfCoins; i++) {
                    const yOffset = (Math.random() * 100) + 80;
                    this.coins.push({ x: newPlatformX + (width / (numberOfCoins + 1)) * (i + 1), y: this.GAME_HEIGHT - 80 - yOffset, radius: 10 });
                }
            }
            this.score += 10;
        }
    },
    
    // PT: Atualiza a posição das moedas e verifica a coleta.
    // EN: Updates the position of coins and checks for collection.
    updateCoins: function() {
        this.coins.forEach((coin, index) => {
            coin.x -= this.gameSpeed;
            const distX = (this.player.x + this.player.width / 2) - coin.x;
            const distY = (this.player.y + this.player.height / 2) - coin.y;
            const distance = Math.sqrt((distX * distX) + (distY * distY));
            if (distance < this.player.width / 2 + coin.radius) {
                this.coinCount++;
                this.coins.splice(index, 1);
            }
        });
        this.coins = this.coins.filter(coin => coin.x + coin.radius > 0);
    },
    
    // PT: Verifica se o jogador colidiu com um obstáculo.
    // EN: Checks if the player has collided with an obstacle.
    checkCollisions: function() {
        this.obstacles.forEach(obstacle => {
            if (this.player.x < obstacle.x + obstacle.width && this.player.x + this.player.width > obstacle.x && this.player.y < obstacle.y + obstacle.height && this.player.y + this.player.height > obstacle.y) {
                this.gameOver = true;
            }
        });
    },

    // PT: Atualiza a posição do cenário de fundo para criar um efeito de paralaxe.
    // EN: Updates the position of the background scenery to create a parallax effect.
    updateBackground: function() {
        this.backgroundHills1.forEach(h => { h.x -= this.gameSpeed * 0.2; if (h.x + h.w < 0) h.x = this.GAME_WIDTH + Math.random() * 200; });
        this.backgroundHills2.forEach(h => { h.x -= this.gameSpeed * 0.5; if (h.x + h.w < 0) h.x = this.GAME_WIDTH + Math.random() * 200; });
    },

    // PT: Verifica se o jogador atingiu a pontuação para avançar de nível.
    // EN: Checks if the player has reached the score to level up.
    checkLevelUp: function() {
        const newLevel = Math.floor(this.score / 500);
        if (this.score > 0 && newLevel > this.level) {
            this.level = newLevel;
            const config = this.levels[Math.min(this.level, this.levels.length - 1)];
            this.gameSpeed = config.speed;
            this.levelUpMessageEl.textContent = `Nível ${this.level + 1}!`;
            this.levelUpMessageEl.classList.add('show');
            setTimeout(() => { this.levelUpMessageEl.classList.remove('show'); }, 1500);
        }
    },
    
    // PT: Desenha o cenário de fundo no canvas.
    // EN: Draws the background scenery on the canvas.
    drawBackground: function() {
        if (!this.ctx) return;
        const sky = this.ctx.createLinearGradient(0, 0, 0, this.GAME_HEIGHT);
        sky.addColorStop(0, '#16213e'); sky.addColorStop(0.7, '#537895'); sky.addColorStop(1, '#e94560');
        this.ctx.fillStyle = sky; this.ctx.fillRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        this.ctx.fillStyle = 'rgba(22, 33, 62, 0.6)';
        this.backgroundHills1.forEach(h => { this.ctx.beginPath(); this.ctx.moveTo(h.x, this.GAME_HEIGHT); this.ctx.bezierCurveTo(h.x + h.w / 2, h.y, h.x + h.w / 2, h.y, h.x + h.w, this.GAME_HEIGHT); this.ctx.fill(); });
        this.ctx.fillStyle = 'rgba(22, 33, 62, 0.8)';
        this.backgroundHills2.forEach(h => { this.ctx.beginPath(); this.ctx.moveTo(h.x, this.GAME_HEIGHT); this.ctx.bezierCurveTo(h.x + h.w / 2, h.y, h.x + h.w / 2, h.y, h.x + h.w, this.GAME_HEIGHT); this.ctx.fill(); });
    },

    // PT: Desenha o jogador no canvas.
    // EN: Draws the player on the canvas.
    drawPlayer: function() { if (this.player.x) this.ctx.drawImage(this.playerImage, this.player.x, this.player.y, this.player.width, this.player.height); },

    // PT: Desenha as plataformas no canvas.
    // EN: Draws the platforms on the canvas.
    drawPlatforms: function() {
        this.platforms.forEach(p => {
            const config = this.levels[Math.min(this.level, this.levels.length - 1)];
            this.ctx.fillStyle = '#1e415a'; this.ctx.fillRect(p.x, p.y, p.width, p.height);
            this.ctx.fillStyle = config.color; this.ctx.fillRect(p.x, p.y, p.width, 15);
            this.ctx.fillStyle = 'rgba(0,0,0,0.2)'; this.ctx.fillRect(p.x, p.y + 15, p.width, 5);
        });
    },
    
    // PT: Desenha os obstáculos no canvas.
    // EN: Draws the obstacles on the canvas.
    drawObstacles: function() { this.obstacles.forEach(o => { this.ctx.drawImage(this.obstacleImage, o.x, o.y, o.width, o.height); }); },

    // PT: Desenha as moedas no canvas.
    // EN: Draws the coins on the canvas.
    drawCoins: function() {
        this.coins.forEach(c => {
            this.ctx.save();
            this.ctx.fillStyle = '#FFD700'; this.ctx.strokeStyle = '#B8860B'; this.ctx.lineWidth = 2;
            this.ctx.beginPath(); this.ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2); this.ctx.fill(); this.ctx.stroke();
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.beginPath(); this.ctx.arc(c.x - 3, c.y - 4, c.radius * 0.4, 0, Math.PI * 2); this.ctx.fill();
            this.ctx.restore();
        });
    },

    // PT: Desenha a interface (pontos, nível, moedas) na tela.
    // EN: Draws the UI (score, level, coins) on the screen.
    drawUI: function() {
        const uiLang = languageGame.gameState.uiLang || 'pt';
        this.scoreEl.textContent = `${languageGame.translations[uiLang].score || 'Pontos'}: ${this.score}`;
        this.levelEl.textContent = `${languageGame.translations[uiLang].level || 'Nível'}: ${this.level + 1}`;
        this.coinsEl.textContent = `${languageGame.translations[uiLang].coins || 'Moedas'}: ${this.coinCount}`;
    },
    
    // PT: Mostra a tela de fim de jogo.
    // EN: Shows the game over screen.
    showGameOverScreen: function() {
        this.messageBox.style.display = 'flex';
        const uiLang = languageGame.gameState.uiLang || 'pt';
        this.messageBox.querySelector('h1').textContent = languageGame.translations[uiLang].game_over || 'Game Over!';
        const scoreText = languageGame.translations[uiLang].score || 'Pontos';
        const coinsText = languageGame.translations[uiLang].coins || 'Moedas';
        this.messageBox.querySelector('p').textContent = `${scoreText}: ${this.score} | ${coinsText}: ${this.coinCount}`;
        this.messageBox.querySelector('button').textContent = languageGame.translations[uiLang].play_again || 'Play Again';
    },

    // PT: O loop principal do jogo, que atualiza e desenha tudo a cada quadro.
    // EN: The main game loop, which updates and draws everything each frame.
    loop: function() {
        if (this.gameOver) { this.showGameOverScreen(); return; }
        this.animationFrameId = requestAnimationFrame(() => this.loop());
        this.ctx.clearRect(0, 0, this.GAME_WIDTH, this.GAME_HEIGHT);
        this.updatePlayer(); this.updatePlatformsAndObstacles(); this.updateCoins();
        this.updateBackground(); this.checkCollisions(); this.checkLevelUp();
        this.drawBackground(); this.drawPlatforms(); this.drawObstacles();
        this.drawCoins(); this.drawPlayer(); this.drawUI();
    }
};

// --- INICIALIZAÇÃO GERAL / GENERAL INITIALIZATION ---

// PT: Executa quando a página termina de carregar.
// EN: Executes when the page finishes loading.
window.onload = () => {
    languageGame.init();
    robotGame.initElements();
    robotGame.loadAssets();
    
    const jumpStart = (e) => { e.preventDefault(); if (!robotGame.gameOver) robotGame.handleJumpStart(); };
    const jumpEnd = (e) => { e.preventDefault(); if (!robotGame.gameOver) robotGame.handleJumpEnd(); };
    robotGame.startButton.addEventListener('click', () => robotGame.initGame());
    window.addEventListener('keydown', (e) => { if (e.code === 'Space' || e.code === 'Enter') jumpStart(e); });
    window.addEventListener('keyup', (e) => { if (e.code === 'Space' || e.code === 'Enter') jumpEnd(e); });
    robotGame.canvas.addEventListener('touchstart', jumpStart);
    robotGame.canvas.addEventListener('touchend', jumpEnd);

    updateThemeIcons();
    showHub();
};

