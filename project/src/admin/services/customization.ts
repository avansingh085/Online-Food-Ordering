import apiClient from "../../api/apiClient";
class CustomizationService{

    async getDefaultCustomization(){
         try{
           const res= await apiClient.get('/user/cart-customization/default');
           console.log(res,">>>>>>>>>>>>>>>>>")
           return res.data;
         }
         catch(err){
             console.log("failed to fetch default Customization:",err);
            return null;
         }
    }
     
    async updateDefaultCustomization(data:any){
         try{
           const res= await apiClient.patch('/user/cart-customization/default',data);
           return res.data;
         }
         catch(err){
             console.log("failed to update default Customization:",err);
            return null;
         }
    }
}

export default new CustomizationService();