// src/data/verbs.js

export const VERB_DATA = [
  {
    id: 'eat',
    kanji: '食べる',
    hiragana: 'たべる',
    meaning: '吃',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '食べる', sentence: '毎日、朝ごはんを食べる。', trans: '每天都吃早餐。' },
      masu: { word: '食べます', sentence: '魚をよく食べます。', trans: '我常吃魚。' },
      te: { word: '食べて', sentence: '野菜も食べてください。', trans: '請也吃點蔬菜。' },
      nai: { word: '食べない', sentence: '納豆は食べない。', trans: '我不吃納豆。' },
      ta: { word: '食べた', sentence: 'もう昼ごはんを食べた。', trans: '已經吃過午餐了。' },
      potential: { word: '食べられる', sentence: '刺身が食べられる？', trans: '你敢吃生魚片嗎？' },
      volitional: { word: '食べよう', sentence: '一緒に食べよう。', trans: '我們一起吃吧。' }
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
      dictionary: { word: '飲む', sentence: 'お酒を飲むのが好き。', trans: '喜歡喝酒。' },
      masu: { word: '飲みます', sentence: 'コーヒーを飲みます。', trans: '我要喝咖啡。' },
      te: { word: '飲んで', sentence: '薬を飲んで寝る。', trans: '吃藥睡覺。' },
      nai: { word: '飲まない', sentence: '今日は飲まない。', trans: '今天不喝。' },
      ta: { word: '飲んだ', sentence: '昨日、たくさん飲んだ。', trans: '昨天喝了很多。' },
      potential: { word: '飲める', sentence: 'この水は飲める。', trans: '這水可以喝。' },
      volitional: { word: '飲もう', sentence: 'さあ、飲もう！', trans: '來，喝吧！' }
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
      dictionary: { word: '行く', sentence: '明日、東京へ行く。', trans: '明天要去東京。' },
      masu: { word: '行きます', sentence: '学校へ行きます。', trans: '要去學校。' },
      te: { word: '行って', sentence: 'まっすぐ行ってください。', trans: '請直走。' },
      nai: { word: '行かない', sentence: 'パーティーに行かない。', trans: '不去派對。' },
      ta: { word: '行った', sentence: '日本に行ったことがある。', trans: '去過日本。' },
      potential: { word: '行ける', sentence: '自転車で行ける。', trans: '騎腳踏車能到。' },
      volitional: { word: '行こう', sentence: '映画を見に行こう。', trans: '我們去看電影吧。' }
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
      dictionary: { word: '来る', sentence: '彼が来るのを待つ。', trans: '等他來。' },
      masu: { word: '来ます', sentence: '明日、来ますか？', trans: '明天會來嗎？' },
      te: { word: '来て', sentence: 'こっちに来て！', trans: '過來這裡！' },
      nai: { word: '来ない', sentence: 'バスが全然来ない。', trans: '公車一直不來。' },
      ta: { word: '来た', sentence: 'やっと来た！', trans: '終於來了！' },
      potential: { word: '来られる', sentence: '明日は来られる。', trans: '明天能來。' },
      volitional: { word: '来よう', sentence: 'またここに来よう。', trans: '下次再來這裡吧。' }
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
      dictionary: { word: 'する', sentence: '宿題をする。', trans: '做作業。' },
      masu: { word: 'します', sentence: 'テニスをします。', trans: '打網球。' },
      te: { word: 'して', sentence: '勉強して遊ぶ。', trans: '讀完書再玩。' },
      nai: { word: 'しない', sentence: '無理はしない。', trans: '不勉強自己。' },
      ta: { word: 'した', sentence: '掃除をした。', trans: '打掃了。' },
      potential: { word: 'できる', sentence: '日本語ができる。', trans: '會說日文。' },
      volitional: { word: 'しよう', sentence: '一緒にしよう。', trans: '我們一起做吧。' }
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
      dictionary: { word: '決める', sentence: '日程を決める。', trans: '決定行程。' },
      masu: { word: '決めます', sentence: '後で決めます。', trans: '之後再決定。' },
      te: { word: '決めて', sentence: '早く決めてよ。', trans: '快點決定啦。' },
      nai: { word: '決めない', sentence: 'まだ決めない。', trans: '還沒決定。' },
      ta: { word: '決めた', sentence: '行くことに決めた。', trans: '決定要去了。' },
      potential: { word: '決められる', sentence: '自分では決められない。', trans: '自己無法決定。' },
      volitional: { word: '決めよう', sentence: '今すぐ決めよう。', trans: '現在就決定吧。' }
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
      dictionary: { word: '調べる', sentence: '辞書で調べる。', trans: '查字典。' },
      masu: { word: '調べます', sentence: '詳しく調べます。', trans: '詳細調查。' },
      te: { word: '調べて', sentence: 'ネットで調べてみて。', trans: '上網查查看。' },
      nai: { word: '調べない', sentence: '調べないとわからない。', trans: '不查不知道。' },
      ta: { word: '調べた', sentence: '行き方を調べた。', trans: '查了去的方法。' },
      potential: { word: '調べられる', sentence: 'スマホで調べられる。', trans: '可以用手機查。' },
      volitional: { word: '調べよう', sentence: '原因を調べよう。', trans: '我們來調查原因吧。' }
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
      dictionary: { word: '諦める', sentence: '夢を諦める。', trans: '放棄夢想。' },
      masu: { word: '諦めます', sentence: '今回は諦めます。', trans: '這次放棄了。' },
      te: { word: '諦めて', sentence: '諦めてはいけない。', trans: '不能放棄。' },
      nai: { word: '諦めない', sentence: '最後まで諦めない。', trans: '堅持到最後不放棄。' },
      ta: { word: '諦めた', sentence: '途中で諦めた。', trans: '半途而廢了。' },
      potential: { word: '諦められる', sentence: '簡単には諦められない。', trans: '無法輕易放棄。' },
      volitional: { word: '諦めよう', sentence: 'もう諦めよう。', trans: '我們放棄吧。' }
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
      dictionary: { word: '伝える', sentence: '感謝を伝える。', trans: '傳達謝意。' },
      masu: { word: '伝えます', sentence: '彼に伝えます。', trans: '會轉達給他。' },
      te: { word: '伝えて', sentence: 'よろしく伝えて。', trans: '請代我問好。' },
      nai: { word: '伝えない', sentence: '真実を伝えない。', trans: '不告知真相。' },
      ta: { word: '伝えた', sentence: '気持ちを伝えた。', trans: '傳達了心意。' },
      potential: { word: '伝えられる', sentence: 'うまく伝えられない。', trans: '無法很好地傳達。' },
      volitional: { word: '伝えよう', sentence: '彼に伝えよう。', trans: '我們告訴他吧。' }
    }
  }
];