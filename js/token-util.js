async function getGoogleScriptToken() {
  const res = await fetch('https://canadanews.space/get-token.php');
  const data = await res.json();
  return data.token;
}