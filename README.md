# FinanApp

Webapp instalável (PWA) para controlar compras parceladas, cartões e a previsão do mês.
Site estático, sem build. Os dados ficam no aparelho (IndexedDB) e o app abre sem internet.

- Publicação: Render, site estático, branch `main`, publish directory `.`
- Instalar: Chrome > menu ⋮ > Instalar app (iPhone: Safari > Compartilhar > Adicionar à Tela de Início)
- Dados: Ajustes > Importar ou restaurar backup. Nunca versionar arquivos de backup (o `.gitignore` já bloqueia).
- Bloqueio: Ajustes > Bloqueio do app (PIN de 4 ou 6 dígitos, com digital ou rosto opcional). Exige HTTPS.
- Fatura: Ajustes > Importar fatura (.csv, colunas date, title e amount). Valores arredondados para a dezena; compras já lançadas não se repetem.
- Simular: aba Simular mostra sugestões de parcelas para adiantar e o efeito na fatura atual e nas próximas. Nada é gravado até adiantar de verdade.
