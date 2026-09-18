export interface QuranReciter {
  id: string;
  nameAr: string;
  nameEn: string;
  folder: string;
}

export const QURAN_RECITERS: QuranReciter[] = [
  {
    id: 'abdulsamad',
    nameAr: 'الشيخ عبد الباسط عبد الصمد (مرتل)',
    nameEn: 'AbdulBasit AbdulSamad (Murattal)',
    folder: 'AbdulSamad_64kbps_QuranExplorer.Com',
  },
  {
    id: 'alafasy',
    nameAr: 'الشيخ مشاري راشد العفاسي',
    nameEn: 'Mishary Rashid Alafasy',
    folder: 'Alafasy_128kbps',
  },
  {
    id: 'husary',
    nameAr: 'الشيخ محمود خليل الحصري (المعلم)',
    nameEn: 'Mahmoud Khalil Al-Husary (Muallim)',
    folder: 'Husary_128kbps',
  },
  {
    id: 'minshawy',
    nameAr: 'الشيخ محمد صديق المنشاوي (مجود)',
    nameEn: 'Mohamed Siddiq Al-Minshawy',
    folder: 'Minshawy_Mujawwad_192kbps',
  },
];

export interface SurahMeta {
  number: number;
  nameAr: string;
  nameEn: string;
  versesCount: number;
}

export const COMMON_SURAHS: SurahMeta[] = [
  { number: 1, nameAr: 'الفاتحة', nameEn: 'Al-Fatiha', versesCount: 7 },
  { number: 2, nameAr: 'البقرة', nameEn: 'Al-Baqarah', versesCount: 286 },
  { number: 36, nameAr: 'يس', nameEn: 'Yasin', versesCount: 83 },
  { number: 55, nameAr: 'الرحمن', nameEn: 'Ar-Rahman', versesCount: 78 },
  { number: 67, nameAr: 'الملك', nameEn: 'Al-Mulk', versesCount: 30 },
  { number: 112, nameAr: 'الإخلاص', nameEn: 'Al-Ikhlas', versesCount: 4 },
  { number: 113, nameAr: 'الفلق', nameEn: 'Al-Falaq', versesCount: 5 },
  { number: 114, nameAr: 'الناس', nameEn: 'An-Nas', versesCount: 6 },
];

/**
 * Builds EveryAyah CDN audio URL based on Surah number and Ayah number.
 * Format: https://everyayah.com/data/{folder}/{SSS}{AAA}.mp3
 * e.g., Surah 1, Ayah 3 -> 001003.mp3
 */
export function getEveryAyahUrl(
  surahNumber: number,
  ayahNumber: number,
  reciterFolder: string = 'AbdulSamad_64kbps_QuranExplorer.Com'
): string {
  const sss = String(surahNumber).padStart(3, '0');
  const aaa = String(ayahNumber).padStart(3, '0');
  return `https://everyayah.com/data/${reciterFolder}/${sss}${aaa}.mp3`;
}
