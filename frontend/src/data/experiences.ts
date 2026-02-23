export interface Experience {
  id: string;
  title: string;
  author: string;
  date: string;
  preview: string;
  story: string;
  imageColor: string;
}

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Meme Kanseri Tanısı Alan Hasta Deneyimi 1',
    author: 'Ayşe H.',
    date: 'Mart 2024',
    preview: 'Tanı aldığımda ilk hissettiğim şey şoktu. Ama yılmadım...',
    imageColor: '#E0F5F4',
    story: `Meme kanseri tanısı aldığımda 42 yaşındaydım. İlk duyduğumda dünyam durdu gibi hissettim. "Neden ben?" sorusu zihnimde döndü durdu.

Ancak ailemi düşününce güçlü olmam gerektiğini anladım. Onkoloji uzmanım bana ayrıntılı bir tedavi planı sundu. Kemoterapi sürecine başladım.

İlk seanslarda bulantı ve halsizlik çok zorladı beni. Ama hastanedeki hemşireler ve doktorlar her adımda yanımdaydı. Bu destek çok değerliydi.

Saçlarım döküldüğünde moral bozuldu ama bu geçiciydi. Peruklarla, türbanlarla kendimi ifade etmeyi öğrendim. Topluluk gruplarındaki diğer kadınlarla paylaşım yapmak bana güç verdi.

Bugün remisyondayım. Düzenli kontrollerimle hayatımı sürdürüyorum. Kanseri yensek de hayat daha değerli ve anlamlı hale geldi. Siz de bu süreçten geçiyorsanız, yalnız olmadığınızı bilin.`,
  },
  {
    id: '2',
    title: 'Meme Kanseri Tanısı Alan Hasta Deneyimi 2',
    author: 'Fatma K.',
    date: 'Ocak 2024',
    preview: 'Kemoterapi sürecim boyunca öğrendiklerim ve başa çıkma yöntemlerim...',
    imageColor: '#FFF3EE',
    story: `38 yaşında meme kanseri teşhisi aldım. Evli ve iki çocuk annesiyim. Ailem ile birlikte bu süreci atlatmak için elimizden geleni yaptık.

Kemoterapi tedavisi boyunca en çok yorgunlukla mücadele ettim. Her gün kalkıp çocuklarıma bakabilmek için kendimi zorluyordum.

Beslenmeye çok önem verdim. Diyetisyen eşliğinde hazırladığım beslenme programı hem güçlü kalmamı hem de yan etkileri azaltmamı sağladı.

Psikolojik destek almak da kritik önemdeydi. Onkoloji psikologu ile yaptığım görüşmeler, kaygılarımı yönetmeme yardımcı oldu.

Şu an tedavim tamamlandı. Gelecek için umutluyum. Bu süreçten geçen herkese tavsiyem: Profesyonel destek alın, sosyal çevrenizle iletişimde kalın ve kendinize iyi bakın.`,
  },
  {
    id: '3',
    title: 'Meme Kanseri Tanısı Alan Hasta Deneyimi 3',
    author: 'Zeynep T.',
    date: 'Kasım 2023',
    preview: 'Tedavi sürecimde bana en çok yardımcı olan şeyler ve öğrendiklerim...',
    imageColor: '#EDE7FF',
    story: `55 yaşında kanser teşhisi aldım. Emekliydim ve bu süreçte zamanımı nasıl değerlendireceğimi bilmiyordum.

Kemoterapi seanslarım haftada bir gündü. O gün evde dinleniyordum, diğer günlerde hafif aktiviteler yapmaya çalışıyordum.

Arkadaşlarım ve komşularım çok destekleyiciydi. Yemek getiriyorlar, alışverişime yardım ediyorlardı. Bu insani sıcaklık çok iyileştirici oldu.

El sanatları yapmak bana büyük bir rahatlama sağladı. Örgü örerken hem zaman geçiyor hem de zihnim olumsuz düşüncelerden uzaklaşıyordu.

Bu deneyim bana hayatın ne kadar değerli olduğunu öğretti. Şimdi her güne şükranla bakıyorum ve meme kanseri farkındalığı için gönüllü çalışmalar yapıyorum.`,
  },
  {
    id: '4',
    title: 'Meme Kanseri Tanısı Alan Hasta Deneyimi 4',
    author: 'Hande M.',
    date: 'Eylül 2023',
    preview: 'Genç bir anne olarak kanserle mücadelemi sizlerle paylaşmak istiyorum...',
    imageColor: '#E8F5E9',
    story: `30 yaşımda, 1 yaşında bir bebeğim varken aldığım teşhis hayatımı altüst etti. Çok genç olduğumu düşünüyordum ama kanserin yaş seçmediğini öğrendim.

Emzirme dönemindeyken farkedilen kitleyi görmezden gelmemiştim neyse ki. Erken teşhis sayesinde tedavim daha az zorlu oldu.

Bebek bakımı ile kemoterapi aynı dönemde sürdü. Annem ve kaynanam dönüşümlü geldi, bana yardım etti. Eşim de uzaktan çalışma imkânı sağlayarak yanımda oldu.

İyileşme sürecim 18 ay sürdü. Bugün 3 yaşında sağlıklı bir kızım var ve ben de sağlıklıyım.

Genç kadınlara sesleniyorum: Kendinizi düzenli kontrol ettirin. Meme muayenesini aksatmayın. Erken teşhis hayat kurtarır.`,
  },
];
