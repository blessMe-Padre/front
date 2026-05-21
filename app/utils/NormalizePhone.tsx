/**
 * Преобразует телефонный номер в формат для ссылки `tel:`
 * @param phone - номер в любом формате (с пробелами, скобками, дефисами, +7 или 8)
 * @returns строка вида "tel:+7XXXXXXXXXX" (стандарт E.164)
 */
export default function normalizePhone(phone: string | undefined): string {
    if (!phone) return '';
  
    // Оставляем только цифры
    const digits = phone.replace(/\D/g, '');
  
    if (!digits) return '';
  
    // Нормализация для российских номеров
    if (digits.length === 11 && digits.startsWith('8')) {
      return `tel:+7${digits.slice(1)}`;
    }
    if (digits.length === 11 && digits.startsWith('7')) {
      return `tel:+${digits}`;
    }
    if (digits.length === 10) {
      // Если передан номер без кода страны (10 цифр), добавляем +7
      return `tel:+7${digits}`;
    }
  
    // Для международных номеров или нестандартной длины 
    // просто подставляем плюс (согласно спецификации tel:)
    return `tel:+${digits}`;
  }