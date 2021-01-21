import reducer from '../collapseSlice'
import { toggle } from '../collapseSlice'

describe('Collapse reducer', () => {
    it("toggles on collapse correctly", () => {
        const initialState = false
        const newState = reducer({value: initialState}, {type: toggle.type})
        expect(newState.value).toEqual(!initialState)
    })

    it("toggles off collapse correctly", () => {
        const initialState = true
        const newState = reducer({value: initialState}, {type: toggle.type})
        expect(newState.value).toEqual(!initialState)
    })
})