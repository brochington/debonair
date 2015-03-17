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
        })
    });
});





