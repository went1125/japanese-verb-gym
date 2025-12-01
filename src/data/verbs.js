// src/data/verbs.js

export const VERB_DATA = [
  // --- N5 ---
  {
    id: 'eat',
    kanji: '食べる',
    hiragana: 'たべる',
    meaning: '吃',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '食べる', sentence: '毎日[まいにち]、朝[あさ]ごはんを食[た]べる。', trans: '每天都吃早餐。' },
      masu: { word: '食べます', sentence: '魚[さかな]をよく食[た]べます。', trans: '我常吃魚。' },
      te: { word: '食べて', sentence: '野菜[やさい]も食[た]べてください。', trans: '請也吃點蔬菜。' },
      nai: { word: '食べない', sentence: '納豆[なっとう]は食[た]べない。', trans: '我不吃納豆。' },
      ta: { word: '食べた', sentence: 'もう昼[ひる]ごはんを食[た]べた。', trans: '已經吃過午餐了。' },
      potential: { word: '食べられる', sentence: '刺身[さしみ]が食[た]べられる？', trans: '你敢吃生魚片嗎？' },
      volitional: { word: '食べよう', sentence: '一緒[いっしょ]に食[た]べよう。', trans: '我們一起吃吧。' }
    }
  },
  {
    id: 'drink',
    kanji: '飲む',
    hiragana: 'のむ',
    meaning: '喝',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '飲む', sentence: 'お酒[さけ]を飲[の]むのが好[す]き。', trans: '喜歡喝酒。' },
      masu: { word: '飲みます', sentence: 'コーヒーを飲[の]みます。', trans: '我要喝咖啡。' },
      te: { word: '飲んで', sentence: '薬[くすり]を飲[の]んで寝[ね]る。', trans: '吃藥睡覺。' },
      nai: { word: '飲まない', sentence: '今日[きょう]は飲[の]まない。', trans: '今天不喝。' },
      ta: { word: '飲んだ', sentence: '昨日[きのう]、たくさん飲[の]んだ。', trans: '昨天喝了很多。' },
      potential: { word: '飲める', sentence: 'この水[みず]は飲[の]める。', trans: '這水可以喝。' },
      volitional: { word: '飲もう', sentence: 'さあ、飲[の]もう！', trans: '來，喝吧！' }
    }
  },
  {
    id: 'go',
    kanji: '行く',
    hiragana: 'いく',
    meaning: '去',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '行く', sentence: '明日[あした]、東京[とうきょう]へ行[い]く。', trans: '明天要去東京。' },
      masu: { word: '行きます', sentence: '学校[がっこう]へ行[い]きます。', trans: '要去學校。' },
      te: { word: '行って', sentence: 'まっすぐ行[い]ってください。', trans: '請直走。' },
      nai: { word: '行かない', sentence: 'パーティーに行[い]かない。', trans: '不去派對。' },
      ta: { word: '行った', sentence: '日本[にほん]に行[い]ったことがある。', trans: '去過日本。' },
      potential: { word: '行ける', sentence: '自転車[じてんしゃ]で行[い]ける。', trans: '騎腳踏車能到。' },
      volitional: { word: '行こう', sentence: '映画[えいが]を見[み]に行[い]こう。', trans: '我們去看電影吧。' }
    }
  },
  {
    id: 'come',
    kanji: '来る',
    hiragana: 'くる',
    meaning: '來',
    group: 'Irregular (不規則)',
    level: 'N5',
    forms: {
      dictionary: { word: '来る', sentence: '彼[かれ]が来[く]るのを待[ま]つ。', trans: '等他來。' },
      masu: { word: '来ます', sentence: '明日[あした]、来[き]ますか？', trans: '明天會來嗎？' },
      te: { word: '来て', sentence: 'こっちに来[き]て！', trans: '過來這裡！' },
      nai: { word: '来ない', sentence: 'バスが全然[ぜんぜん]来[こ]ない。', trans: '公車一直不來。' },
      ta: { word: '来た', sentence: 'やっと来[き]た！', trans: '終於來了！' },
      potential: { word: '来られる', sentence: '明日[あした]は来[こ]られる。', trans: '明天能來。' },
      volitional: { word: '来よう', sentence: 'またここに来[こ]よう。', trans: '下次再來這裡吧。' }
    }
  },
  {
    id: 'do',
    kanji: 'する',
    hiragana: 'する',
    meaning: '做',
    group: 'Irregular (不規則)',
    level: 'N5',
    forms: {
      dictionary: { word: 'する', sentence: '宿題[しゅくだい]をする。', trans: '做作業。' },
      masu: { word: 'します', sentence: 'テニスをします。', trans: '打網球。' },
      te: { word: 'して', sentence: '勉強[べんきょう]して遊[あそ]ぶ。', trans: '讀完書再玩。' },
      nai: { word: 'しない', sentence: '無理[むり]はしない。', trans: '不勉強自己。' },
      ta: { word: 'した', sentence: '掃除[そうじ]をした。', trans: '打掃了。' },
      potential: { word: 'できる', sentence: '日本語[にほんご]ができる。', trans: '會說日文。' },
      volitional: { word: 'しよう', sentence: '一緒[いっしょ]にしよう。', trans: '我們一起做吧。' }
    }
  },
  // --- N4 ---
  {
    id: 'decide',
    kanji: '決める',
    hiragana: 'きめる',
    meaning: '決定',
    group: 'Ru-Verb (二類)',
    level: 'N4',
    forms: {
      dictionary: { word: '決める', sentence: '日程[にってい]を決[き]める。', trans: '決定行程。' },
      masu: { word: '決めます', sentence: '後[あと]で決[き]めます。', trans: '之後再決定。' },
      te: { word: '決めて', sentence: '早[はや]く決[き]めてよ。', trans: '快點決定啦。' },
      nai: { word: '決めない', sentence: 'まだ決[き]めない。', trans: '還沒決定。' },
      ta: { word: '決めた', sentence: '行[い]くことに決[き]めた。', trans: '決定要去了。' },
      potential: { word: '決められる', sentence: '自分[じぶん]では決[き]められない。', trans: '自己無法決定。' },
      volitional: { word: '決めよう', sentence: '今[いま]すぐ決[き]めよう。', trans: '現在就決定吧。' }
    }
  },
  {
    id: 'check',
    kanji: '調べる',
    hiragana: 'しらべる',
    meaning: '調查',
    group: 'Ru-Verb (二類)',
    level: 'N4',
    forms: {
      dictionary: { word: '調べる', sentence: '辞書[じしょ]で調[しら]べる。', trans: '查字典。' },
      masu: { word: '調べます', sentence: '詳[くわ]しく調[しら]べます。', trans: '詳細調查。' },
      te: { word: '調べて', sentence: 'ネットで調[しら]べてみて。', trans: '上網查查看。' },
      nai: { word: '調べない', sentence: '調[しら]べないとわからない。', trans: '不查不知道。' },
      ta: { word: '調べた', sentence: '行[い]き方[かた]を調[しら]べた。', trans: '查了去的方法。' },
      potential: { word: '調べられる', sentence: 'スマホで調[しら]べられる。', trans: '可以用手機查。' },
      volitional: { word: '調べよう', sentence: '原因[げんいん]を調[しら]べよう。', trans: '我們來調查原因吧。' }
    }
  },
  // --- N3 ---
  {
    id: 'give_up',
    kanji: '諦める',
    hiragana: 'あきらめる',
    meaning: '放棄',
    group: 'Ru-Verb (二類)',
    level: 'N3',
    forms: {
      dictionary: { word: '諦める', sentence: '夢[ゆめ]を諦[あきら]める。', trans: '放棄夢想。' },
      masu: { word: '諦めます', sentence: '今回[こんかい]は諦[あきら]めます。', trans: '這次放棄了。' },
      te: { word: '諦めて', sentence: '諦[あきら]めてはいけない。', trans: '不能放棄。' },
      nai: { word: '諦めない', sentence: '最後[さいご]まで諦[あきら]めない。', trans: '堅持到最後不放棄。' },
      ta: { word: '諦めた', sentence: '途中[とちゅう]で諦[あきら]めた。', trans: '半途而廢了。' },
      potential: { word: '諦められる', sentence: '簡単[かんたん]には諦[あきら]められない。', trans: '無法輕易放棄。' },
      volitional: { word: '諦めよう', sentence: 'もう諦[あきら]めよう。', trans: '我們放棄吧。' }
    }
  },
  {
    id: 'convey',
    kanji: '伝える',
    hiragana: 'つたえる',
    meaning: '傳達',
    group: 'Ru-Verb (二類)',
    level: 'N3',
    forms: {
      dictionary: { word: '伝える', sentence: '感謝[かんしゃ]を伝[つた]える。', trans: '傳達謝意。' },
      masu: { word: '伝えます', sentence: '彼[かれ]に伝[つた]えます。', trans: '會轉達給他。' },
      te: { word: '伝えて', sentence: 'よろしく伝[つた]えて。', trans: '請代我問好。' },
      nai: { word: '伝えない', sentence: '真実[しんじつ]を伝[つた]えない。', trans: '不告知真相。' },
      ta: { word: '伝えた', sentence: '気持[きも]ちを伝[つた]えた。', trans: '傳達了心意。' },
      potential: { word: '伝えられる', sentence: 'うまく伝[つた]えられない。', trans: '無法很好地傳達。' },
      volitional: { word: '伝えよう', sentence: '彼[かれ]に伝[つた]えよう。', trans: '我們告訴他吧。' }
    }
  }
];