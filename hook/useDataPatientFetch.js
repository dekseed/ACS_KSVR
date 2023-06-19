import { useEffect, useState } from "react"

import { BASE_URL } from '../config';
import axios from "axios";

const useDataPatientFetch = () => {
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': userToken
    }

    const options = {
        method : 'POST',
        url:`${BASE_URL}/user_update`,
        headers: headers,

        }
    
    const fetchData = async () => {
        setIsLoading(true);

        try{
            const response = await axios.request(options);

            setUserInfo(response.data);

            let userDetail = response.data;
            AsyncStorage.setItem('userDetail', JSON.stringify(userDetail));

            setIsLoading(false);
        } catch (error) {
            setError(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return { userInfo, isLoading, error, refetch };
}

export default useDataPatientFetch;