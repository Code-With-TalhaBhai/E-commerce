import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {imageType} from '../Types/index';

export interface cartSlice {
  qty: number;
  order: orderedItems[];
  singleItemOrder: orderedItems;
  price: number;
  showCart: boolean;
};

export interface orderedItems {
  title: string,
  image: imageType,
  productId: string,
  ItemPrice: number,
  singleItemQty: number,
  itemTotal: number
}

const initialState: cartSlice = {
  qty:  0,
  order: [],
  singleItemOrder: {
   title: '',
    image: {
    _type: 'image',
    _key: ''
  },
    productId: '',
    singleItemQty: 1,
    ItemPrice: 1,
    itemTotal: 0
  },
  price: 0.00,
  showCart: false,
}


export const cartSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    incrementQty: (state) => {
      state.singleItemOrder.singleItemQty += 1
    },


    decrementQty: (state) => {
      if(state.singleItemOrder.singleItemQty<=1){
        state.singleItemOrder.singleItemQty=1
      }else{
        state.singleItemOrder.singleItemQty -= 1
      }
    },


    priceCalculator: (state) => {
      var processedTotal = 0;
      state.price = Number(subTotal()?.toFixed(2));
      function subTotal(){
      if(state?.order?.length>0){
      state.order.forEach(function(item:orderedItems){
          processedTotal +=  item.itemTotal;
      });
      return processedTotal;
    }
    else{
      return 0;
    }
  }
    },


    showCartBag: (state)=>{
      state.showCart = !state.showCart;
    },


    addToCart: (state,action:PayloadAction<orderedItems>)=>{
      state.order.push(action.payload);
    },


    totalQty: (state)=>{
      var start = 0;
      function subTotalQty(){
        state?.order?.forEach(function(singleQty){
        start += singleQty.singleItemQty
      })
      return start;
      }
      state.qty = subTotalQty();
    },


    sameProductIncrement : (state,action:PayloadAction<{singleItemQty:number,itemTotal:number,index:number}>)=>{
      state.order[action.payload.index].singleItemQty += action.payload.singleItemQty;
      state.order[action.payload.index].itemTotal += action.payload.itemTotal;
    },


    resetQty : (state)=>{
      state.singleItemOrder.singleItemQty = 1;
    },


    buyTimeInc: (state,action:PayloadAction<{index:number,price:number}>)=>{
      var checkInc = state.order[action.payload.index];
      checkInc.singleItemQty += 1; 
      // state.order[action.payload.index].singleItemQty += 1; 
      // state.order[action.payload.index].itemTotal = state.order[action.payload.index].singleItemQty * state.order[action.payload.index].ItemPrice;
      checkInc.itemTotal = checkInc.singleItemQty * action.payload.price;
    },


    buyTimeDec: (state,action:PayloadAction<{index:number,price:number}>)=>{
      var checkDec = state.order[action.payload.index];
      if(state.order[action.payload.index].singleItemQty<=1){
        state.order[action.payload.index].singleItemQty  = 1;
      }else{
      checkDec.singleItemQty -= 1; 
      // state.order[action.payload.index].singleItemQty -= 1; 
      // state.order[action.payload.index].itemTotal = state.order[action.payload.index].singleItemQty * state.order[action.payload.index].ItemPrice;
      checkDec.itemTotal = checkDec.singleItemQty * action.payload.price;
    }
  },
  
  removeItem: (state,action:PayloadAction<number>)=>{
    state.order.splice(action.payload,1)
  }

  },
})

// Action creators are generated for each case reducer function
export const { incrementQty, decrementQty,
   priceCalculator,showCartBag, removeItem,
    addToCart, totalQty, sameProductIncrement,
     resetQty, buyTimeInc, buyTimeDec} = cartSlice.actions

export default cartSlice.reducer;