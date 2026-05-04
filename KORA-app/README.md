# KORA — App Mobile (mockup)

App mobile da **KORA** — soluções com IA para inteligência financeira pessoal.
Conjunto de telas estáticas (HTML/CSS/JS) prontas para apresentação de portfólio.

## Como abrir

A maneira mais rápida: abra `index.html` no navegador. É a página showcase que
mostra todas as 11 telas em frames de iPhone, lado a lado.

```bash
# macOS
open app/index.html
```

Para uma experiência mais próxima de produção (carregando todas as fontes via HTTPS,
sem restrições de `file://`):

```bash
cd app
python3 -m http.server 8000
# abrir http://localhost:8000
```

## Mapa de telas

| # | Arquivo | Tela |
|---|---|---|
| 01 | `screens/splash.html` | Splash com a marca KORA |
| 02 | `screens/login.html` | Login + verificação MFA (TOTP) |
| 03 | `screens/inicio.html` | Início — saldo, score, KORA AI, mercado |
| 04 | `screens/ia.html` | **KORA AI** — chat assistente inteligente |
| 05 | `screens/mercado.html` | **Mercado em tempo real** — Ibov, ações, FIIs, cripto |
| 06 | `screens/score.html` | Score Comportamental + 4 pilares |
| 07 | `screens/extrato.html` | Extrato agrupado por data |
| 08 | `screens/transacao.html` | Detalhe de transação |
| 09 | `screens/cartao.html` | Cartão KORA Black |
| 10 | `screens/insights.html` | Insights — alertas, conquistas |
| 11 | `screens/previsao.html` | Previsão de saldo · 30 dias |
| 12 | `screens/investir.html` | Investir — recomendações |
| 13 | `screens/perfil.html` | Perfil + LGPD + segurança |

## Identidade visual

- **Fonte principal:** Aileron (CDN com fallback para Inter / system-ui).
- **Paleta:**
  - Preto Suave `#1C1C1C`
  - Off-White `#F5F3EF`
  - Vermelho Queimado (assinatura) `#A44A3F`
  - Cinza Claro `#D9D6D1`
  - Bege Quente `#CBB8A0`
  - Marrom Editorial `#6E5849`

Vermelho queimado reservado para assinatura/alerta. Browns/beige sustentam
estabilidade visual e tom premium. Score: faixas mapeadas só na paleta KORA.

## Estrutura

```
app/
├── index.html              Showcase com todas as telas
├── README.md
├── screens/
│   ├── splash.html
│   ├── login.html
│   ├── inicio.html
│   ├── ia.html               KORA AI · chat assistente
│   ├── mercado.html          Mercado financeiro em tempo real
│   ├── score.html
│   ├── extrato.html
│   ├── transacao.html
│   ├── cartao.html
│   ├── insights.html
│   ├── previsao.html
│   ├── investir.html
│   └── perfil.html
└── assets/
    ├── css/app.css         Design system mobile
    └── js/app.js           Mock data, charts SVG, interações
```

## Equipe

- Carolina Cordeiro Silva — RM 564234
- Gabriel Henrique Pioli — RM 567724
- João Victor Tozzatti Matiro — RM 567510
- Pedro Diagro Lopes — RM 568393

FIAP · 2026
