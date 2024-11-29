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

        const maxLetszam = 11;
        legnepszerubbTaborok.forEach(tabor => {
            expect(tabor.tanulok.length).toBe(maxLetszam);
        });

        const expectedTaborok = [
            { kezdoHo: 8, kezdoNap: 27, tema: "fotos" },
        ];

        expectedTaborok.forEach(expectedTabor => {
            const tabor = legnepszerubbTaborok.find(t => t.kezdoHo === expectedTabor.kezdoHo && t.kezdoNap === expectedTabor.kezdoNap && t.tema === expectedTabor.tema);
            expect(tabor).toBeDefined();
        });
    });

    test("5. feladat - Sorszám függvény", () => {
        expect(taborok.sorszam(6, 16)).toBe(1);
        expect(taborok.sorszam(7, 1)).toBe(16);
        expect(taborok.sorszam(8, 1)).toBe(47);
        expect(taborok.sorszam(8, 31)).toBe(77);
    });

    test("6. feladat - Táborok száma adott napon", () => {
        const db = taborok.getTartTaborokSzama(8, 1);
        expect(db).toBe(3);
    });

    test("7. feladat - Tanuló táborai és részvétel", () => {
        const tanulo = "L";
        const tanuloTaborok = taborok.getTanuloTaborok(tanulo);
        expect(tanuloTaborok.length).toBeGreaterThan(0);

        const canAttendAll = taborok.canAttendAllTaborok(tanuloTaborok);
        expect(canAttendAll).toBe(false);
    });
});