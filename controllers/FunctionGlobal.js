//Function for Random Code
export function generateRandomCode() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let randomCode = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    randomCode += alphabet.charAt(randomIndex);
  }

  return randomCode;
}
