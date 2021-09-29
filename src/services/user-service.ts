import axios, {AxiosResponse} from "axios"
import { User } from "../models/user/user";

export const userService = () => { 

    async function list() {
        return axios.get("http://localhost:8080/api/v1/user");
    }

    async function getById(id: number) {
        return axios.get("http://localhost:8080/api/v1/user/"+id);
    }

    async function save(user: User) {
        return axios.post("http://localhost:8080/api/v1/user", user);
    }

    async function sendFile(id:number, file:any) {
        var data = new FormData();
        data.append('image',
        {
           uri:file.assets[0].uri,
           name:'userProfile.jpg',
           type:'image/jpg'
        });
        return axios.post("http://localhost:8080/api/v1/user/"+id+"/file",data);
    }

    async function update(user: User) {
        return axios.put("http://localhost:8080/api/v1/user", user);
    }

    async function deleteUser(id: number) {
        return axios.delete("http://localhost:8080/api/v1/user/"+id);
    }

    return {
        list,
        save,
        update,
        deleteUser,
        getById,
        sendFile
    };
}