import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "./UserService";
import { toast } from "react-toastify";

const initialState = {
    user : '',
    isError : false,
    isSuccess : false,
    isLoading : false,
    productWishlist: [],
    message : '',
    cart:{}
}

export const getUserfromLocalStorage = localStorage.getItem('User')?JSON.parse(localStorage.getItem('User')):null;

export const registerUser = createAsyncThunk('register',async(userdata,thunkAPI)=>{
    try {
        return authService.registerUser(userdata)
    } catch (error) {
        // console.log('here')
        return thunkAPI.rejectWithValue(error);
    }
})

export const loginUser = createAsyncThunk('login',async(userdata,thunkAPI)=>{
    try {
        return authService.loginUser(userdata)
    } catch (error) {
        // console.log('here')
        return thunkAPI.rejectWithValue(error);
    }
})

export const getUserProductWishlist = createAsyncThunk(':id/Wishlist',async(id,thunkAPI)=>{
    try {
        return authService.getUserProdWishlist(id);
    } catch (error) {
        // console.log('here')
        return thunkAPI.rejectWithValue(error);
    }
})

export const addProductToCart = createAsyncThunk('/cart',async(cartData,thunkAPI)=>{
    // console.log(cartData);
    try {
        return authService.addToCart(cartData);
    } catch (error) {
        // console.log('here')
        return thunkAPI.rejectWithValue(error);
    }
})

export const newOrder = createAsyncThunk('/new-order',async(cartData,thunk)=>{
    try {
        return authService.newCart(cartData);
    } catch (error) {
        // console.log('here')
        return thunk.rejectWithValue(error);
    }
})


export const authSlice = createSlice({
    name : 'auth',
    initialState : initialState,
    reducers : {},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            console.log(action.payload)
            state.user = action.payload
            toast.info('User Registered Successfully !!')
            
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            // console.log(action)
            toast.error('User already exists')
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.user = action.payload
            localStorage.setItem('token',action.payload.token)
            console.log(action.payload)

            toast.info('User logged in Successfully !!')
            
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
            // console.log(action)
            toast.error('Credentials are invalid')
        })
        .addCase(getUserProductWishlist.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(getUserProductWishlist.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.productWishlist = action.payload
            
        }).addCase(getUserProductWishlist.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
        .addCase(addProductToCart.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addProductToCart.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.addedCartProduct = action.payload
            
        }).addCase(addProductToCart.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.msg
        })
        .addCase(newOrder.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(newOrder.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = true
            state.cart = action.payload
            
        }).addCase(newOrder.rejected,(state,action)=>{
            state.isLoading = false
            state.isError = true
            state.isSuccess = false
            state.message = action.error
        })
    }
})

export default authSlice.reducer;