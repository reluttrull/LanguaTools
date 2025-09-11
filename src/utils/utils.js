//class utils {
  function addDays(date, days) {
    const copy = new Date(date.getTime());
    copy.setDate(copy.getDate() + days);
    return copy.toUTCString();
  };

  export function addDaysToDateString(datestr, days) {
    if (!isDateString(datestr)) return null;
    return new Date(new Date().setDate(new Date(datestr).getUTCDate() + days))
                                .toISOString().split('T')[0];
  }
  
  export function isDateString (str) {
    const regex = /^\d{4}-\d{2}-\d{2}$/; // Example: YYYY-MM-DD
    if (!regex.test(str)) return false;
    return true;
  };
  
  export const ReviewSpeed = {
    SLOW: '32',
    NORMAL: '16',
    FAST: '8'
  };
  export const CardFrontLanguage = {
    TARGET: 'Target language',
    NATIVE: 'Native language'
  };
  export const CardOrder = {
    INORDER: "In order",
    SHUFFLED: "Shuffled"
  };
  export const LocalStorageKeys = {
    SPEED: "speed",
    CARDFRONTLANGUAGE: "cardFrontLanguage",
    CARDORDER: "cardOrder",
    MAXNEW: "maxNew",
    MAXREVIEW: "maxReview"
  }
  export const DailyLocalStorageKeys = {
    TOTALCARDS: "totalCards",
    CORRECTCARDS: "correctCards",
    INCORRECTCARDS: "incorrectCards",
    NEWCARDS: "newCards",
    REVIEWCARDS: "reviewCards",
    TOTALRECORDINGS: "totalRecordings",
    TOTALPRONUNCIATIONCARDS: "totalPronunciationCards"
  }