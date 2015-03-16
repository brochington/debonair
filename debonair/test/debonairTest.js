import { Debonair } from "../src/main";

describe("Debonair Class", () => {
    let debonair = new Debonair();

    it("instance is created", () => {
        expect(debonair).to.be.exist;
    });
});