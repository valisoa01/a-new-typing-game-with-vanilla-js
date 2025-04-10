function handleCredentialResponse(response) {
  // Décoder le JWT pour extraire le nom, email, etc.
  const data = parseJwt(response.credential);
  console.log("Connecté avec :", data);
  
  // Stocker les infos si besoin
  localStorage.setItem("user", JSON.stringify(data));

  // Rediriger vers page d'accueil
  window.location.href = "/assets/pages/menu.html";
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}

window.onload = () => {
  google.accounts.id.initialize({
    client_id: "940374287458-jblc2ahrdplmjctghabpmgirdiauuvjc.apps.googleusercontent.com",
    callback: handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("g_id_signin"),
    { theme: "outline", size: "large" }
  );
};