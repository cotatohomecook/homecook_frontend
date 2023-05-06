/*import axios from 'axios';

const BACKEND_URL = 'http://3.38.33.21:8080'

export async function fetchExpenses(){
    const response = await axios.get(BACKEND_URL + '/api/shops/rank?latitude=37.602643&longitude=126.924805');
    
    const expenses =  []; 
    for (const key in response.data){
        const expenseObj = {
            shopId: key,
            shopName: response.data[key].shopName,
            orderCount: response.data[key].orderCount, 
            ranking: response.data[key].ranking,     
        };
        expenses.push(expenseObj);
    }
return expenses; 
}
*/