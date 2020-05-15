import React from 'react';
import ReactDOM from 'react-dom';
import Core from "../../Core";
import Map from "../../agent/Map";
import Synthse from "../../agent/Synthse";
import UpdateZone from "../../agent/UpdateZone";
import NewZone from "../../agent/NewZone";


describe('render_tests',()=>
{

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Core/>, div);
    });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Map/>, div);
    });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Synthse/>, div);
    });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<UpdateZone/>, div);
    });


    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NewZone/>, div);
    })


})