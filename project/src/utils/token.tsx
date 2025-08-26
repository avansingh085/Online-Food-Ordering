export const setToken = (token: string): void => {

  localStorage.setItem('beks_access_token', token);

};

export const getToken=(): any =>{

   return localStorage.getItem('beks_access_token');
   
}
