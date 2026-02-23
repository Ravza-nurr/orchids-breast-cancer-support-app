export interface DashboardItem {
  id: string;
  title: string;
  icon: string;
  color: string;
  route: string;
}

export const dashboardItems: DashboardItem[] = [
  {
    id: 'covid',
    title: 'Covid-19 Bilgilendirme',
    icon: '🦠',
    color: '#2BBBAD',
    route: 'Covid19',
  },
  {
    id: 'breastCancer',
    title: 'Meme Kanseri Hakkında',
    icon: '🎗️',
    color: '#FF7043',
    route: 'BreastCancerInfo',
  },
  {
    id: 'symptom',
    title: 'Belirti Yönetimi',
    icon: '📋',
    color: '#7C4DFF',
    route: 'SymptomList',
  },
  {
    id: 'expert',
    title: 'Uzmana Sor',
    icon: '👨‍⚕️',
    color: '#00BCD4',
    route: 'AskExpert',
  },
  {
    id: 'experiences',
    title: 'Hasta Deneyimleri',
    icon: '💬',
    color: '#E91E63',
    route: 'PatientExperiences',
  },
  {
    id: 'calendar',
    title: 'Belirti Takvimi',
    icon: '📅',
    color: '#FF9800',
    route: 'SymptomCalendar',
  },
  {
    id: 'bloodTest',
    title: 'Kan Tahlili Yükle',
    icon: '🩸',
    color: '#F44336',
    route: 'UploadBloodTest',
  },
  {
    id: 'about',
    title: 'Hakkında',
    icon: 'ℹ️',
    color: '#607D8B',
    route: 'About',
  },
  {
    id: 'contact',
    title: 'İletişim',
    icon: '📞',
    color: '#4CAF50',
    route: 'Contact',
  },
<<<<<<< HEAD
  {
    id: 'medication',
    title: 'İlaç Hatırlatıcı',
    icon: '💊',
    color: '#5C6BC0',
    route: 'MedicationReminder',
  },
=======
>>>>>>> e7943bb7d0925eac70b72e76ad094c53fc39da5f
];
