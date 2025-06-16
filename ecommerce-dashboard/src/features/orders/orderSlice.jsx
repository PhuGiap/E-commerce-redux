
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as orderService from '../../api/Services/orderService';

export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  const res = await orderService.fetchOrders();
  return res.data;
});

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (id) => {
  const res = await orderService.fetchOrderById(id);
  return res.data;
});

export const deleteOrder = createAsyncThunk('orders/delete', async (id) => {
  await orderService.deleteOrder(id);
  return id;
});

export const updateOrderStatus = createAsyncThunk(
  'orders/updateOrderStatus',
  async ({ id, data }) => {
    const response = await orderService.updateOrder(id, data);
    return response.data;
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    items: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selected = action.payload;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.items = state.items.filter(order => order.id !== action.payload);
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
      const updatedOrder = action.payload;
      const index = state.items.findIndex(order => order.id === updatedOrder.id);
      if (index !== -1) {
        state.items[index] = updatedOrder;
      }
      if (state.selected?.id === updatedOrder.id) {
        state.selected = updatedOrder;
      }
    });
  },
});

export default orderSlice.reducer;
