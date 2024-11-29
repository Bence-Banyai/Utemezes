import http from "http";
import url from "url";
import { Taborok } from "./Solution";

export default function content(req: http.IncomingMessage, res: http.ServerResponse): void {
    if (req.url === "/favicon.ico") {
        res.writeHead(200, { "Content-Type": "image/x-icon" });
        return;
    }

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    res.write("<!DOCTYPE html>");
    res.write("<html lang='hu'>");
    res.write("<head>");
    res.write("<meta charset='utf-8'>");
    res.write("<style>input, pre {font-family:monospace; font-size:1em; font-weight:bold;}</style>");
    res.write("<meta name='viewport' content='width=device-width, initial-scale=1.0'>");
    res.write("<title>Táborok</title>");
    res.write("</head>");
    res.write("<body><pre>");

    const taborok = new Taborok();

    res.write("2. feladat\n");
    res.write(`Az adatsorok száma: ${taborok.getAdatsorokSzama()}\n`);
    res.write(`Az először rögzített tábor témája: ${taborok.getElsoTaborTemaja()}\n`);
    res.write(`Az utoljára rögzített tábor témája: ${taborok.getUtolsoTaborTemaja()}\n`);

    res.write("3. feladat\n");
    const zeneiTaborok = taborok.getZeneiTaborok();
    if (zeneiTaborok.length > 0) {
        zeneiTaborok.forEach(tabor => {
            res.write(`Zenei tábor kezdődik ${tabor.kezdoHo}. hó ${tabor.kezdoNap}. napján.\n`);
        });
    } else {
        res.write("Nem volt zenei tábor.\n");
    }

    res.write("4. feladat\n");
    res.write("Legnépszerűbbek:\n");
    const legnepszerubbTaborok = taborok.getLegnepszerubbTaborok();
    legnepszerubbTaborok.forEach(tabor => {
        res.write(`${tabor.kezdoHo} ${tabor.kezdoNap} ${tabor.tema}\n`);
    });

    res.write("6. feladat\n");
    const queryObject = url.parse(req.url || "", true).query;
    const hoInput = queryObject.ho as string;
    const napInput = queryObject.nap as string;

    if (hoInput && napInput) {
        const h = parseInt(hoInput, 10);
        const n = parseInt(napInput, 10);
        const db = taborok.getTartTaborokSzama(h, n);
        res.write(`Ekkor éppen ${db} tábor tart.\n`);
    } else {
        res.write("Adja meg a hónapot és a napot az URL-ben: Pl. /?ho=7&nap=15\n");
    }

    res.write("7. feladat\n");
    const tanuloInput = queryObject.tanulo as string;

    if (tanuloInput) {
        const tanuloTaborok = taborok.getTanuloTaborok(tanuloInput);
        if (tanuloTaborok.length > 0) {
            tanuloTaborok.sort((a, b) => {
                const aStart = taborok.sorszam(a.kezdoHo, a.kezdoNap);
                const bStart = taborok.sorszam(b.kezdoHo, b.kezdoNap);
                return aStart - bStart;
            });

            const canAttendAll = taborok.canAttendAllTaborok(tanuloTaborok);
            if (canAttendAll) {
                res.write("Mindegyik táborban részt vehet.\n");
            } else {
                res.write("Nem mehet el mindegyik táborba.\n");
            }
        } else {
            res.write("A megadott tanuló nem vesz részt egy táborban sem.\n");
        }
    } else {
        res.write("Adja meg egy tanuló betűjelét az URL-ben: Pl. /?tanulo=A\n");
    }
    
    res.write("</pre></body></html>");
    res.end();
}