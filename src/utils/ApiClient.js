import config from '../../config';

export default class ApiClient {
    constructor(endpoint) {
        this.apiURL = config.apiURL;
        this.endpoint = endpoint;
    }

    request = (method, data, routes = '', url = this.endpoint) => {
        return new Promise((res, rej) => {
           const xhr = new XMLHttpRequest();
           xhr.open(method, this.apiURL + url + routes);
           xhr.setRequestHeader('content-type', 'application/json');
           xhr.onreadystatechange = e => {
               if (xhr.readyState === 4) {
                    if (xhr.status === 200) res(JSON.parse(xhr.response));
                    else rej(xhr.response);
               }
           };
           xhr.send(data ? JSON.stringify(data) : '');
        });
    }
}