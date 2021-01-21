import React from 'react';
import { mount } from 'enzyme';
import Tag from '.';
import { findByTestAttr } from '../../../utils';
import { Provider } from 'react-redux';
import store from '../../../redux/store';

const tagContent = "mytag";

const init = (props={}) => {
    const component = mount(<Provider store={store}><Tag {...props} />{tagContent}</Provider>);
    return(component);
};

describe('Tag component', () => {

    let tag;

    beforeEach(() => {
        tag = init().childAt(0);
    });

    it('renders with no errors', () => {
        const wrapper = findByTestAttr(tag, 'tag');

        expect(wrapper.length).toBe(1);
    });
});