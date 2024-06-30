import {api_endpoint} from "@/boot/axios";
import {UserDto} from "@/interface/Interfaces";
import tokenManager from "@/service/token";

const user = {
    async loginUser(username: string, password: string) : Promise<UserDto> {
        const url = "users/login"
        console.log(username, password)

        return api_endpoint.post(url, {
            username: username,
            password: password
        })
            .then((response) => {
                tokenManager.setToken(response.data.token)
                return response.data
            })
            .catch((error) => {
                console.log(error)
                throw error;
            })
    }
}

export default user;