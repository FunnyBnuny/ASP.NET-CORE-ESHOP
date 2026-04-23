Tento soubor vysvětluje, jak Visual Studio vytvořilo projekt.

K vytvoření tohoto projektu byly použity následující nástroje:
- create-vite

Při vytváření tohoto projektu byly použity následující kroky:
- Vytvořte projekt React pomocí create-vite: `npm init --yes vite@latest eshop.client -- --template=react  --no-rolldown --no-immediate`.
- Pokud chcete nastavit proxy a certifikáty, aktualizujte `vite.config.js`.
- Pro načtení a zobrazení informací o počasí aktualizujte komponentu `App`.
- Vytvořte soubor projektu (`eshop.client.esproj`).
- Pokud chcete povolit ladění, vytvořte `launch.json`.
- Přidejte projekt do řešení.
- Aktualizujte koncový bod proxy serveru tak, aby byl koncovým bodem back-endového serveru.
- Přidejte projekt do seznamu projektů po spuštění.
- Zapište tento soubor.
