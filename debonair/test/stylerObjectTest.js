import { Styler, StylerObject } from "../src/main";

describe("StylerObject", () => {
    it("should exist", () => {
        expect(StylerObject).to.exist;
    });
    it("should create a new stylerObject when newed up", () => {
        let stylerObject = new StylerObject({height: 200, width: 300});

        expect(stylerObject).to.exist;
        expect(stylerObject).to.be.instanceOf(StylerObject);
        expect(stylerObject).to.eql({height: 200, width: 300});
    });
});