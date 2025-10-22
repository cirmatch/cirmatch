import { createAsyncThunk } from "@reduxjs/toolkit";
import { client } from '@/config';
import imageCompression from "browser-image-compression";

// Common messages to avoid typos
const MSG_LOADING = "Loading...";
const MSG_SUCCESS = "Fetched Successfully";
const MSG_ERROR_DEFAULT = "Unknown error occurred";

export const getAllListing = createAsyncThunk(
  "product/getAllListing",
  async (_, thunkApi) => {
    try {
      const response = await client.get("/getAllListings");
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || MSG_ERROR_DEFAULT;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const productDetail = createAsyncThunk(
  "product/productDetail",
  async (productId, thunkApi) => {
    try {
      const response = await client.get(`/getAllListings/${productId}`);
      const relatedResponse = await client.get(`/getAllListings/search?q=${response.data.plastictype}`);

      return thunkApi.fulfillWithValue({
        product: response.data,
        relatedProducts: relatedResponse.data,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || MSG_ERROR_DEFAULT;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (query, thunkApi) => {
    try {
      const response = await client.get(`/getAllListings/search?q=${query}`);
      
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || MSG_ERROR_DEFAULT;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const category = createAsyncThunk(
  "product/category",
  async (_, thunkApi) => {
    try {
      // Fetch products from multiple categories in parallel
      const [pet, pp, ldpe, hdpe] = await Promise.all([
        client.get("/getAllListings/search?q=pet"),
        client.get("/getAllListings/search?q=pp"),
        client.get("/getAllListings/search?q=ldpe"),
        client.get("/getAllListings/search?q=hdpe"),
      ]);

      return thunkApi.fulfillWithValue({
        pet: pet.data,
        pp: pp.data,
        ldpe: ldpe.data,
        hdpe: hdpe.data,
      });
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || MSG_ERROR_DEFAULT;
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const addNewListing = createAsyncThunk(
  "product/addNewListing",
  async (formData, thunkApi) => {
    try {
      // Compress each image in formData
      const compressedFormData = new FormData();

      for (let [key, value] of formData.entries()) {
        if (value instanceof File && value.type.startsWith("image/")) {
          // Compress the image
          const compressedFile = await imageCompression(value, {
            maxSizeMB: 1, // maximum size in MB
            maxWidthOrHeight: 800, // max dimension
            useWebWorker: true,
          });
          compressedFormData.append(key, compressedFile, value.name);
        } else {
          // Append other fields as-is
          compressedFormData.append(key, value);
        }
      }

      const response = await client.post("/listings", compressedFormData);

      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Unknown error";
      console.log(message)
      console.log(error)
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkApi) => {
    try {
      const response = await client.delete(`/listing/delete/${id}`);
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Unknown error";
      return thunkApi.rejectWithValue(message);
    }
  }
)

export const editListing = createAsyncThunk(
  "product/editListing",
  async ({ id, data }, thunkApi) => {
    try {
  
      const response = await client.put(`/listing/edit/${id}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      const message = error?.response?.data?.message || error.message || "Unknown error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

export const updateListingStatus = createAsyncThunk(
  "product/updateListingStatus",
  async ({ id, status }, thunkApi) => {
    try {
      const response = await client.patch(`/update-status/${id}`, { status });
      return thunkApi.fulfillWithValue(response.data);
    } catch (error) {
      const message =
        error?.response?.data?.message || error.message || "Unknown error";
      return thunkApi.rejectWithValue(message);
    }
  }
);

