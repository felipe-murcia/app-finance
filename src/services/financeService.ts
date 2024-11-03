import { api } from "../configs/api";
import { IFinance } from '../interface/IFinance';


export class FinanceService {

    private apiURL = "";
 
    public async post(data:IFinance) {
        try {
            const response = await api.post<IFinance>(`${this.apiURL}`, data)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async get( serviceUrl:string) {
        try {
            const response = await api.get<IFinance[]>(`${serviceUrl}`)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async delete( id:string) {
        try {
            console.log(id)
            const response = await api.delete(`/${id}`)
            return await response.data            
        } catch (error) {
            throw error;
        }
    }
/*
    public async getById(id:number){
        try {
            const response = await api.get<IPerson>(`${this.apiURL}/${id}`, headerAPI)
            const data: IPerson = response.data 
            return data          
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async put(data:IPerson) {
        try {
            const response = await api.put<IPerson>(`${this.apiURL}/${data.id}`, data, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }

    public async delete(data:IPerson) {
        try {
            const response = await api.delete(`${this.apiURL}/${data.id}`, headerAPI)
            return await response.data            
        } catch (error) {
            console.log(error)
            throw error;
        }
    }
*/
}