import reducer from '../tagSlice';
import { addTags, addLike, addDislike, removeLike, removeDislike, resetFilters } from '../tagSlice';

let initialState;

describe('Tags reducer', () => {

    it("updates tags", () => {
        initialState = {
            tags: ['t3'],
            like: [],
            dislike: []
        };
        const input = ['t1', 't2'];
        const newState = reducer(initialState, {type: addTags.type, payload: input});
        const expectedState = {
            tags: input,
            like: [],
            dislike: []
        };
        expect(newState).toEqual(expectedState);
    });

    it("resets all filters", () => {
        initialState = {
            tags: ['t1', 't2'],
            like: ['l1', 'l2'],
            dislike: ['d1', 'd2']
        };
        const newState = reducer(initialState, {type: resetFilters.type});
        const expectedState = {
            tags: initialState.tags,
            like: [],
            dislike: []
        };
        expect(newState).toEqual(expectedState);
    });

    describe('likes', () => {
        beforeEach(() => {
            initialState = {
                tags: [],
                like: ['like1', 'like2'],
                dislike: []
            };
        });

        it("adds likes", () => {
            const input = 'newlike';
            const newState = reducer(initialState, {type: addLike.type, payload: input});
            const expectedState = {
                tags: initialState.tags,
                like: ['like1', 'like2', 'newlike'],
                dislike: initialState.dislike
            };
            expect(newState).toEqual(expectedState);
        });

        it("removes likes", () => {
            const input = 'like1';
            const newState = reducer(initialState, {type: removeLike.type, payload: input});
            const expectedState = {
                tags: initialState.tags,
                like: ['like2'],
                dislike: initialState.dislike
            };
            expect(newState).toEqual(expectedState);
        });
    })

    describe('dislikes', () => {
        beforeEach(() => {
            initialState = {
                tags: [],
                like: [],
                dislike: ['dlike1', 'dlike2']
            };
        });

        it("adds dislikes", () => {
            const input = 'newdislike';
            const newState = reducer(initialState, {type: addDislike.type, payload: input});
            const expectedState = {
                tags: initialState.tags,
                like: initialState.like,
                dislike: ['dlike1', 'dlike2', 'newdislike']
            };
            expect(newState).toEqual(expectedState);
        });

        it("removes dislikes", () => {
            const input = 'dlike1';
            const newState = reducer(initialState, {type: removeDislike.type, payload: input});
            const expectedState = {
                tags: initialState.tags,
                like: initialState.like,
                dislike: ['dlike2']
            };
            expect(newState).toEqual(expectedState);
        });
    })
})