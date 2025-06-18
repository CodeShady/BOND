export const hexToBinary = (hex: string): string => {
  return hex.split('').map(char => parseInt(char, 16).toString(2).padStart(4, '0')).join('');
};