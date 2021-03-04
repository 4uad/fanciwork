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

    describe('With tags', () => {
        beforeEach(() => {
            job = init({tags: testTags});
        });

        describe('Prop-types', () => {
            it('nothing missing', () => {
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

            it('title missing', () => {
                const expectedProps = {
                    url: 'url',
                    tags: ['tag1', 'tag2'],
                    logo: 'logourl',
                    company: 'company'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });

            it('url missing', () => {
                const expectedProps = {
                    title: 'title',
                    tags: ['tag1', 'tag2'],
                    logo: 'logourl',
                    company: 'company'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });

            it('logo missing', () => {
                const expectedProps = {
                    title: 'title',
                    url: 'url',
                    tags: ['tag1', 'tag2'],
                    company: 'company'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });

            it('company missing', () => {
                const expectedProps = {
                    title: 'title',
                    url: 'url',
                    tags: ['tag1', 'tag2'],
                    logo: 'logourl'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });
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

        describe('Prop-types', () => {
            it('nothing missing', () => {
                const expectedProps = {
                    title: 'title',
                    url: 'url',
                    tags: [],
                    logo: 'logourl',
                    company: 'company'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });

            it('title missing', () => {
                const expectedProps = {
                    url: 'url',
                    tags: [],
                    logo: 'logourl',
                    company: 'company'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });

            it('url missing', () => {
                const expectedProps = {
                    title: 'title',
                    tags: [],
                    logo: 'logourl',
                    company: 'company'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });

            it('logo missing', () => {
                const expectedProps = {
                    title: 'title',
                    url: 'url',
                    tags: [],
                    company: 'company'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });

            it('company missing', () => {
                const expectedProps = {
                    title: 'title',
                    url: 'url',
                    tags: [],
                    logo: 'logourl'
                };
        
                const propsErr = checkProps(Job, expectedProps);
                expect(propsErr).toBeUndefined();
            });
        });

        it('renders without errors', () => {
            const wrapper = findByTestAttr(job, 'job');
    
            expect(wrapper.length).toBe(1);
        });
    });
});