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
  {
    id: 'see',
    kanji: '見る',
    hiragana: 'みる',
    meaning: '看',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '見る', sentence: 'テレビを見[み]る。', trans: '看電視。' },
      masu: { word: '見ます', sentence: '新[あたら]しい映画[えいが]を見[み]ます。', trans: '要看新電影。' },
      te: { word: '見て', sentence: '向[む]こうを見[み]て。', trans: '看那邊。' },
      nai: { word: '見ない', sentence: 'このドラマは見[み]ない。', trans: '不看這部日劇。' },
      ta: { word: '見た', sentence: '昨日[きのう]、UFO[ユーフォー]を見[み]た！', trans: '昨天看到UFO了！' },
      potential: { word: '見られる', sentence: '刺身[さしみ]が食[た]べられる？', trans: '你敢吃生魚片嗎？' },
      volitional: { word: '見よう', sentence: '一緒[いっしょ]に見[み]よう。', trans: '我們一起看吧。' }
    }
  },
  {
    id: 'hear',
    kanji: '聞く',
    hiragana: 'きく',
    meaning: '聽；問',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '聞く', sentence: '音楽[おんがく]を聞[き]く。', trans: '聽音樂。' },
      masu: { word: '聞きます', sentence: '先生[せんせい]に聞[き]きます。', trans: '問老師。' },
      te: { word: '聞いて', sentence: 'よく聞[き]いてください。', trans: '請仔細聽。' },
      nai: { word: '聞かない', sentence: '誰[だれ]にも聞[き]かない。', trans: '不問任何人。' },
      ta: { word: '聞いた', sentence: '変[へん]な音[おと]を聞[き]いた。', trans: '聽到奇怪的聲音。' },
      potential: { word: '聞ける', sentence: 'ラジオが聞[き]ける。', trans: '可以聽收音機。' },
      volitional: { word: '聞こう', sentence: '彼[かれ]の意見[いけん]を聞[き]こう。', trans: '我們聽聽他的意見吧。' }
    }
  },
  {
    id: 'write',
    kanji: '書く',
    hiragana: 'かく',
    meaning: '寫',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '書く', sentence: '手紙[てがみ]を書[か]く。', trans: '寫信。' },
      masu: { word: '書きます', sentence: 'レポートを書[か]きます。', trans: '寫報告。' },
      te: { word: '書いて', sentence: '名前[なまえ]を書[か]いてください。', trans: '請寫下名字。' },
      nai: { word: '書かない', sentence: '漢字[かんじ]を書[か]かない。', trans: '不寫漢字。' },
      ta: { word: '書いた', sentence: 'メモに書[か]いた。', trans: '寫在備忘錄上了。' },
      potential: { word: '書ける', sentence: '日本語[にほんご]で書[か]ける。', trans: '可以用日文寫作。' },
      volitional: { word: '書こう', sentence: '単語[たんご]をノートに書[か]こう。', trans: '我們把單字寫在筆記本上吧。' }
    }
  },
  {
    id: 'speak',
    kanji: '話す',
    hiragana: 'はなす',
    meaning: '說話',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '話す', sentence: '先生[せんせい]と話[はな]す。', trans: '跟老師說話。' },
      masu: { word: '話します', sentence: '英語[えいご]を話[はな]します。', trans: '會說英文。' },
      te: { word: '話して', sentence: 'もっと話[はな]して！', trans: '多說一點！' },
      nai: { word: '話さない', sentence: 'あまり話[はな]さない人[ひと]だ。', trans: '不怎麼說話的人。' },
      ta: { word: '話した', sentence: '彼[かれ]と長[なが]く話[はな]した。', trans: '跟他聊了很久。' },
      potential: { word: '話せる', sentence: '日本語[にほんご]が話[はな]せる。', trans: '能說日文。' },
      volitional: { word: '話そう', sentence: '電話[でんわ]で話[はな]そう。', trans: '我們電話聊吧。' }
    }
  },
  {
    id: 'buy',
    kanji: '買う',
    hiragana: 'かう',
    meaning: '買',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '買う', sentence: '服[ふく]を買[か]う。', trans: '買衣服。' },
      masu: { word: '買います', sentence: 'お土産[みやげ]を買[か]います。', trans: '要買紀念品。' },
      te: { word: '買って', sentence: 'パンを買[か]って帰[かえ]る。', trans: '買麵包回家。' },
      nai: { word: '買わない', sentence: '今日[きょう]は何も[なにも]買[か]わない。', trans: '今天什麼都不買。' },
      ta: { word: '買った', sentence: '新[あたら]しい車[くるま]を買[か]った。', trans: '買了新車。' },
      potential: { word: '買える', sentence: '安[やす]い値段[ねだん]で買[か]える。', trans: '能以便宜的價格買到。' },
      volitional: { word: '買おう', sentence: '宝[たから]くじを買[か]おう！', trans: '我們去買樂透吧！' }
    }
  },
  {
    id: 'take_photo',
    kanji: '撮る',
    hiragana: 'とる',
    meaning: '拍（照片）',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '撮る', sentence: '写真[しゃしん]を撮[と]る。', trans: '拍照片。' },
      masu: { word: '撮ります', sentence: '記念[きねん]に撮[と]ります。', trans: '拍照留念。' },
      te: { word: '撮って', sentence: '風景[ふうけい]を撮[と]って。', trans: '請拍風景。' },
      nai: { word: '撮らない', sentence: '顔[かお]を撮[と]らないで。', trans: '請不要拍臉。' },
      ta: { word: '撮った', sentence: '素敵[すてき]な写真[しゃしん]を撮[と]った。', trans: '拍了很棒的照片。' },
      potential: { word: '撮れる', sentence: 'このカメラで撮[と]れる。', trans: '這台相機可以拍。' },
      volitional: { word: '撮ろう', sentence: '一緒[いっしょ]に記念写真[きねんしゃしん]を撮[と]ろう。', trans: '我們一起拍紀念照吧。' }
    }
  },
  {
    id: 'wait',
    kanji: '待つ',
    hiragana: 'まつ',
    meaning: '等待',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '待つ', sentence: '友達[ともだち]を待[ま]つ。', trans: '等朋友。' },
      masu: { word: '待ちます', sentence: '少[すこ]し待[ま]ちます。', trans: '等一下。' },
      te: { word: '待って', sentence: 'ちょっと待[ま]って！', trans: '請稍等！' },
      nai: { word: '待たない', sentence: 'もう待[ま]たない。', trans: '不再等了。' },
      ta: { word: '待った', sentence: '長[なが]い間[あいだ]待[ま]った。', trans: '等了很久。' },
      potential: { word: '待てる', sentence: 'まだ十[じゅっ]分[ぷん]は待[ま]てる。', trans: '還能等十分鐘。' },
      volitional: { word: '待とう', sentence: 'あそこで待[ま]とう。', trans: '我們在那裡等吧。' }
    }
  },
  {
    id: 'rest',
    kanji: '休む',
    hiragana: 'やすむ',
    meaning: '休息；請假',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '休む', sentence: '今日[きょう]は仕事[しごと]を休[やす]む。', trans: '今天工作請假。' },
      masu: { word: '休みます', sentence: '少[すこ]し休[やす]みます。', trans: '休息一下。' },
      te: { word: '休んで', sentence: '座[すわ]って休[やす]んで。', trans: '坐下休息。' },
      nai: { word: '休まない', sentence: '忙[いそが]しくて休[やす]まない。', trans: '因為忙碌而沒休息。' },
      ta: { word: '休んだ', sentence: '三日[みっか]も休[やす]んだ。', trans: '休息了三天。' },
      potential: { word: '休める', sentence: 'ここで休[やす]める。', trans: '可以在這裡休息。' },
      volitional: { word: '休もう', sentence: 'そろそろ休[やす]もう。', trans: '差不多該休息了。' }
    }
  },
  {
    id: 'exit',
    kanji: '出る',
    hiragana: 'でる',
    meaning: '出去；出現',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '出る', sentence: '部屋[へや]を出[で]る。', trans: '走出房間。' },
      masu: { word: '出ます', sentence: '九時[くじ]に家[いえ]を出[で]ます。', trans: '九點出門。' },
      te: { word: '出て', sentence: '外[そと]に出[で]て！', trans: '出去外面！' },
      nai: { word: '出ない', sentence: '今日[きょう]は一[いち]日[にち]中[じゅう]、外[そと]に出[で]ない。', trans: '今天一整天都不出門。' },
      ta: { word: '出た', sentence: '太陽[たいよう]が出[で]た。', trans: '太陽出來了。' },
      potential: { word: '出られる', sentence: 'いつでも出[で]られる。', trans: '隨時都能出去。' },
      volitional: { word: '出よう', sentence: 'もう時間[じかん]だ、出[で]よう！', trans: '已經到時間了，走吧！' }
    }
  },
  {
    id: 'enter',
    kanji: '入る',
    hiragana: 'はいる',
    meaning: '進入',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '入る', sentence: '部屋[へや]に入[はい]る。', trans: '進入房間。' },
      masu: { word: '入ります', sentence: 'お風呂[ふろ]に入[はい]ります。', trans: '要泡澡。' },
      te: { word: '入って', sentence: 'どうぞ、中[なか]に入[はい]って。', trans: '請，請進來。' },
      nai: { word: '入らない', sentence: '彼[かれ]はクラブに入[はい]らない。', trans: '他不參加社團。' },
      ta: { word: '入った', sentence: '間違[まちが]って別[べつ]の部屋[へや]に入[はい]った。', trans: '不小心進了別的房間。' },
      potential: { word: '入れる', sentence: 'この店[みせ]は誰[だれ]でも入[はい]れる。', trans: '這家店誰都能進。' },
      volitional: { word: '入ろう', sentence: '急[いそ]いで中[なか]に入[はい]ろう。', trans: '快點進去吧。' }
    }
  },
  {
    id: 'understand',
    kanji: '分かる',
    hiragana: 'わかる',
    meaning: '知道；明白',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '分かる', sentence: '日本語[にほんご]が分[わ]かる。', trans: '懂日文。' },
      masu: { word: '分かります', sentence: '意味[いみ]が分[わ]かります。', trans: '明白意思。' },
      te: { word: '分かって', sentence: '私[わたし]の気持[きも]ちが分[わ]かっている？', trans: '你明白我的心情嗎？' },
      nai: { word: '分からない', sentence: '問題[もんだい]が分[わ]からない。', trans: '不明白問題。' },
      ta: { word: '分かった', sentence: 'あ、分[わ]かった！', trans: '啊，明白了！' },
      potential: { word: '分かれる', sentence: '分[わ]かることができる。', trans: '可以明白 (使用上較不自然，常直接用原形)。' },
      volitional: { word: '分かろう', sentence: '相手[あいて]の考[かんが]えを分[わ]かろう。', trans: '試著去理解對方的想法吧。' }
    }
  },
  {
    id: 'exist_inanimate',
    kanji: 'ある',
    hiragana: 'ある',
    meaning: '有（非生物）',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: 'ある', sentence: '本[ほん]が机[つくえ]にある。', trans: '書在桌子上。' },
      masu: { word: 'あります', sentence: '時間[じかん]があります。', trans: '有時間。' },
      te: { word: 'あって', sentence: 'お金[かね]があってお菓子[かし]を買[か]う。', trans: '有錢所以買零食。' },
      nai: { word: 'ない', sentence: '傘[かさ]がありません。', trans: '沒有傘。（口語：傘[かさ]が**ない**）' },
      ta: { word: 'あった', sentence: 'いいアイディアがあった。', trans: '有了一個好主意。' },
      potential: { word: 'ある', sentence: 'この場合[ばあい]は問題[もんだい]がある。', trans: '這種情況下會有問題發生。' },
      volitional: { word: 'あろう', sentence: '（幾乎不使用）', trans: '（不常用的活用形）' }
    }
  },
  {
    id: 'exist_animate',
    kanji: 'いる',
    hiragana: 'いる',
    meaning: '有；在（生物）',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: 'いる', sentence: '猫[ねこ]が家[いえ]にいる。', trans: '貓在家裡。' },
      masu: { word: 'います', sentence: '誰[だれ]かいますか。', trans: '有人在嗎？' },
      te: { word: 'いて', sentence: 'ここにずっと居[い]て。', trans: '一直待在這裡。' },
      nai: { word: 'いない', sentence: '友達[ともだち]はもう居[い]ない。', trans: '朋友已經不在了。' },
      ta: { word: 'いた', sentence: '公園[こうえん]に彼[かれ]が居[い]た。', trans: '他在公園裡。' },
      potential: { word: 'いられる', sentence: '長[なが]くここに居[い]られる。', trans: '可以長期待在這裡。' },
      volitional: { word: 'いよう', sentence: '一緒[いっしょ]に居[い]よう。', trans: '我們待在一起吧。' }
    }
  },
  {
    id: 'sleep',
    kanji: '寝る',
    hiragana: 'ねる',
    meaning: '睡覺',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '寝る', sentence: 'もう遅[おそ]いから寝[ね]る。', trans: '已經很晚了，要睡了。' },
      masu: { word: '寝ます', sentence: '十一時[じゅういちじ]に寝[ね]ます。', trans: '十一點睡覺。' },
      te: { word: '寝て', sentence: '早[はや]く寝[ね]てね。', trans: '早點睡喔。' },
      nai: { word: '寝ない', sentence: '徹夜[てつや]で寝[ね]ない。', trans: '熬夜不睡。' },
      ta: { word: '寝た', sentence: '疲[つか]れてすぐ寝[ね]た。', trans: '因為累很快就睡了。' },
      potential: { word: '寝られる', sentence: 'どこでも寝[ね]られる。', trans: '在哪裡都能睡。' },
      volitional: { word: '寝よう', sentence: 'もう寝[ね]よう。', trans: '該睡覺了。' }
    }
  },
  {
    id: 'wake_up',
    kanji: '起きる',
    hiragana: 'おきる',
    meaning: '起床',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '起きる', sentence: '毎日[まいにち]七時[しちじ]に起[お]きる。', trans: '每天七點起床。' },
      masu: { word: '起きます', sentence: '明日[あした]は六時[ろくじ]に起[お]きます。', trans: '明天六點起床。' },
      te: { word: '起きて', sentence: '早[はや]く起[お]きて準備[じゅんび]する。', trans: '早點起床準備。' },
      nai: { word: '起きない', sentence: '休日[きゅうじつ]は昼[ひる]まで起[お]きない。', trans: '假日睡到中午不起床。' },
      ta: { word: '起きた', sentence: '地震[じしん]で目[め]が覚[さ]めて起[お]きた。', trans: '被地震嚇醒了。' },
      potential: { word: '起きられる', sentence: '頑張[がんば]れば五時[ごじ]に起[お]きられる。', trans: '努力的話五點能起床。' },
      volitional: { word: '起きよう', sentence: 'さあ、起[お]きよう！', trans: '來，起床吧！' }
    }
  },
  {
    id: 'return',
    kanji: '帰る',
    hiragana: 'かえる',
    meaning: '回家；回去',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '帰る', sentence: '十時[じゅうじ]に家[いえ]へ帰[かえ]る。', trans: '十點回家。' },
      masu: { word: '帰ります', sentence: '今日[きょう]は早[はや]く帰[かえ]ります。', trans: '今天早點回去。' },
      te: { word: '帰って', sentence: '気[き]をつけて帰[かえ]ってね。', trans: '路上小心回家喔。' },
      nai: { word: '帰らない', sentence: '今日[きょう]は帰[かえ]らない。', trans: '今天不回家。' },
      ta: { word: '帰った', sentence: '彼[かれ]はもう帰[かえ]った。', trans: '他已經回去了。' },
      potential: { word: '帰れる', sentence: '終電[しゅうでん]で帰[かえ]れる。', trans: '趕得上末班車回家。' },
      volitional: { word: '帰ろう', sentence: 'そろそろ帰[かえ]ろう。', trans: '差不多該回去了。' }
    }
  },
  {
    id: 'read',
    kanji: '読む',
    hiragana: 'よむ',
    meaning: '讀',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '読む', sentence: '新聞[しんぶん]を読[よ]む。', trans: '讀報紙。' },
      masu: { word: '読みます', sentence: '小説[しょうせつ]を読[よ]みます。', trans: '讀小說。' },
      te: { word: '読んで', sentence: '大[おお]きい声[こえ]で読[よ]んで。', trans: '請大聲朗讀。' },
      nai: { word: '読まない', sentence: '漫画[まんが]は読[よ]まない。', trans: '不讀漫畫。' },
      ta: { word: '読んだ', sentence: 'その本[ほん]はもう読[よ]んだ。', trans: '那本書我已經讀過了。' },
      potential: { word: '読める', sentence: '小[ちい]さい字[じ]も読[よ]める。', trans: '連小字也能讀。' },
      volitional: { word: '読もう', sentence: '次[つぎ]のページを読[よ]もう。', trans: '我們來讀下一頁吧。' }
    }
  },
  {
    id: 'swim',
    kanji: '泳ぐ',
    hiragana: 'およぐ',
    meaning: '游泳',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '泳ぐ', sentence: 'プールで泳[およ]ぐ。', trans: '在游泳池游泳。' },
      masu: { word: '泳ぎます', sentence: '海[うみ]で泳[およ]ぎます。', trans: '要在海裡游泳。' },
      te: { word: '泳いで', sentence: 'もっと速[はや]く泳[およ]いで！', trans: '游快一點！' },
      nai: { word: '泳がない', sentence: '私[わたし]は泳[およ]がない。', trans: '我不會游泳。' },
      ta: { word: '泳いだ', sentence: '一[いち]時間[じかん]泳[およ]いだ。', trans: '游了一個小時。' },
      potential: { word: '泳げる', sentence: '遠[とお]くまで泳[およ]げる。', trans: '可以游到很遠的地方。' },
      volitional: { word: '泳ごう', sentence: 'みんなで泳[およ]ごう。', trans: '大家一起去游泳吧。' }
    }
  },
  {
    id: 'talk',
    kanji: 'しゃべる',
    hiragana: 'しゃべる',
    meaning: '聊天；說話 (比 話す 更口語化)',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: 'しゃべる', sentence: '友達[ともだち]としゃべる。', trans: '和朋友聊天。' },
      masu: { word: 'しゃべります', sentence: '少[すこ]ししゃべります。', trans: '稍微聊一下。' },
      te: { word: 'しゃべって', sentence: '静[しず]かに、しゃべらないで。', trans: '安靜，別說話。' },
      nai: { word: 'しゃべらない', sentence: '内緒[ないしょ]だからしゃべらない。', trans: '因為是秘密所以不說。' },
      ta: { word: 'しゃべった', sentence: '彼[かれ]は何[なに]かをしゃべった。', trans: '他说了些什麼。' },
      potential: { word: 'しゃべれる', sentence: '早口[はやくち]でしゃべれる。', trans: '能說得很快。' },
      volitional: { word: 'しゃべろう', sentence: 'もっと色[いろ]々しゃべろう！', trans: '再聊點別的吧！' }
    }
  },
  {
    id: 'teach',
    kanji: '教える',
    hiragana: 'おしえる',
    meaning: '教；告訴',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '教える', sentence: '日本語[にほんご]を教[おし]える。', trans: '教日文。' },
      masu: { word: '教えます', sentence: '道[みち]を教[おし]えます。', trans: '告訴你路。' },
      te: { word: '教えて', sentence: '私[わたし]にも教[おし]えて。', trans: '也告訴我吧。' },
      nai: { word: '教えない', sentence: '秘密[ひみつ]は教[おし]えない。', trans: '不告訴你秘密。' },
      ta: { word: '教えた', sentence: '全部[ぜんぶ]教[おし]えた。', trans: '全部都告訴了。' },
      potential: { word: '教えられる', sentence: '私[わたし]にも教[おし]えられる。', trans: '我也能教。' },
      volitional: { word: '教えよう', sentence: '彼[かれ]にやり方[かた]を教[おし]えよう。', trans: '我們把做法教給他吧。' }
    }
  },
  {
    id: 'borrow',
    kanji: '借りる',
    hiragana: 'かりる',
    meaning: '借入',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '借りる', sentence: '本[ほん]を借[か]りる。', trans: '借書。' },
      masu: { word: '借ります', sentence: 'お金[かね]を借[か]ります。', trans: '借錢。' },
      te: { word: '借りて', sentence: '辞書[じしょ]を借[か]りていい？', trans: '可以借字典嗎？' },
      nai: { word: '借りない', sentence: '人[ひと]からお金[かね]を借[か]りない。', trans: '不向人借錢。' },
      ta: { word: '借りた', sentence: '友達[ともだち]に車[くるま]を借[か]りた。', trans: '向朋友借了車。' },
      potential: { word: '借りられる', sentence: '図書館[としょかん]で借[か]りられる。', trans: '可以在圖書館借到。' },
      volitional: { word: '借りよう', sentence: '彼[かれ]に借[か]りよう。', trans: '我們向他借吧。' }
    }
  },
  {
    id: 'lend',
    kanji: '貸す',
    hiragana: 'かす',
    meaning: '借出',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '貸す', sentence: '辞書[じしょ]を貸[か]す。', trans: '借出字典。' },
      masu: { word: '貸します', sentence: 'お金[かね]を貸[か]します。', trans: '借出錢。' },
      te: { word: '貸して', sentence: '鉛筆[えんぴつ]を貸[か]して。', trans: '借我鉛筆。' },
      nai: { word: '貸さない', sentence: '誰[だれ]にも貸[か]さない。', trans: '不借給任何人。' },
      ta: { word: '貸した', sentence: '彼[かれ]にCDを貸[か]した。', trans: '借給他CD了。' },
      potential: { word: '貸せる', sentence: '必要[ひつよう]なら貸[か]せるよ。', trans: '如果需要的話可以借你。' },
      volitional: { word: '貸そう', sentence: '彼[かれ]に傘[かさ]を貸[か]そう。', trans: '我們借他傘吧。' }
    }
  },
  {
    id: 'turn_off',
    kanji: '消す',
    hiragana: 'けす',
    meaning: '關掉；熄滅',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '消す', sentence: '電気[でんき]を消[け]す。', trans: '關燈。' },
      masu: { word: '消します', sentence: 'テレビを消[け]します。', trans: '關電視。' },
      te: { word: '消して', sentence: '火[ひ]を消[け]して！', trans: '把火熄滅！' },
      nai: { word: '消さない', sentence: 'まだ電気[でんき]を消[け]さないで。', trans: '還不要關燈。' },
      ta: { word: '消した', sentence: '間違[まちが]いを消[け]した。', trans: '擦掉了錯誤（字）。' },
      potential: { word: '消せる', sentence: 'リモコンで消[け]せる。', trans: '可以用遙控器關掉。' },
      volitional: { word: '消そう', sentence: '窓[まど]を閉[し]めて、暖房[だんぼう]を消[け]よう。', trans: '關上窗戶，把暖氣關了吧。' }
    }
  },
  {
    id: 'turn_on',
    kanji: 'つける',
    hiragana: 'つける',
    meaning: '打開；點亮',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: 'つける', sentence: '電気[でんき]をつける。', trans: '開燈。' },
      masu: { word: 'つけます', sentence: 'ラジオを付[つ]けます。', trans: '打開收音機。' },
      te: { word: 'つけて', sentence: '暖房[だんぼう]をつけて。', trans: '打開暖氣。' },
      nai: { word: 'つけない', sentence: '夜[よる]はテレビを付[つ]けない。', trans: '晚上不開電視。' },
      ta: { word: 'つけた', sentence: 'エアコンを付[つ]けた。', trans: '打開了空調。' },
      potential: { word: 'つけられる', sentence: 'ボタン一[ひと]つで付[つ]けられる。', trans: '一個按鈕就能打開。' },
      volitional: { word: 'つけよう', sentence: '部屋[へや]が暗[くら]いから、電気[でんき]を付[つ]けよう。', trans: '房間很暗，我們開燈吧。' }
    }
  },
  {
    id: 'open_ru',
    kanji: '開ける',
    hiragana: 'あける',
    meaning: '打開',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '開ける', sentence: '窓[まど]を開[あ]ける。', trans: '開窗戶。' },
      masu: { word: '開けます', sentence: 'ドアを開[あ]けます。', trans: '開門。' },
      te: { word: '開けて', sentence: '少[すこ]し窓[まど]を開[あ]けてください。', trans: '請把窗戶打開一點。' },
      nai: { word: '開けない', sentence: '引[ひ]き出[だ]しを開[あ]けない。', trans: '不打開抽屜。' },
      ta: { word: '開けた', sentence: '箱[はこ]を開[あ]けた。', trans: '打開了箱子。' },
      potential: { word: '開けられる', sentence: '鍵[かぎ]があれば開[あ]けられる。', trans: '有鑰匙就能打開。' },
      volitional: { word: '開けよう', sentence: 'プレゼントの箱[はこ]を開[あ]けよう。', trans: '我們來打開禮物盒吧。' }
    }
  },
  {
    id: 'sit',
    kanji: '座る',
    hiragana: 'すわる',
    meaning: '坐下',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '座る', sentence: '椅子[いす]に座[すわ]る。', trans: '坐在椅子上。' },
      masu: { word: '座ります', sentence: 'ここへ座[すわ]ります。', trans: '我要坐在這裡。' },
      te: { word: '座って', sentence: '少[すこ]し座[すわ]って休[やす]んで。', trans: '請坐一下休息吧。' },
      nai: { word: '座らない', sentence: '立[た]ったままで座[すわ]らない。', trans: '站著不坐下。' },
      ta: { word: '座った', sentence: '彼[かれ]は静[しず]かに座[すわ]った。', trans: '他靜靜地坐下了。' },
      potential: { word: '座れる', sentence: 'まだ座[すわ]れる席[せき]がある。', trans: '還有可以坐的位子。' },
      volitional: { word: '座ろう', sentence: '疲[つか]れたから座[すわ]ろう。', trans: '累了，我們坐下吧。' }
    }
  },
  {
    id: 'stand',
    kanji: '立つ',
    hiragana: 'たつ',
    meaning: '站立',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '立つ', sentence: '前[まえ]に立[た]つ。', trans: '站在前面。' },
      masu: { word: '立ちます', sentence: '立[た]って待[ま]ちます。', trans: '站著等待。' },
      te: { word: '立って', sentence: '起立[きりつ]！立[た]って！', trans: '起立！站起來！' },
      nai: { word: '立たない', sentence: '電車[でんしゃ]の中[なか]では立[た]たない。', trans: '在電車裡不站著。' },
      ta: { word: '立った', sentence: '彼[かれ]は急[きゅう]に立[た]った。', trans: '他突然站起來了。' },
      potential: { word: '立てる', sentence: '壁[かべ]にもたれて立[た]てる。', trans: '靠著牆壁能站立。' },
      volitional: { word: '立とう', sentence: '次[つぎ]の駅[えき]で降[お]りるから立[た]とう。', trans: '下一站要下車，我們站起來吧。' }
    }
  },
  {
    id: 'put',
    kanji: '置く',
    hiragana: 'おく',
    meaning: '放置',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '置く', sentence: '荷物[にもつ]を床[ゆか]に置[お]く。', trans: '把行李放在地板上。' },
      masu: { word: '置きます', sentence: 'ここにお菓子[かし]を置[お]きます。', trans: '把零食放在這裡。' },
      te: { word: '置いて', sentence: '財布[さいふ]を置[お]いて行[い]く。', trans: '放下錢包離開。' },
      nai: { word: '置かない', sentence: '大事[だいじ]な物[もの]は置[お]かない。', trans: '不放置重要的東西。' },
      ta: { word: '置いた', sentence: '本[ほん]を棚[たな]に置[お]いた。', trans: '把書放在書架上了。' },
      potential: { word: '置ける', sentence: 'テーブルの上[うえ]に置[お]ける。', trans: '可以放在桌子上。' },
      volitional: { word: '置こう', sentence: 'とりあえず、そこに置[お]こう。', trans: '總之先放在那裡吧。' }
    }
  },
  {
    id: 'live',
    kanji: '住む',
    hiragana: 'すむ',
    meaning: '居住',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '住む', sentence: '東京[とうきょう]に住[す]む。', trans: '住在東京。' },
      masu: { word: '住みます', sentence: '一人[ひとり]で住[す]みます。', trans: '一個人住。' },
      te: { word: '住んで', sentence: '日本[にほん]に住[す]んでみたい。', trans: '想住在日本看看。' },
      nai: { word: '住まない', sentence: '都会[とかい]には住[す]まない。', trans: '不住在都市。' },
      ta: { word: '住んだ', sentence: '前[まえ]は大阪[おおさか]に住[す]んだ。', trans: '以前住在大阪。' },
      potential: { word: '住める', sentence: 'このアパートなら住[す]める。', trans: '如果是這個公寓就能住。' },
      volitional: { word: '住もう', sentence: '一緒[いっしょ]に住[す]もう。', trans: '我們住在一起吧。' }
    }
  },
  {
    id: 'wash',
    kanji: '洗う',
    hiragana: 'あらう',
    meaning: '清洗',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '洗う', sentence: '顔[かお]を洗[あら]う。', trans: '洗臉。' },
      masu: { word: '洗います', sentence: '手[て]を洗[あら]います。', trans: '洗手。' },
      te: { word: '洗って', sentence: '皿[さら]を洗[あら]ってから寝[ね]る。', trans: '洗完盤子再睡覺。' },
      nai: { word: '洗わない', sentence: '毎日[まいにち]は洗[あら]わない。', trans: '不是每天都洗。' },
      ta: { word: '洗った', sentence: '車[くるま]を洗[あら]った。', trans: '洗了車子。' },
      potential: { word: '洗える', sentence: '洗濯機[せんたくき]で洗[あら]える。', trans: '可以用洗衣機洗。' },
      volitional: { word: '洗おう', sentence: '汚[よご]れているから、洗[あら]おう。', trans: '因為髒了，我們洗一洗吧。' }
    }
  },
  {
    id: 'use',
    kanji: '使う',
    hiragana: 'つかう',
    meaning: '使用',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '使う', sentence: '辞書[じしょ]を使[つか]う。', trans: '使用字典。' },
      masu: { word: '使います', sentence: 'この道具[どうぐ]を使[つか]います。', trans: '使用這個工具。' },
      te: { word: '使って', sentence: '自由[じゆう]に使[つか]っていいよ。', trans: '你可以自由使用喔。' },
      nai: { word: '使わない', sentence: '携帯[けいたい]を使[つか]わない。', trans: '不使用手機。' },
      ta: { word: '使った', sentence: '全部[ぜんぶ]お金[かね]を使[つか]った。', trans: '把錢全部用完了。' },
      potential: { word: '使える', sentence: 'まだ使[つか]える。', trans: '還能用。' },
      volitional: { word: '使おう', sentence: '新[あたら]しいソフトを使[つか]おう。', trans: '我們來使用新軟體吧。' }
    }
  },
  {
    id: 'play',
    kanji: '遊ぶ',
    hiragana: 'あそぶ',
    meaning: '玩；遊玩',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '遊ぶ', sentence: '公園[こうえん]で遊[あそ]ぶ。', trans: '在公園玩。' },
      masu: { word: '遊びます', sentence: '友達[ともだち]と遊[あそ]びます。', trans: '和朋友玩耍。' },
      te: { word: '遊んで', sentence: '土曜日[どようび]に遊[あそ]んで。', trans: '星期六一起玩吧。' },
      nai: { word: '遊ばない', sentence: '最近[さいきん]は遊[あそ]ばない。', trans: '最近不玩了。' },
      ta: { word: '遊んだ', sentence: '昨日[きのう]、一日[いちにち]中[じゅう]遊[あそ]んだ。', trans: '昨天玩了一整天。' },
      potential: { word: '遊べる', sentence: '一日[いちにち]中[じゅう]遊[あそ]べる。', trans: '能玩一整天。' },
      volitional: { word: '遊ぼう', sentence: 'ゲームをして遊[あそ]ぼう。', trans: '我們玩遊戲吧。' }
    }
  },
  {
    id: 'finish',
    kanji: '終わる',
    hiragana: 'おわる',
    meaning: '結束',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '終わる', sentence: '仕事[しごと]が終[お]わる。', trans: '工作結束。' },
      masu: { word: '終わります', sentence: '授業[じゅぎょう]は五時[ごじ]に終[お]わります。', trans: '課程在五點結束。' },
      te: { word: '終わって', sentence: '仕事[しごと]が終[お]わってから帰[かえ]る。', trans: '工作結束後回家。' },
      nai: { word: '終わらない', sentence: 'テストがなかなか終[お]わらない。', trans: '考試一直沒結束。' },
      ta: { word: '終わった', sentence: '会議[かいぎ]が終[お]わった。', trans: '會議結束了。' },
      potential: { word: '終われる', sentence: '早[はや]く終[お]われる。', trans: '能早點結束。' },
      volitional: { word: '終わろう', sentence: 'きりのいいところまでで終[お]わろう。', trans: '做到一個段落就結束吧。' }
    }
  },
  {
    id: 'open_u',
    kanji: '開く',
    hiragana: 'ひらく',
    meaning: '開；打開（自動詞）',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '開く', sentence: 'ドアが開[ひら]く。', trans: '門打開了。' },
      masu: { word: '開きます', sentence: 'お店[みせ]は九時[くじ]に開[ひら]きます。', trans: '店鋪九點開門。' },
      te: { word: '開いて', sentence: '窓[まど]が開[あ]いて風[かぜ]が入[はい]る。', trans: '窗戶開著，風吹了進來。' },
      nai: { word: '開かない', sentence: '鍵[かぎ]がないと開[ひら]かない。', trans: '沒有鑰匙打不開。' },
      ta: { word: '開いた', sentence: '目[め]が覚[さ]めて、目[め]が開[ひら]いた。', trans: '醒來，眼睛睜開了。' },
      potential: { word: '開ける', sentence: '（與他動詞混淆，不常用）', trans: '（不常用於此意）' },
      volitional: { word: '開こう', sentence: '本[ほん]を開[ひら]こう。', trans: '我們把書打開吧。' }
    }
  },
  {
    id: 'close',
    kanji: '閉める',
    hiragana: 'しめる',
    meaning: '關上（他動詞）',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: '閉める', sentence: '窓[まど]を閉[し]める。', trans: '關窗戶。' },
      masu: { word: '閉めます', sentence: 'ドアを閉[し]めます。', trans: '關門。' },
      te: { word: '閉めて', sentence: 'カーテンを閉[し]めて。', trans: '請拉上窗簾。' },
      nai: { word: '閉めない', sentence: '鍵[かぎ]をかけずに閉[し]めない。', trans: '不鎖門地關上。' },
      ta: { word: '閉めた', sentence: '部屋[へや]の電気[でんき]を消[け]してドアを閉[し]めた。', trans: '關了房燈，關了門。' },
      potential: { word: '閉められる', sentence: '軽[かる]くて簡単[かんたん]に閉[し]められる。', trans: '很輕，能輕易關上。' },
      volitional: { word: '閉めよう', sentence: '寒[さむ]いから窓[まど]を閉[し]めよう。', trans: '很冷，我們把窗戶關上吧。' }
    }
  },
  {
    id: 'receive',
    kanji: 'もらう',
    hiragana: 'もらう',
    meaning: '得到；收到',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: 'もらう', sentence: 'プレゼントをもらう。', trans: '收到禮物。' },
      masu: { word: 'もらいます', sentence: '先生[せんせい]に本[ほん]をもらいます。', trans: '收到老師給的書。' },
      te: { word: 'もらって', sentence: '返事[へんじ]をもらって安心[あんしん]する。', trans: '收到回覆後就安心了。' },
      nai: { word: 'もらわない', sentence: '誰[だれ]からももらわない。', trans: '不收任何人的東西。' },
      ta: { word: 'もらった', sentence: '彼[かれ]から手紙[てがみ]をもらった。', trans: '收到了他寄來的信。' },
      potential: { word: 'もらえる', sentence: '賞金[しょうきん]がもらえる。', trans: '能拿到獎金。' },
      volitional: { word: 'もらおう', sentence: '助[たす]けてもらおう。', trans: '我們請人幫忙吧。' }
    }
  },
  {
    id: 'give_to',
    kanji: 'あげる',
    hiragana: 'あげる',
    meaning: '給予（給予者>接收者）',
    group: 'Ru-Verb (二類)',
    level: 'N5',
    forms: {
      dictionary: { word: 'あげる', sentence: '友達[ともだち]にプレゼントをあげる。', trans: '給朋友禮物。' },
      masu: { word: 'あげます', sentence: '妹[いもうと]に本[ほん]を上[あ]げます。', trans: '給妹妹書。' },
      te: { word: 'あげて', sentence: '母[はは]にお茶[ちゃ]を入[い]れて上[あ]げて。', trans: '請給媽媽泡茶。' },
      nai: { word: 'あげない', sentence: 'その秘密[ひみつ]は誰[だれ]にも上[あ]げない。', trans: '那個秘密不告訴任何人。' },
      ta: { word: 'あげた', sentence: '彼[かれ]に手伝[てつだ]って上[あ]げた。', trans: '幫了他一個忙。' },
      potential: { word: 'あげられる', sentence: '私[わたし]から上[あ]げられる。', trans: '我可以給出去。' },
      volitional: { word: 'あげよう', sentence: '彼[かれ]にチョコレートを上[あ]げよう。', trans: '我們給他巧克力吧。' }
    }
  },
  {
    id: 'meet',
    kanji: '会う',
    hiragana: 'あう',
    meaning: '見面',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '会う', sentence: '社長[しゃちょう]に会[あ]う。', trans: '見社長。' },
      masu: { word: '会います', sentence: '友達[ともだち]に会[あ]います。', trans: '與朋友見面。' },
      te: { word: '会って', sentence: '明日[あした]会[あ]って話[はな]そう。', trans: '明天見面聊吧。' },
      nai: { word: '会わない', sentence: 'もう二度[にど]と会[あ]わない。', trans: '不會再見面了。' },
      ta: { word: '会った', sentence: '駅[えき]で偶然[ぐうぜん]会[あ]った。', trans: '在車站偶然遇見了。' },
      potential: { word: '会える', sentence: 'いつでも会[あ]える。', trans: '隨時都能見面。' },
      volitional: { word: '会おう', sentence: '週末[しゅうまつ]に会[あ]おう。', trans: '週末見面吧。' }
    }
  },
  {
    id: 'pay',
    kanji: '払う',
    hiragana: 'はらう',
    meaning: '支付；付款',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '払う', sentence: 'お金[かね]を払[はら]う。', trans: '付錢。' },
      masu: { word: '払います', sentence: 'レジで払[はら]います。', trans: '在收銀台付款。' },
      te: { word: '払って', sentence: '先[さき]に払[はら]ってね。', trans: '請先付款喔。' },
      nai: { word: '払わない', sentence: '税金[ぜいきん]を払[はら]わない。', trans: '不繳稅金。' },
      ta: { word: '払った', sentence: '電車賃[でんしゃちん]を払[はら]った。', trans: '支付了車費。' },
      potential: { word: '払える', sentence: 'カードでも払[はら]える。', trans: '也可以用卡付款。' },
      volitional: { word: '払おう', sentence: '私[わたし]が払[はら]おう。', trans: '我來付吧。' }
    }
  },
  {
    id: 'know',
    kanji: '知る',
    hiragana: 'しる',
    meaning: '知道；認識',
    group: 'U-Verb (一類)',
    level: 'N5',
    forms: {
      dictionary: { word: '知る', sentence: '真実[しんじつ]を知[し]る。', trans: '知道真相。' },
      masu: { word: '知ります', sentence: '彼[かれ]のことはよく知[し]ります。', trans: '對他很了解。' },
      te: { word: '知って', sentence: '詳[くわ]しく知[し]っている？', trans: '你詳細知道嗎？' },
      nai: { word: '知らない', sentence: '私[わたし]は彼[かれ]を知[し]らない。', trans: '我不認識他。' },
      ta: { word: '知った', sentence: 'ニュースでその事件[じけん]を知[し]った。', trans: '從新聞上得知了那個事件。' },
      potential: { word: '知れる', sentence: '誰[だれ]でも知[し]れる。', trans: '誰都能知道。' },
      volitional: { word: '知ろう', sentence: '詳[くわ]しい情報[じょうほう]を知[し]ろう。', trans: '我們去了解詳細資訊吧。' }
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