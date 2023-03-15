export function cropText(text: string | undefined) {
  // split the text into an array of words
  if (!text) return '';
  const words = text.split(' ');

  // if the number of words is less than or equal to 50, return the original text
  if (words.length <= 50) {
    return text;
  }

  // otherwise, join the first 50 words and add an ellipsis at the end
  const croppedText = words.slice(0, 50).join(' ') + ' ...';
  return croppedText;
}
