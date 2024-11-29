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

    test("3. feladat - Zenei táborok kezdete", () => {
        const zeneiTaborok = taborok.getZeneiTaborok();
        expect(zeneiTaborok.length).toBe(2);

        const expectedStarts = [
            { kezdoHo: 8, kezdoNap: 4 },
            { kezdoHo: 6, kezdoNap: 18 },
        ];

        zeneiTaborok.forEach((tabor, index) => {
            expect(tabor.kezdoHo).toBe(expectedStarts[index].kezdoHo);
            expect(tabor.kezdoNap).toBe(expectedStarts[index].kezdoNap);
        });
    });

    test("4. feladat - Legnépszerűbb táborok", () => {
        const legnepszerubbTaborok = taborok.getLegnepszerubbTaborok();

        const maxLetszam = 11; // Replace with actual maximum létszám
        legnepszerubbTaborok.forEach(tabor => {
            expect(tabor.tanulok.length).toBe(maxLetszam);
        });

        // Expected táborok details
        const expectedTaborok = [
            { kezdoHo: 8, kezdoNap: 27, tema: "fotos" }, // Replace with actual tábor data
        ];

        expectedTaborok.forEach(expectedTabor => {
            const tabor = legnepszerubbTaborok.find(t => t.kezdoHo === expectedTabor.kezdoHo && t.kezdoNap === expectedTabor.kezdoNap && t.tema === expectedTabor.tema);
            expect(tabor).toBeDefined();
        });
    });
});