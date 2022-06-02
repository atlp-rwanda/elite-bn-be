import { expect } from 'chai';

describe("Simple test",()=>{
    it('Should add two numbers', done => {
        const number = 2 + 5
        expect(number).to.equal(7);
        done();
    })
})
