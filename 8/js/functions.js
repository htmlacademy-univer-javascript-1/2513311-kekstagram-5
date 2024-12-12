/* eslint-disable no-console */
function isStringLengthValid(str, maxLength) {
  return str.length <= maxLength;
}

isStringLengthValid('проверяемая строка', 20); // true
isStringLengthValid('проверяемая строка', 18); // true
isStringLengthValid('проверяемая строка', 10); // false

function isPalindrome(str) {
  const normalizedStr = str.replaceAll(' ', '').toLowerCase();
  const reversedStr = normalizedStr.split('').reverse().join('');
  return normalizedStr === reversedStr;
}

isPalindrome('топот'); // true
isPalindrome('ДовОд'); // true
isPalindrome('Кекс'); // false
isPalindrome('Лёша на полке клопа нашёл'); // true

//ЗАДАНИЕ ПЯТОГО МОДУЛЯ

function meetingInWorkingHours(startWork, endWork, meetingStart, meetingDuration) {
  function toMinutes(time) {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  const startWorkMinutes = toMinutes(startWork);
  const endWorkMinutes = toMinutes(endWork);
  const meetingStartMinutes = toMinutes(meetingStart);
  const meetingEndMinutes = meetingStartMinutes + meetingDuration;

  return meetingStartMinutes >= startWorkMinutes && meetingEndMinutes <= endWorkMinutes;
}

console.log(meetingInWorkingHours('08:00', '17:30', '14:00', 90)); // true
console.log(meetingInWorkingHours('8:0', '10:0', '8:0', 120)); // true
console.log(meetingInWorkingHours('08:00', '14:30', '14:00', 90)); // false
console.log(meetingInWorkingHours('14:00', '17:30', '08:0', 90)); // false
console.log(meetingInWorkingHours('8:00', '17:30', '08:00', 900)); // false
