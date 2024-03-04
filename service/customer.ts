import {api_endpoint} from "@/boot/axios";
import {Customer} from "@/interface/Interfaces";

const customer = {
    getCustomers() : Promise<Customer[]> {
        const url = 'customers'

        return api_endpoint.get(url)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async getCustomerWithId(id: number): Promise<Customer> {
        const url = `customers/${id}`
        console.log(url)
        try {
            const response = await api_endpoint.get(url);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default customer;