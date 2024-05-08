import { useQuery } from "react-query"
import MovieService from "../apis/MovieService"

const useGenres=():{
    isLoading:boolean,
    error:any,
    isSuccess:boolean,
    data:any
}=>{
    const {isLoading,error,isSuccess,data} = useQuery('genres', MovieService.getGenres,{
        retry:3,
    })
    
    return {
        isLoading,
        error,
        isSuccess,
        data,
    }

}
export default useGenres;