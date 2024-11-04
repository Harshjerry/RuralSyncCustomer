import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    bookings: [], // List of bookings
    quantity: 0, // Total quantity of items in the cart
    total: 0, // Total cost of bookings
  },
  reducers: {
    addBooking: (state, action) => {
      const existingBookingIndex = state.bookings.findIndex(booking => booking._id === action.payload._id);

      if (existingBookingIndex === -1) {
        // If booking doesn't exist, add it to the bookings array
        state.bookings.push({ ...action.payload, quantity: 1 }); // Add booking with a quantity of 1
        state.quantity += 1; // Update total quantity
        state.total += action.payload.price; // Update total cost
      }
      // If the booking already exists, do not modify state (or you can implement logic to alert the user)
    },

    removeBooking: (state, action) => {
      const existingBookingIndex = state.bookings.findIndex(booking => booking._id === action.payload._id);
      if (existingBookingIndex !== -1) {
        const existingBooking = state.bookings[existingBookingIndex];
        // If there is only one booking, remove it completely
        state.bookings.splice(existingBookingIndex, 1);
        state.quantity -= 1; // Decrease total quantity
        state.total -= existingBooking.price; // Decrease total cost
      }
    },

    clearCart: (state) => {
      // Reset the cart state
      state.bookings = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const { addBooking, removeBooking, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
