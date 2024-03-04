import { useState, useEffect } from 'react'
import {api_endpoint} from "@/boot/axios";

const useFetch = ( method : string, endpoint : string) => {

    const [data, setData] = useState<any>();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>()


    const options = {
        method: method,
        url: endpoint,
    };

    const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await api_endpoint.request(options);
            setData(response.data)
            setIsLoading(false)
        } catch (error) {
            setError(error)
            alert("There is an error")
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        console.log("fetcham")
        fetchData()
    }, [])

    const refetch = () => {
        setIsLoading(true)
        fetchData()
    }

    return { data, isLoading, error, refetch }
}

export default useFetch;