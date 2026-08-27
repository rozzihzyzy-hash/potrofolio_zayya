document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // 1. KONTROL UBAH 3 TEMA (Galaksi -> Musik -> Laut)
    // ==========================================
    const themeBtn = document.getElementById('theme-toggle');
    const themes = ['galaxy', 'music', 'ocean'];
    const themeLabels = {
        galaxy: "🎵 Ubah ke Tema Musik",
        music: "🌊 Ubah ke Tema Laut",
        ocean: "🌌 Ubah ke Tema Galaksi"
    };
    let currentThemeIndex = 0;

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = themes[currentThemeIndex];
            document.body.classList.remove(`theme-${currentTheme}`);
            
            // Pindah ke indeks tema berikutnya
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            
            const nextTheme = themes[currentThemeIndex];
            document.body.classList.add(`theme-${nextTheme}`);
            themeBtn.innerText = themeLabels[nextTheme];
        });
    }

    // ==========================================
    // 2. GENERATE BINTANG (Tema Galaksi)
    // ==========================================
    const starsContainer = document.getElementById('stars-container');
    if (starsContainer) {
        const fragmentStars = document.createDocumentFragment();
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            star.style.top = (Math.random() * 100) + 'vh';
            star.style.left = (Math.random() * 100) + 'vw';
            
            const size = Math.floor(Math.random() * 3) + 2; 
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDuration = (Math.random() * 2 + 1) + 's';
            fragmentStars.appendChild(star);
        }
        starsContainer.appendChild(fragmentStars);
    }

    // ==========================================
    // 3. GENERATE NOT MUSIK (Tema Musik)
    // ==========================================
    const notesContainer = document.getElementById('notes-container');
    const musicSymbols = ['♪', '♫', '♩', '♬', '♭', '♮', '♯'];
    const noteColors = ['#FF3366', '#00E5FF', '#FFD700', '#BDBDBD']; 

    if (notesContainer) {
        const fragmentNotes = document.createDocumentFragment();
        for (let i = 0; i < 30; i++) {
            const noteEl = document.createElement('div');
            noteEl.classList.add('music-note-anim');
            noteEl.innerText = musicSymbols[Math.floor(Math.random() * musicSymbols.length)];
            noteEl.style.left = (Math.random() * 100) + 'vw';
            noteEl.style.top = (Math.random() * 120) + 'vh'; 
            noteEl.style.fontSize = (Math.random() * 20 + 14) + 'px';
            noteEl.style.color = noteColors[Math.floor(Math.random() * noteColors.length)];
            noteEl.style.opacity = (Math.random() * 0.4) + 0.1; 
            noteEl.style.animationDuration = (Math.random() * 15 + 10) + 's';
            fragmentNotes.appendChild(noteEl);
        }
        notesContainer.appendChild(fragmentNotes);
    }

    // ==========================================
    // 4. GENERATE GELEMBUNG (Tema Laut)
    // ==========================================
    const bubblesContainer = document.getElementById('bubbles-container');
    if (bubblesContainer) {
        const fragmentBubbles = document.createDocumentFragment();
        for (let i = 0; i < 35; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('bubble');
            
            const size = Math.floor(Math.random() * 25) + 8; 
            bubble.style.width = size + 'px';
            bubble.style.height = size + 'px';
            bubble.style.left = (Math.random() * 100) + 'vw';
            bubble.style.animationDuration = (Math.random() * 8 + 6) + 's';
            bubble.style.animationDelay = (Math.random() * 5) + 's';
            fragmentBubbles.appendChild(bubble);
        }
        bubblesContainer.appendChild(fragmentBubbles);
    }

// ==========================================
    // 5. SPLASH SCREEN & MUSIK AUTOPLAY
    // ==========================================
    const bgMusic = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-toggle');
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const enterBtn = document.getElementById('enter-btn');

    // DAFTAR LAGU
    const playlist = [
        'koda_staying.mp3',
        'blue_yungkai.mp3',
    ];

    let queue = [];
    let isPlaying = false;

    function shufflePlaylist(array) {
        let shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    function playNextSong() {
        if (queue.length === 0) queue = shufflePlaylist(playlist);
        const currentTrack = queue.shift();
        
        bgMusic.src = currentTrack;
        bgMusic.volume = 0.3;
        bgMusic.play().then(() => {
            isPlaying = true;
            if (musicBtn) musicBtn.innerText = "⏸️ Pause Music";
        }).catch(error => console.log("Menunggu interaksi user"));
    }

    if (bgMusic) bgMusic.addEventListener('ended', playNextSong);

    // KETIKA TOMBOL "ENTER PORTFOLIO" DIKLIK
    if (enterBtn) {
        enterBtn.addEventListener('click', () => {
            // 1. Hilangkan Layar Loading
            welcomeOverlay.classList.add('hidden');
            // 2. Munculkan Konten dengan Animasi Mulus
            document.body.classList.add('entered');
            // 3. Putar Musik Otomatis (Dijamin berhasil karena user sudah klik)
            if (!isPlaying) playNextSong();
        });
    }

    // Tombol manual Play/Pause di pojok kanan atas
    if (musicBtn) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (isPlaying) {
                bgMusic.pause();
                musicBtn.innerText = "▶️ Play Music";
                isPlaying = false;
            } else {
                if (!bgMusic.src) playNextSong();
                else {
                    bgMusic.play();
                    musicBtn.innerText = "⏸️ Pause Music";
                    isPlaying = true;
                }
            }
        });
    }
});
