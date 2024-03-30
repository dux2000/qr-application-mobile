import { ProductDto, SearchRequest, SearchResponse} from "@/interface/Interfaces";
import {api_endpoint} from "@/boot/axios";
import api from "@/service/api";

const products = {
    async getProducts(request: SearchRequest): Promise<SearchResponse<ProductDto>> {
        const url = 'products/filter'

        return api_endpoint.post(url, request)
            .then((response) => {
                return response.data
            })
            .catch((error) => {
                throw error;
            })
    },

    async updateProduct(productId: string, userId: number, status: string): Promise<ProductDto> {
        const url = `products/${productId}/${userId}`
        console.log(url)
        return api_endpoint.put(url, {status: status, currentUserId: userId})
            .then((response) => {
                return response.data;
            })
            .catch((error) => {
                throw error;
            })
    }
}

export default products;