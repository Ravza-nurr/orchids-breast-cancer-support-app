export interface Symptom {
  id: string;
  title: string;
  shortLetter: string;
  letterColor: string;
  description: string;
  recommendations: string[];
  videoTitle: string;
}

export const symptoms: Symptom[] = [
  {
    id: '1',
    title: 'Enfeksiyon',
    shortLetter: 'E',
    letterColor: '#2BBBAD',
    description:
      'Kemoterapi sırasında bağışıklık sistemi zayıflar ve vücudunuz enfeksiyonlara karşı daha savunmasız hale gelir. Ateş, titreme, öksürük veya idrar yolu belirtileri enfeksiyonun habercisi olabilir.',
    recommendations: [
      'Ateş 38°C üzerine çıkarsa hemen doktorunuza başvurun.',
      'Ellerinizi sık sık ve doğru şekilde yıkayın.',
      'Kalabalık ve kapalı ortamlardan kaçının.',
      'Çiğ veya az pişmiş gıdalardan uzak durun.',
      'Ağız hijyenine özen gösterin.',
    ],
    videoTitle: 'Kemoterapi İlişkili Enfeksiyon Yönetimi',
  },
  {
    id: '2',
    title: 'Kanama',
    shortLetter: 'K',
    letterColor: '#E53935',
    description:
      'Kemoterapi, trombosit sayısını düşürerek kanama riskini artırabilir. Diş etlerinde, burunda veya ciltte beklenmedik kanamalar görülebilir.',
    recommendations: [
      'Yumuşak diş fırçası kullanın.',
      'Burnu çok kuvvetli silmeyin.',
      'Kesici aletleri dikkatlice kullanın.',
      'Aspirin ve ibuprofen gibi ilaçlardan kaçının.',
      'Küçük kesiklerde baskı uygulayın; durmazsa doktora gidin.',
    ],
    videoTitle: 'Trombosit Düşüklüğünde Kanama Yönetimi',
  },
  {
    id: '3',
    title: 'Ağrı',
    shortLetter: 'A',
    letterColor: '#7C4DFF',
    description:
      'Kemoterapi tedavisi sırasında çeşitli bölgelerde ağrı yaşanabilir. Bu ağrı; baş ağrısı, kas ağrısı veya sinir ağrısı şeklinde görülebilir.',
    recommendations: [
      'Ağrıyı doktorunuza bildirin; ağrının yeri, şiddeti ve süresi hakkında bilgi verin.',
      'Reçete edilmemiş ağrı kesicileri almadan önce doktorunuza danışın.',
      'Sıcak veya soğuk uygulama yardımcı olabilir.',
      'Dinlenmeye ve stres azaltmaya özen gösterin.',
      'Hafif egzersiz ve yürüyüş bazı ağrıları hafifletebilir.',
    ],
    videoTitle: 'Kemoterapi Sürecinde Ağrı Yönetimi',
  },
  {
    id: '4',
    title: 'Nefes Darlığı',
    shortLetter: 'N',
    letterColor: '#00BCD4',
    description:
      'Bazı kemoterapi ilaçları akciğerleri etkileyebilir veya anemi nedeniyle nefes darlığı yaşanabilir. Hafif aktivitelerle bile nefes almakta güçlük çekebilirsiniz.',
    recommendations: [
      'Ani veya şiddetli nefes darlığında hemen tıbbi yardım alın.',
      'Yavaş ve derin nefes egzersizleri yapın.',
      'Mümkünse temiz hava alın, havalandırılmış ortamda kalın.',
      'Aktivitelerinizi küçük adımlara bölün.',
      'Yatarken başınızı yükseltin.',
    ],
    videoTitle: 'Nefes Darlığı Baş Etme Yöntemleri',
  },
  {
    id: '5',
    title: 'Ağız Kuruluğu',
    shortLetter: 'A',
    letterColor: '#FF9800',
    description:
      'Kemoterapi tükürük bezlerini olumsuz etkileyebilir ve ağız kuruluğuna yol açabilir. Bu durum yemek yemeyi ve konuşmayı zorlaştırabilir.',
    recommendations: [
      'Sık sık küçük yudumlarla su için.',
      'Şekersiz sakız veya şeker ağız kuruluğunu hafifletebilir.',
      'Tuzlu, baharatlı ve asitli yiyeceklerden kaçının.',
      'Kafein ve alkol içermeyen içecekler tercih edin.',
      'Yapay tükürük ürünleri kullanmayı düşünün.',
    ],
    videoTitle: 'Ağız Kuruluğu Yönetimi',
  },
  {
    id: '6',
    title: 'Ağız Yaraları',
    shortLetter: 'A',
    letterColor: '#E91E63',
    description:
      'Mukozit olarak da bilinen ağız yaraları, kemoterapi sırasında sık görülen bir yan etkidir. Ağız mukozasında iltihap ve yaralar oluşabilir.',
    recommendations: [
      'Günde en az 4 kez yumuşak bir diş fırçasıyla diş fırçalayın.',
      'Tuz ve soda ile hazırlanmış gargarayı günde birkaç kez uygulayın.',
      'Sert, keskin veya baharatlı yiyeceklerden kaçının.',
      'Ağzınızı nemli tutun.',
      'Ağır yaralarda doktorunuza başvurun.',
    ],
    videoTitle: 'Kemoterapi İlişkili Ağız Yarası Yönetimi',
  },
  {
    id: '7',
    title: 'Bulantı ve Kusma',
    shortLetter: 'B',
    letterColor: '#43A047',
    description:
      'Bulantı ve kusma, kemoterapinin en yaygın yan etkilerinden biridir. Tedavinin hemen ardından başlayabilir veya birkaç gün sonra ortaya çıkabilir.',
    recommendations: [
      'Küçük ve sık öğünler tercih edin.',
      'Yağlı, kızartılmış ve baharatlı yiyeceklerden kaçının.',
      'Soğuk veya oda sıcaklığındaki yiyecekler daha iyi tolere edilebilir.',
      'Bulantı önleyici ilaçlarınızı zamanında alın.',
      'Yemekten sonra en az bir saat istirahat edin.',
    ],
    videoTitle: 'Kemoterapi İlişkili Bulantı ve Kusma Yönetimi',
  },
  {
    id: '8',
    title: 'İştahsızlık',
    shortLetter: 'İ',
    letterColor: '#FF7043',
    description:
      'Kemoterapi sırasında yemek yeme isteği azalabilir. Yeterli beslenme tedavi sürecinde kritik öneme sahiptir.',
    recommendations: [
      'Küçük porsiyon ama sık sık yemeye çalışın.',
      'En iştahlı olduğunuz saatlerde daha fazla yemeye özen gösterin.',
      'Protein açısından zengin gıdalar tüketin.',
      'Sevdiğiniz yemekleri hazır tutun.',
      'Beslenme konusunda diyetisyen desteği alın.',
    ],
    videoTitle: 'İştahsızlık ile Başa Çıkma Yolları',
  },
  {
    id: '9',
    title: 'Tat ve Koku Değişiklikleri',
    shortLetter: 'T',
    letterColor: '#8BC34A',
    description:
      'Kemoterapi tat ve koku algısını değiştirebilir. Bazı yiyecekler metalik, tuzlu veya farklı bir tat bırakabilir.',
    recommendations: [
      'Metal kaplar yerine plastik veya cam kaplar kullanın.',
      'Güçlü kokulu yiyeceklerden kaçının.',
      'Nötr kokulu, hafif yiyecekler tercih edin.',
      'Yemekten önce ağzınızı çalkalayın.',
      'Denemeler yaparak hangi yiyeceklerin daha iyi tolere edildiğini keşfedin.',
    ],
    videoTitle: 'Tat ve Koku Değişiklikleriyle Başa Çıkma',
  },
  {
    id: '10',
    title: 'Kabızlık',
    shortLetter: 'K',
    letterColor: '#795548',
    description:
      'Bazı kemoterapi ilaçları ve ağrı kesiciler bağırsak hareketlerini yavaşlatarak kabızlığa yol açabilir.',
    recommendations: [
      'Günde en az 8 bardak su için.',
      'Lifli gıdalar (meyve, sebze, tam tahıl) tüketin.',
      'Hafif yürüyüş gibi fiziksel aktivite yapın.',
      'Doktorunuzun önerdiği laksatif ilaçları kullanın.',
      'Tuvaleti ertelemekten kaçının.',
    ],
    videoTitle: 'Kemoterapi Sürecinde Kabızlık Yönetimi',
  },
  {
    id: '11',
    title: 'Yorgunluk ve Halsizlik',
    shortLetter: 'Y',
    letterColor: '#9E9E9E',
    description:
      'Kemoterapi sürecindeki yorgunluk, dinlenmekle geçmeyebilir. Günlük aktiviteler daha zor hale gelebilir.',
    recommendations: [
      'Enerji tasarrufu yapın; önemli aktivitelere odaklanın.',
      'Kısa ve düzenli dinlenme araları verin.',
      'Hafif egzersizler (yürüyüş, yoga) enerji seviyesini artırabilir.',
      'Uyku düzeninize dikkat edin.',
      'Yardım istemekten çekinmeyin.',
    ],
    videoTitle: 'Kemoterapi Yorgunluğu ile Başa Çıkma',
  },
  {
    id: '12',
    title: 'Cilt Sorunları',
    shortLetter: 'C',
    letterColor: '#FF5722',
    description:
      'Kemoterapi cildi kurutabilir, hassaslaştırabilir veya döküntüye yol açabilir. Güneş ışığına karşı aşırı hassasiyet de görülebilir.',
    recommendations: [
      'Nemlendirici kremler düzenli kullanın.',
      'Sert sabun ve kimyasallardan kaçının.',
      'Güneşe çıkarken yüksek koruma faktörlü güneş kremi kullanın.',
      'Gevşek, pamuklu giysiler tercih edin.',
      'Şiddetli döküntü veya kaşıntıda doktorunuza başvurun.',
    ],
    videoTitle: 'Kemoterapi Sürecinde Cilt Bakımı',
  },
];
