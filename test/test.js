import { expect } from 'chai';

describe("Simple test",()=>{
    it('Should add two numbers', done => {
        const number = 1 + 5
        expect(number).to.equal(6);
        done();
    })
})
