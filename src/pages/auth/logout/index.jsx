export const performLogout = () => {
  localStorage.removeItem('usuario');
  
  window.location.href = "/login"; 
};
