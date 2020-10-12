import axios from 'axios';

let token='CLONTAGRAM_TOKEN';

export function setToken(tokenaccess){
    token = tokenaccess;
}

export function getToken(){
    return token;
}