import { Taborok } from "../Solution";

describe("Taborok tests", () => {
    let taborok: Taborok;

    beforeAll(() => {
        taborok = new Taborok();
    });

    test("2. feladat - Adatsorok száma", () => {
        expect(taborok.getAdatsorokSzama()).toBe(28);
    });

    test("2. feladat - Első tábor témája", () => {
        expect(taborok.getElsoTaborTemaja()).toBe("foci");
    });

    test("2. feladat - Utolsó tábor témája", () => {
        expect(taborok.getUtolsoTaborTemaja()).toBe("filmes");
    });
});