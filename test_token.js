const jwtDecodeModule = require('jwt-decode');
const jwtDecode = jwtDecodeModule.jwtDecode;

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMTIzNDU2IiwibmFtZSI6IkNoYXQiLCJyb2xlIjoiYWRtaW4ifQ.K1dMb5d3pH4vXqglHOpF3R3YJ2vFe6dOhgTUPvP1p3g';

try {
  const decoded = jwtDecode(token);
  console.log('Token décodé:', decoded);
} catch (e) {
  console.error('❌ Erreur lors du décodage :', e);
}
