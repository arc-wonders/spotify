/* ========================
   Simple NCS Music Player
   ======================== */

   const audio          = document.getElementById('audioPlayer');
   const playPauseBtn   = document.getElementById('playPauseBtn');
   const prevBtn        = document.getElementById('prevBtn');
   const nextBtn        = document.getElementById('nextBtn');
   const progressBar    = document.getElementById('progressBar');
   const nowPlayingText = document.getElementById('nowPlaying');
   const songButtons    = Array.from(document.querySelectorAll('.song-btn'));
   
   let currentIndex = 0;          // index in songButtons[]
   let isPlaying    = false;
   
   /* ----------  helpers ---------- */
   
   function loadSong(index) {
     const btn   = songButtons[index];
     const src   = btn.dataset.src;
     const title = btn.dataset.title;
   
     audio.src          = src;
     nowPlayingText.textContent = title;
     currentIndex       = index;
   }
   
   function playSong() {
     audio.play();
     isPlaying = true;
     playPauseBtn.textContent = '❚❚';  // pause symbol
   }
   
   function pauseSong() {
     audio.pause();
     isPlaying = false;
     playPauseBtn.textContent = '►';    // play symbol
   }
   
   function togglePlayPause() {
     if (isPlaying) pauseSong(); else playSong();
   }
   
   function nextSong() {
     const next = (currentIndex + 1) % songButtons.length;
     loadSong(next);
     playSong();
   }
   
   function prevSong() {
     const prev = (currentIndex - 1 + songButtons.length) % songButtons.length;
     loadSong(prev);
     playSong();
   }
   
   /* ----------  event wiring ---------- */
   
   // 1 — click a song in the playlist
   songButtons.forEach((btn, index) => {
     btn.addEventListener('click', () => {
       loadSong(index);
       playSong();
     });
   });
   
   // 2 — footer controls
   playPauseBtn.addEventListener('click', togglePlayPause);
   nextBtn.addEventListener('click', nextSong);
   prevBtn.addEventListener('click', prevSong);
   
   // 3 — progress bar updates
   audio.addEventListener('timeupdate', () => {
     if (!audio.duration) return;
     const percent = (audio.currentTime / audio.duration) * 100;
     progressBar.value = percent;
   });
   
   // allow user seeking
   progressBar.addEventListener('input', () => {
     if (!audio.duration) return;
     const seekTime = (progressBar.value / 100) * audio.duration;
     audio.currentTime = seekTime;
   });
   
   // 4 — auto-advance when a song finishes
   audio.addEventListener('ended', nextSong);
   
   /* ----------  initialise ---------- */
   
   // start with the first track data loaded (but not playing)
   loadSong(0);
   