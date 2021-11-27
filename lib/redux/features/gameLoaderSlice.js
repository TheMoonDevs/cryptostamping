import { createSlice } from "@reduxjs/toolkit";

export const gameLoaderSlice = createSlice({
  name: "gameLoader",
  initialState: {
    unityLoadingProgress: 0,
    isUnityLoaded: false,
    isPhotonConnected: "none",
    isGameVisible: false,
    gameId: null,
    versionNo: null,
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    increment: (state) => {
      state.unityLoadingProgress += 1;
    },
    decrement: (state) => {
      state.unityLoadingProgress -= 1;
    },
    setUnityLoadProgress: (state, action) => {
      state.unityLoadingProgress = action.payload;
    },
    setUnityLoaded: (state, action) => {
      state.isUnityLoaded = action.payload;
    },
    setPhotonConnection: (state, action) => {
      state.isPhotonConnected = action.payload;
    },
    setGameVisible: (state, action) => {
      state.isGameVisible = action.payload;
    },
    setGameId: (state, action) => {
      state.gameId = action.payload;
    },
    setVersionNo: (state, action) => {
      state.versionNo = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setUnityLoadProgress,
  setUnityLoaded,
  setPhotonConnection,
  setGameVisible,
  setGameId,
  setVersionNo,
} = gameLoaderSlice.actions;

export default gameLoaderSlice.reducer;
