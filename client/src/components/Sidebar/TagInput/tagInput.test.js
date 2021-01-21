import React from 'react';
import { shallow } from 'enzyme';
import TagInput from '.';
import { checkProps } from '../../../utils';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

const props = {
    type: 'favorite',
    placeholders: ['ph1', 'ph2', 'and another ph']
};

const init = (props={}, ) => {
    const component = shallow(<Provider store={store}><TagInput {...props} /></Provider>);
    return(component);
};

describe('TagInput component', () => {

    let ti;

    beforeEach(() => {
        ti = init(props).childAt(0);
    });

    it('has the expected props', () => {
        const propsErr = checkProps(ti, props);
        expect(propsErr).toBeUndefined();
    });
});