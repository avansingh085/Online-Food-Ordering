import React,{useState,useEffect,createContext} from 'react';

export const OffersContext = createContext<any>(null);
import apiClient from '../api/apiClient';

export const OffersProvider:React.FC<{children:React.ReactNode}> = ({children}) => {


    const [offers,setOffers] = useState<any[]>([]);
    const [loading,setLoading] = useState<boolean>(true);
    const [error,setError] = useState<string | null>(null);
    const [refetch,setReFetch]=useState<boolean>(false);
    const fetchOffers = async () => {

        try {

            setLoading(true);

            const response = await apiClient.get('/offers/get-all-offers');
            setOffers(response.data);
            setError(null);
        } catch (err:any) {
            setError(err.message || 'Failed to fetch offers');
            setOffers([]);
        } finally {
            setLoading(false);
        }
    };

    const Refresh=()=>{
        setReFetch(!refetch);
    }
    useEffect(() => {
        fetchOffers();
    }, [refetch]);

    return (

        <OffersContext.Provider value={{offers,loading,error,fetchOffers,Refresh}}>
            {children}
        </OffersContext.Provider>
    );





}




