const StorageSetTotal = (cartTotal) => {
    sessionStorage.setItem('total', JSON.stringify(cartTotal > 0 ? cartTotal : 0));
}

export const CartReducer = (state, action) =>{

    //debugger;
    let index = -1;

    if(action.payload){
        index = state.cartItems.findIndex(x => x.id === action.payload.id);
    } 
    let newItems = [...state.cartItems];
    let count = state.cartCount;
    let total = state.cartTotal;

    switch(action.type) {
        case "ADD":
        case "INCREASEQTY":
            if (index === -1) {
                newItems.push({ ...action.payload, quantity: 1 });
                const newItemIndex = newItems.findIndex(x => x.id === action.payload.id);
                if (newItems[newItemIndex].stock > 0) {
                    newItems[newItemIndex].stock--; 
                    count = count + 1;
                    total = total + action.payload.price;
                }
            } else {                
                if (newItems[index].stock > 0){
                    newItems[index].stock--;
                    newItems[index].quantity++;
                    count = count + 1;
                    total = total + (newItems[index].price);
                }
            }
            break;

        case "REMOVE":
            if (index > -1) {
                count = count-(newItems[index].quantity);
                total = total - ((newItems[index].price) * (newItems[index].quantity));  
                newItems = state.cartItems.filter((item) => item.id !== action.payload.id);        
            }       
            break;
        
        case "DECREASEQTY":
            if(index > -1){
                if (newItems[index].quantity > 1) {
                    newItems[index].quantity--;
                    count = count - 1; 
                    total = total - newItems[index].price;
                    newItems[index].stock++;
                }
            }      
            break;
        
        case "CLEAR":
            newItems = []; 
            count = 0;    
            total = 0;     
            break;
        
        default:
    }
    state.cartItems = newItems;
    state.cartCount = count;
    state.cartTotal = total;
    StorageSetCart(newItems);
    StorageSetCount(count);
    StorageSetTotal(total);
    
    return state;
}