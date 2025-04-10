function handleCredentialResponse(response) {
   const data = parseJwt(response.credential);
  console.log("Connecté avec :", data);
  
   localStorage.setItem("user", JSON.stringify(data));

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

const button = document.getElementById('btn');
const password = document.getElementById('password');
const mail = document.getElementById('email');
const loginForm = document.getElementById('loginForm')

loginForm.addEventListener('submit',(event)=>{
  event.preventDefault();
     
 
  if (mail.value != "" && password.value != "") {
    if (password.value.length >= 8 ) {
    button.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Loading...';

    setTimeout(()=>{
      window.location.href = "/assets/pages/menu.html";
    }, 3000)
    
  } else{
    alert('error')
  }

    
  }

})
