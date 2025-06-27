async function getGoogleScriptToken() {
  const res = await fetch('/get-token.php');
  const data = await res.json();
  return data.token;
}