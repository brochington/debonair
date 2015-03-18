import { Styler } from "../src/main";


describe("Styler", () => {
    it("should exist", () => {
        expect(Styler).to.exist;
    });
    describe("Styler.create", () => {
        it("exists", () => {
            expect(Styler.create).to.exist;
        });
        it("creates styler with object as single argument", () => {
            let styler1 = Styler.create({
                height: 100,
                width: 200,
                backgroundColor: "violet"
            });

            let stylerVal1 = styler1();

            expect(styler1).to.exist;
            expect(styler1).to.be.a("function");

            expect(styler1()).to.exist;
            expect(styler1()).to.eql({
                height: 100,
                width: 200,
                backgroundColor: "violet"
            });
        });
        it("creates styler with function as single argument", () => {
            let styler1 = Styler.create(() => {
                return {
                    height: 100,
                    width: 200,
                    backgroundColor: "orange"
                };
            });

            let stylerVal1 = styler1();

            expect(styler1).to.exist;
            expect(styler1).to.be.a("function");

            expect(styler1()).to.exist;
            expect(styler1()).to.eql({
                height: 100,
                width: 200,
                backgroundColor: "orange"
            });
        });
        it("creates styler with styler as single argument", () => {
            let styler1 = Styler.create(() => {
                return {
                    height: 100,
                    width: 200,
                    backgroundColor: "orange"
                };
            });

            let styler2 = Styler.create(styler1);

            expect(styler2).to.exist;
            expect(styler2).to.be.a("function");

            expect(styler2()).to.exist;
            expect(styler2()).to.eql({
                height: 100,
                width: 200,
                backgroundColor: "orange"
            });
        });
        it("creates styler with multiple objects as arguments", () => {
            let styler1 = Styler.create({
                height: 100,
                width: 100
            }, {
                height: 200
            }, {
                backgroundColor: "orange"
            });

            let stylerVal1 = styler1();

            expect(styler1).to.exist;
            expect(styler1).to.be.a("function");

            expect(stylerVal1).to.exist;
            expect(stylerVal1).to.eql({
                height: 200,
                width: 100,
                backgroundColor: "orange"
            });
        });
        it("creates styler with multiple types as arguments", () => {
            let styler1 = Styler.create({
                width: 200
            });

            let styler2 = Styler.create({
                    height: 100,
                    width: 100
                },{
                    backgroundColor: "orange"
                }, 
                currentStyles => {return {border: "solid yellow 3px", height: 400};}, 
                styler1, 
                [{display: "block"}, {padding: 10}, {padding: 20}]
            );

            expect(styler2).to.exist;
            expect(styler2).to.be.a("function");

            expect(styler2()).to.exist;
            expect(styler2()).to.eql({
                height: 400, 
                width: 200, 
                backgroundColor: 'orange', 
                border: 'solid yellow 3px', 
                display: 'block', 
                padding: 20
            });
        });
    });
    describe("styler instance", () => {
        it("outputs correctly with one argument", () => {
            let styler1 = Styler.create({
                height: 100,
                width: 100
            });

            let styler2 = Styler.create({
                backgroundColor: "orange"
            });

            let stylerWithObject = styler1({backgroundColor: "blue"});

            expect(stylerWithObject).to.eql({
                height: 100,
                width: 100,
                backgroundColor: "blue"
            });

            let stylerWithFunction = styler1(() => {return {backgroundColor: "yellow"}});

            expect(stylerWithFunction).to.eql({
                height: 100,
                width: 100,
                backgroundColor: "yellow"
            });

            let stylerWithArray = styler1([{
                height: 200
            }, {
                width: 200
            }]);

            expect(stylerWithArray).to.eql({
                height: 200,
                width: 200
            });

            let stylerWithStyler = styler1(styler2);

            expect(stylerWithStyler).to.eql({
                height: 100,
                width: 100,
                backgroundColor: "orange"
            });
        });
        it("outputs correctly with multiple arguments", () => {
            let styler1 = Styler.create({
                width: 200
            });

            let stylerWithManyArgs = styler1({
                    height: 100,
                    width: 100
                },{
                    backgroundColor: "orange"
                }, 
                currentStyles => {return {border: "solid yellow 3px", height: 400};}, 
                styler1, 
                [{display: "block"}, {padding: 10}, {padding: 20}]
            );

            expect(stylerWithManyArgs).to.eql({
                width: 200, 
                height: 400, 
                backgroundColor: 'orange', 
                border: 'solid yellow 3px', 
                display: 'block', 
                padding: 20
            });
        });
    });
    describe("styler map", () => {
        it("should exist", () => {
            let styler1 = Styler.create({
                height: 100,
                width: 100,
                backgroundColor: "blue"
            });

            expect(styler1.map).to.exist;    
        });
        it("should map over style props", () => {
            let styler1 = Styler.create({
                height: 100,
                width: 100,
                backgroundColor: "blue"
            });

            let mappedVal = styler1.map((style, styleName, styles) => {
                return typeof style === 'number' ? style + 400 : style;
            });

            expect(mappedVal).to.eql({
                height: 500,
                width: 500,
                backgroundColor: "blue"
            });
        })
    });
    describe("styler reduce", () => {
        it("should reduce style props", () => {
            let styler1 = Styler.create({
                height: 100,
                width: 100,
                backgroundColor: "blue"
            });

            let reduction = styler1.reduce((accum, value, key,collection) => {
                if(typeof value === 'number') {
                    accum[key] = value + 123;
                }
                return accum;
            }, {});

            expect(reduction).to.eql({
                height: 223,
                width: 223
            });
        });
    });
    describe("styler merge", () => {
        it("should merge arguments correctly", () => {
            let styler1 = Styler.create({
                width: 200
            });

            let mergedStyles = styler1.merge({
                    height: 100,
                    width: 100
                },{
                    backgroundColor: "orange"
                }, 
                currentStyles => {return {border: "solid yellow 3px", height: 400};}, 
                styler1, 
                [{display: "block"}, {padding: 10}, {padding: 20}]
            );

            expect(mergedStyles).to.exist;
            expect(mergedStyles).to.eql({
                height: 400, 
                width: 200, 
                backgroundColor: 'orange', 
                border: 'solid yellow 3px', 
                display: 'block', 
                padding: 20
            });
        });
    });
    describe("styler filter", () => {
        it("should filter style object", () => {
            let styler1 = Styler.create({
                height: 100,
                weight: 100,
                backgroundColor: "orange"
            });

            let filteredStyles = styler1.filter()
        });
    })
});
