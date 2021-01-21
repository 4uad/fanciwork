import { createSlice } from '@reduxjs/toolkit';

export const tagSlice = createSlice({
  name: 'tag',
  initialState: {
    tags: [],
    like: [],
    dislike: []
  },
  reducers: {
    addTags: (state, payload) => {
      state.tags = payload.payload
    },
    addLike: (state, payload) => {
      state.like.push(payload.payload)
    },
    addDislike: (state, payload) => {
      state.dislike.push(payload.payload)
    },
    removeLike: (state, payload) => {
      const idx = state.like.indexOf(payload.payload)
      state.like.splice(idx, 1)
    },
    removeDislike: (state, payload) => {
      const idx = state.dislike.indexOf(payload.payload)
      state.dislike.splice(idx, 1)
    },
    resetFilters: state => {
      state.like = []
      state.dislike = []
    }
  },
});

export const { addTags, addLike, addDislike, removeLike, removeDislike, resetFilters } = tagSlice.actions;

export const selectTags = state => state.tag.tags;
export const selectLikes = state => state.tag.like;
export const selectDislikes = state => state.tag.dislike;

export default tagSlice.reducer;
