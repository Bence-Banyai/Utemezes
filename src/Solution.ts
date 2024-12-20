import fs from "fs";

interface Tabor {
    readonly kezdoHo: number;
    readonly kezdoNap: number;
    readonly vegHo: number;
    readonly vegNap: number;
    readonly tanulok: readonly string[];
    readonly tema: string;
}

export class Taborok {
    private readonly taborok: readonly Tabor[];

    constructor() {
        const data: string = fs.readFileSync("./src/taborok.txt", "utf8");
        const lines: readonly string[] = data.trim().split("\n");
        this.taborok = lines.map(line => {
            const parts = line.trim().split(/\s+/);
            return {
                kezdoHo: parseInt(parts[0], 10),
                kezdoNap: parseInt(parts[1], 10),
                vegHo: parseInt(parts[2], 10),
                vegNap: parseInt(parts[3], 10),
                tanulok: parts[4].split(""),
                tema: parts[5],
            };
        });
    }
    
    public getAdatsorokSzama(): number {
        return this.taborok.length;
    }

    public getElsoTaborTemaja(): string {
        return this.taborok[0].tema;
    }

    public getUtolsoTaborTemaja(): string {
        return this.taborok[this.taborok.length - 1].tema;
    }

    public getZeneiTaborok(): Tabor[] {
        return this.taborok.filter(tabor => tabor.tema === "zenei");
    }

    public getLegnepszerubbTaborok(): Tabor[] {
        const maxLetszam = Math.max(...this.taborok.map(tabor => tabor.tanulok.length));
        console.log(maxLetszam);
        return this.taborok.filter(tabor => tabor.tanulok.length === maxLetszam);
    }

    public sorszam(ho: number, nap: number): number {
        if (ho === 6) {
            return nap - 15;
        } else if (ho === 7) {
            return nap + 15;
        } else if (ho === 8) {
            return nap + 46;
        }
        return 0;
    }

    public getTartTaborokSzama(h: number, n: number): number {
        const napSorszam = this.sorszam(h, n);
        return this.taborok.filter(tabor => this.sorszam(tabor.kezdoHo, tabor.kezdoNap) <= napSorszam && napSorszam <= this.sorszam(tabor.vegHo, tabor.vegNap)).length;
    }

    public getTanuloTaborok(tanulo: string): Tabor[] {
        return this.taborok.filter(tabor => tabor.tanulok.includes(tanulo));
    }

    public canAttendAllTaborok(taborok: Tabor[]): boolean {
        for (let i = 0; i < taborok.length - 1; i++) {
            const currentEnd = this.sorszam(taborok[i].vegHo, taborok[i].vegNap);
            const nextStart = this.sorszam(taborok[i + 1].kezdoHo, taborok[i + 1].kezdoNap);
            if (currentEnd >= nextStart) {
                return false;
            }
        }
        return true;
    }
}