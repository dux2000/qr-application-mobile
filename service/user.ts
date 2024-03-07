import {api_endpoint} from "@/boot/axios";
import {UserDto} from "@/interface/Interfaces";

const user = {
    async loginUser(username: string, password: string) : Promise<UserDto> {
        const url = "users/login"

        return api_endpoint.post(url, {
            username: username,
            password: password
        })
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default user;