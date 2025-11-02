import { createSlice } from "@reduxjs/toolkit";
import {
  getAllListing,
  productDetail,
  searchProduct,
  category,
  addNewListing,
  deleteProduct,
  editListing,
  updateListingStatus,
} from "../../action/productAction";

const MSG_LOADING = "Loading...";
const MSG_SUCCESS = "Fetched Successfully";

const initialState = {
  listing: null,
  listings: [],
  relatedProduct: [],
  isError: false,
  isLoading: false,
  message: "",
  notFound: false,
  searchListings: [],
  categories: {},

  pagination: {
    total: 0,
    page: 1,
    totalPages: 1,
  },

  addListingLoading: false,
  addListingError: null,
  addListingSuccess: false,

  editListingLoading: false,
  editListingError: null,
  editListingSuccess: false,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: () => initialState,
    clearMessage: (state) => {
      state.message = "";
    },
    resetAddListingStatus: (state) => {
      state.addListingLoading = false;
      state.addListingError = null;
      state.addListingSuccess = false;
    },
    resetEditListingStatus: (state) => {
      state.editListingLoading = false;
      state.editListingError = null;
      state.editListingSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Listings (Paginated)
      .addCase(getAllListing.pending, (state) => {
        state.isLoading = true;
        state.message = MSG_LOADING;
      })
      .addCase(getAllListing.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listings = action.payload.data;
        state.pagination = {
          total: action.payload.total,
          page: action.payload.page,
          totalPages: action.payload.totalPages,
        };
        state.message = MSG_SUCCESS;
      })
      .addCase(getAllListing.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Failed to fetch listings";
      })

      // Product Detail
      .addCase(productDetail.pending, (state) => {
        state.isLoading = true;
        state.message = MSG_LOADING;
      })
      .addCase(productDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.listing = action.payload.product;
        state.relatedProduct = action.payload.relatedProducts;
        state.notFound = false;
        state.message = MSG_SUCCESS;
      })
      .addCase(productDetail.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.notFound = true;
        state.message = action.payload || "Product not found";
      })

      // Search Products
      .addCase(searchProduct.pending, (state) => {
        state.isLoading = true;
        state.message = MSG_LOADING;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.searchListings = action.payload;
        state.notFound = action.payload.length === 0;
        state.message = MSG_SUCCESS;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.notFound = true;
        state.message = action.payload || "Search failed";
      })

      // Category Products
      .addCase(category.pending, (state) => {
        state.isLoading = true;
        state.message = MSG_LOADING;
      })
      .addCase(category.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.categories = action.payload;
        state.message = MSG_SUCCESS;
      })
      .addCase(category.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.notFound = true;
        state.message = action.payload || "Failed to fetch categories";
      })

      // Add New Listing
      .addCase(addNewListing.pending, (state) => {
        state.addListingLoading = true;
        state.addListingError = null;
        state.addListingSuccess = false;
      })
      .addCase(addNewListing.fulfilled, (state, action) => {
        state.addListingLoading = false;
        state.addListingSuccess = true;
        state.listings.push(action.payload);
      })
      .addCase(addNewListing.rejected, (state, action) => {
        state.addListingLoading = false;
        state.addListingError = action.payload || "Failed to add listing";
        state.addListingSuccess = false;
      })

      // Delete Products
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
        state.message = MSG_LOADING;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "Product deleted";

        state.listings = state.listings.filter(listing => listing._id !== action.meta.arg);
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.notFound = true;
        state.message = action.payload || "Failed Deleting";
      })

      // Edit Listing
      .addCase(editListing.pending, (state) => {
        state.editListingLoading = true;
        state.editListingError = null;
        state.editListingSuccess = false;
        state.message = MSG_LOADING;
      })
      .addCase(editListing.fulfilled, (state, action) => {
        state.editListingLoading = false;
        state.editListingSuccess = true;
        state.isError = false;
        state.message = MSG_SUCCESS;
        state.listing = action.payload;

        // Update the edited listing in the listings array
        const idx = state.listings.findIndex((l) => l._id === action.payload._id);
        if (idx !== -1) {
          state.listings[idx] = action.payload;
        }
      })
      .addCase(editListing.rejected, (state, action) => {
        state.editListingLoading = false;
        state.editListingError = action.payload || "Failed to update listing";
        state.editListingSuccess = false;
        state.isError = true;
        state.message = action.payload || "Failed to update listing";
      })
      // Update Listing Status
.addCase(updateListingStatus.pending, (state, action) => {
  state.isLoading = true;
  state.message = "Updating status...";
})
.addCase(updateListingStatus.fulfilled, (state, action) => {
  state.isLoading = false;
  state.isError = false;
  state.message = "Status updated successfully";

  // Update the listing in the listings array
  const updatedListing = action.payload.listing;
  const idx = state.listings.findIndex((l) => l._id === updatedListing._id);
  if (idx !== -1) {
    state.listings[idx] = updatedListing;
  }

  // If currently viewing single listing, update it as well
  if (state.listing && state.listing._id === updatedListing._id) {
    state.listing = updatedListing;
  }
})
.addCase(updateListingStatus.rejected, (state, action) => {
  state.isLoading = false;
  state.isError = true;
  state.message = action.payload || "Failed to update status";
});
  },
});

export const {
  reset,
  clearMessage,
  resetAddListingStatus,
  resetEditListingStatus,
} = productSlice.actions;

export default productSlice.reducer;