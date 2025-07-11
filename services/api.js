// import axios from 'axios';

// const API_BASE_URL = 'http://172.17.1.110:8080/MunisysCRM_api_STG';

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://172.17.1.110:8080/MunisysCRM_api_STG',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
