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
        const data: string = fs.readFileSync("./src/data/taborok.txt", "utf8");
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

}