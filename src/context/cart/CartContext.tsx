import React, {createContext, useReducer, useState} from 'react';

import {apis} from '../../api/CartApi';
import {CartReducer, CartState} from './CartReducer';
import {
  AddProducRequest,
  AddProductInDelivery,
} from '../../model/request/AddProducRequest';
import {CartResponse} from '../../model/response/entity/CartResponse';
import {DeleteCartByUser} from '../../model/request/DeleteCartByUser';

type CartContextProps = {
  success: boolean;
  message: string;
  loading: boolean;
  loadingSave: boolean;
  collection: CartResponse[];

  findAll: (id: string) => void;
  addProductDelivery: (delivery: string, product: string, quantity: number) => void;
  addProduct: (board: string, product: string, quantity: number) => void;
  removeProduct: (idLineReservation: string, product: string) => void;
};

const initialState: CartState = {
  status: 'checking',
  success: true,
  message: '',
};

export const CartContext = createContext({} as CartContextProps);

export const CartProvider = ({children}: any) => {
  const {cart} = apis();
  const [loadingSave, setLoadingSave] = useState(false);
  const [loading, setLoading] = useState(false);
  const [collection, setCollection] = useState<CartResponse[]>([]);

  const [state, dispatch] = useReducer(CartReducer, initialState);

  const getURI = (id: string) => `/retrieveCartByReservation?reservation=${id}`;

  const findAll = async (id: string) => {
    setLoading(true);
    try {
      const response = await cart.get<CartResponse[]>(getURI(id));
      setCollection(response.data);
    } catch (error: any) {
    } finally {
      setLoading(false);
    }
  };

  const addProductDelivery = async (
    delivery: string,
    product: string,
    quantity: number,
  ) => {
    setLoadingSave(true);
    try {
      const request: AddProductInDelivery = {delivery, product, quantity};
      const response = await cart.post('/addProductToCartInDeliveryUnit', request);

      dispatch({type: 'messageResponse', payload: response.data.message});
    } catch (error: any) {
      dispatch({type: 'addError', payload: error.response.data.message});
    } finally {
      dispatch({type: 'removeError'});
      setLoadingSave(false);
    }
  };

  const addProduct = async (board: string, product: string, quantity: number) => {
    setLoadingSave(true);
    try {
      const request: AddProducRequest = {board, product, quantity};
      const response = await cart.post('/addProductToCartInBoard', request);
      dispatch({type: 'messageResponse', payload: response.data.message});
    } catch (error: any) {
      dispatch({type: 'addError', payload: error.response.data.message});
    } finally {
      dispatch({type: 'removeError'});
      setLoadingSave(false);
    }
  };

  const removeProduct = async (idLineReservation: string, product: string) => {
    setLoadingSave(true);
    try {
      const request: DeleteCartByUser = {idLineReservation, product};
      const response = await cart.post('/deleteCartByUser', request);

      dispatch({type: 'messageResponse', payload: response.data.message});
    } catch (error: any) {
      dispatch({type: 'addError', payload: error.response.data.message});
    } finally {
      dispatch({type: 'removeError'});
      setLoadingSave(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        loading,
        loadingSave,
        collection,
        findAll,

        addProduct,
        addProductDelivery,

        removeProduct,
      }}>
      {children}
    </CartContext.Provider>
  );
};
