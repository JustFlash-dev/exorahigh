async function getGoogleScriptToken() {
  const response = await fetch('/get-token.php');
  const data = await response.json();
  return data.token;
}