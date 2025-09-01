import apiClient from "../../api/apiClient"
 class OffersService {


    async getAllOffers():Promise<any[]>{
        try {
        const response=await apiClient.get('/offers/get-all-offers');
        return response.data;
        } catch (error) {
            console.log("Error fetching offers:",error)
            return [];
        }
    }
    async createOffer(offerData:any):Promise<any>{
        try {
        const response=await apiClient.post('/offers/create-offer',offerData);
        return response.data;
        } catch(error){
           console.log("Error creating offer:",error)
            return null;
        }
    }

    async updateOfferSection(offerSectionId:string,updatedData:any):Promise<any>{

        try {
        const response=await apiClient.put(`/offers/update-offer-section/${offerSectionId}`,updatedData);
        return response.data;
        } catch (error) {
            console.log("Error updating offer section:",error)
        }
    }

    async createOfferItem(offerSectionId:string,offerItem:any):Promise<any>{
        try {
        const response=await apiClient.post(`/offers/create-offer-item/${offerSectionId}`,offerItem);
        return response.data;
        } catch (error) {
           console.log("Error creating offer item:",error)
            return null;
        }
    }

    async updateOfferItem(offerSectionId:string,offerItemId:string,updatedData:any):Promise<any>{
        try {
        const response=await apiClient.put(`/offers/update-offer-item/${offerSectionId}/${offerItemId}`,updatedData);
        return response.data;
        } catch (error) {
            console.log("Error updating offer item:",error)
        }
    }
    async deleteOffer(offerSectionId:string,offerItemId:string):Promise<any>{
        try {
        const response=await apiClient.post(`/offers/delete-offer-item/${offerSectionId}/${offerItemId}`);
        return response.data;
        } catch (error) {
           
            console.log("Error deleting offer item:",error)
            return null;
        }
    }


}

export default new OffersService();