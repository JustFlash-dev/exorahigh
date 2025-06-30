// async function getGoogleScriptToken() {
//   try {
//     const response = await fetch('/get-token.php');
//     if (!response.ok) {
//       const text = await response.text();
//       throw new Error(`HTTP error! status: ${response.status}, body: ${text}`);
//     }
//     const data = await response.json();
//     console.log('Token response:', data);
//     if (data.error) throw new Error(data.error);
//     return data.token;
//   } catch (error) {
//     console.error('Error fetching token:', error);
//     throw error;
//   }
// }

async function getGoogleScriptToken() {
  const response = await fetch('/get-token.php');
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const data = await response.json();
  if (data.error) throw new Error(data.error);
  return data.token;
}