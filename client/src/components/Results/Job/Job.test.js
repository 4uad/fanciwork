import React from 'react';
import { shallow } from 'enzyme';
import Job from '.';
import { findByTestAttr, checkProps } from '../../../utils';

const init = (props={}, ) => {
    const component = shallow(<Job {...props} />);
    return(component);
};

const testTags = ['tag1', 'tag2', 'tag3'];

describe('Job component', () => {

    let job;

    it('has the expected prop-types', () => {
        const expectedProps = {
            title: 'title',
            url: 'url',
            tags: ['tag1', 'tag2'],
            logo: 'logourl',
            company: 'company'
        };

        const propsErr = checkProps(Job, expectedProps);
        expect(propsErr).toBeUndefined();
    });

    describe('With tags', () => {
        beforeEach(() => {
            job = init({tags: testTags});
        });

        it('renders without errors', () => {
            const wrapper = findByTestAttr(job, 'job');
    
            expect(wrapper.length).toBe(1);
        });
    
        it('renders a link button', () => {
            const link = findByTestAttr(job, 'job-link');
    
            expect(link.length).toBe(1);
        });
    });

    describe('Without tags', () => {
        beforeEach(() => {
            job = init({tags: []});
        });

        it('renders without errors', () => {
            const wrapper = findByTestAttr(job, 'job');
    
            expect(wrapper.length).toBe(1);
        });
    });
});