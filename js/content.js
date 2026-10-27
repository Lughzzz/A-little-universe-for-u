// Semua teks mudah diganti di sini. 
export const C = {
  recipient: "Cinta",
  sender: "Jaka",
  birthday: { month: 10, day: 28, label: "28 Oktober" }, // hanya untuk dekorasi
  music: "assets/audio/background-music.mp3",           // audio milikmu sendiri / berlisensi
  title: "A Little Universe Made for Cinta",
  chapters: ["A Letter for You", "Today, It's All About You", "Little Moments, Big Memories", "A Little Quiz for You", "Little Things I Adore", "A Little Game", "A Little Secret", "One Last Letter for You"],
  ui: { openLetter: "Open my little letter", next: "Next little chapter", replay: "Replay our little universe", back: "Back to the beginning" },
  letter: `Hey, Cinta! ♡

I made this little universe just for you.

Mungkin ini cuma website kecil, but every little detail here was made to remind you that you are someone worth celebrating.

So, take your time. Explore every little corner, okay?

Happy birthday, Cinta! Let's make today a little more magical. ✨`,
  cake: {
    btn: "Make a wish", again: "Light the candle again",
    msg: `Today is your special day, Cinta! ♡

I hope this new chapter brings you more laughter, peaceful days, beautiful memories, and little reasons to smile.

You deserve good things, not just today, but every day.`,
    soon: () => "Happy birthday, Cinta! 🎉"
  },
  photos: [ // src = path foto asli (boleh belum ada)
    { src: "assets/images/Manhattan.jpeg", alt: "Photo 1", placeholder: "Our favorite memory goes here ♡", caption: "Our favorite memory goes here ♡" },
    { src: "assets/images/Rs.jpeg", alt: "Photo 2", placeholder: "A little moment worth keeping", caption: "A little moment worth keeping" },
    { src: "assets/images/Kacamata.jpeg", alt: "Photo 3", placeholder: "One of my favorite days with you", caption: "One of my favorite days with you" }
  ],
  quiz: {
    done: "You finished! You got {s} of {n} — and every answer is a good one ♡",
    questions: [
      { q: "What's the best ingredient for a happy day?", options: ["Good food", "Laughter", "Someone who makes you smile", "All of the above"], correct: 3, right: "Yes! All of them make a happy day ✨", other: "Lovely choice! Honestly, it's all of the above ♡" },
      { q: "If your day were a color, what would make it brighter?", options: ["A little surprise", "Your favorite song", "A funny conversation", "Any of these!"], correct: 3, right: "Exactly, any of these will do 🌈", other: "Great pick! Any of these would brighten the day ♡" },
      { q: "What should you do on your birthday?", options: ["Smile a little more", "Enjoy your favorite things", "Make a wish", "All of the above"], correct: 3, right: "Perfect, do it all! 🎂", other: "Nice one! And why not all of it? ♡" }
    ]
  },
  gifts: [
    { title: "A tiny reminder ♡", text: "You don't have to be perfect to be wonderful. Just being yourself is already something special." },
    { title: "A little wish for you ✨", text: "I hope you find happiness in the little things, courage when life gets difficult, and people who make you feel appreciated." },
    { title: "A secret message 💌", text: "Psst... this entire website is a tiny reminder that someone wanted to make your day feel extra special. Don't forget to smile, okay? ♡" }
  ],
  game: {
    intro: "Match all the little pairs to keep going ✨",
    moves: "Moves", again: "Shuffle again",
    win: "You matched them all in {m} moves! ♡",
    cards: [{ s: "♡", n: "heart" }, { s: "✨", n: "sparkles" }, { s: "🎂", n: "cake" }, { s: "🌙", n: "moon" }]
  },
  secret: {
    lockedTitle: "🔒 This chapter is still locked",
    lockedHint: "Finish these little things to open it:",
    reqs: { quiz: "Finish the little quiz", gifts: "Open all three little things", game: "Win the little memory game" },
    skip: "Skip ✨",
    msg: `You found the secret chapter! ✨

Here's something I don't say out loud very often: you matter more than you think, Cinta.

Kamu nggak harus selalu kuat. Kalau lelah, istirahat dulu, okay?

This little part is just between us. ♡

— Jaka`
  },
  surprise: "All three opened! ✨ You found every little thing. Thank you for exploring ♡",
  last: {
    btn: "Open the last letter",
    letter: `Dear Cinta,

If you've made it this far, thank you for exploring this little universe.

Aku mungkin nggak selalu punya kata-kata yang sempurna, but I hope this little website can make you feel a little more appreciated today.

I hope you keep growing into the person you want to become. I hope life gives you beautiful memories, genuine happiness, and countless reasons to smile.

And whenever things feel a little overwhelming, remember that you deserve kindness, patience, and good things too.

Thank you for being part of this little universe.

Happy birthday, Cinta! ♡

With lots of wishes and a little bit of magic,
Jaka ✨`
  }
};
