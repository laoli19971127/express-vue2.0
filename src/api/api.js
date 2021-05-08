import http from '../utils/http'
// get请求
export function getUserByToken(params){
    return http.get('/getStudentBytoken',params)
}
export function getUserByName(params){
    return http.get('/getStudentByName',params)
}
// post请求
export function login(params){
    return http.post(`/login`,params)
}
// put 请求
export function getUser(params){
    return http.get(`/getUser`,params)
}

export function getRole(params){
    return http.get(`/role`,params)
}

export function insertUserRole(params){
    return http.post(`/insertUserRole`,params)
}

export function getMenu(params){
    return http.get(`/getMenu`,params)
}

export function updataMenuStatus(params){
    return http.get(`/updataStatus`,params)
}

export function insertRoleMenu(params){
    return http.post(`/insertRoleMenu`,params)
}

export function importExcle(params){
    let config = {
        headers: { "Content-Type": "multipart/form-data" },
      };
    return http.post(`/importExcle`,params,config)
}

export function exportExcle(params){
    let config = {
        headers: { 'Content-Type': 'application/vnd.ms-excel;charset=utf-8' }, 
    };
    let response = {
        responseType: 'arraybuffer',
      };
    return http.post(`/exportExcel`,params,config,response)
}

// put 请求
export function getCode(params){
    return http.get(`/getCaptcha`,params)
}
// delete 请求
export function deleteListAPI(params){
    return http.delete(`${resquest}/deleteList.json`,params)
}
