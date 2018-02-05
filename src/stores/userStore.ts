import { observable, action } from 'mobx';
import { RootStore } from './index';

class UserStore {
    public rootStore: RootStore;

    @observable
    public users = {};

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @action setUsers = users => {
        this.users = users;
    }
}

export default UserStore;