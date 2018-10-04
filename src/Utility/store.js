import { observable, action } from "mobx";

class Store {

    @observable responseCreateProfile=[]
    @observable summary=""
    @observable experience=""
    @observable interstedIn=""
}

export default Store;