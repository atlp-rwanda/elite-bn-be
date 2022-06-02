import { expect } from 'chai';

describe("Simple test",()=>{
    it('Should add two numbers', done => {
        const number = 1 + 4
        expect(number).to.equal(5);
        done();
    })
})