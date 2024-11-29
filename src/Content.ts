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
    
    res.write("</pre></body></html>");
    res.end();
}