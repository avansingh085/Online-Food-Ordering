import { error } from "console";
import apiClient from "../../api/apiClient";


class HeroService {


    async getAllHeroSections() {
        try{
            const response = await apiClient.get('/section/heroSection');
            return response.data;
        }catch(err)
        {
            console.log("error in getAllHero Section",err);
            return [];
        }

    }

    async addHeroSection(data:any){
       try{
          return  await apiClient.post('/section/heroSection',data);
       }
       catch(err)
       {
        console.log("error during addHeroSection",err);
            return {};
       }
    }

    async deleteHeroSection(Id:string){
        try{
           return await apiClient.delete(`/section/heroSection/${Id}`);
        }
        catch(err){
           console.log("error during delete hero section",err);
           return {};
        }
    }

    async updateHeroSection(Id:string,data:any){
        try{
            return await apiClient.put(`/section/heroSection/${Id}`,data);
        }
        catch(err){
            console.log("error during updatehero section",err);
                 return {};
        }
    }



}

export default new HeroService();