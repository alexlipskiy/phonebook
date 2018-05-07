import { observable } from 'mobx';
import ApiClient from '../utils/ApiClient';

export default class PhoneStore extends ApiClient {
    @observable phones = [];

    constructor() {
        super('/phonebook');
    }

    getPhone = () => {
        this.phones.slice(0, 0);
        this.request('GET').then(res => this.phones.push(...res.map(i => this.convertData(i))));
    };

    convertData = data => { return { id: data.id, ...data }; };

    addPhone = values => this.request('POST', values).then(res => this.phones.push(this.convertData(res)));

    editPhone = values => {
        this.phones[this.phones.findIndex(i => i.id === values.id)] = values;
        this.request('PUT', values, `/${values.id}`);
    };

    removePhone = value => {
        this.phones.remove(value);
        this.request('DELETE', null, `/${value.id}`);
    };
}