import React from 'react';
import { shallow } from 'enzyme';
import Sidebar from '.';
import { checkProps } from '../../utils';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const props = {
    ph: ['ph1', 'ph2']
};

const init = (props={}, ) => {
    const component = shallow(<Provider store={store}><Sidebar {...props} /></Provider>);
    return(component);
};

describe('Sidebar component', () => {

    let sb;

    beforeEach(() => {
        sb = init(props).childAt(0);
    });

    it('has the expected props', () => {
        const propsErr = checkProps(sb, props);
        expect(propsErr).toBeUndefined();
    });
})