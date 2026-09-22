---
title: Aprenda desenvolvimento full-stack criando eventos universitários
contentType: Tutorial
audience: Iniciante em programação web
duration: 20 dias, 2 a 3 horas por dia
---

# Aprenda desenvolvimento full-stack criando eventos universitários

> Um primeiro projeto full-stack guiado para aprender React, TypeScript, Node.js, Express, Prisma e SQLite construindo uma plataforma local de eventos universitários.

## Objetivo

Ao fim de 20 dias, a estudante terá construído uma aplicação local em que uma pessoa cria conta, faz login, cria eventos, encontra eventos e se inscreve neles. Mais importante: ela deverá entender o caminho percorrido por um dado entre interface, API e banco de dados.

```text
Pessoa clica em “Inscrever-se”
             │
             ▼
React envia uma requisição HTTP
             │
             ▼
Express valida dados e regras
             │
             ▼
Prisma consulta ou altera SQLite
             │
             ▼
API responde JSON
             │
             ▼
React atualiza a tela
```

O curso pressupõe cerca de 2 a 3 horas por dia, cinco dias por semana. Se uma atividade demorar mais, ela continua no dia seguinte: não vale avançar sem entender apenas para cumprir calendário.

## Produto final do curso

```text
Visitante
 ├─ vê eventos e seus detalhes
 └─ cria conta ou faz login

Usuário autenticado
 ├─ cria, edita e cancela os próprios eventos
 ├─ vê os eventos que criou
 ├─ inscreve-se em eventos
 └─ vê e cancela suas inscrições

Organizador de um evento
 └─ vê seus participantes
```

Ficam fora deste curso: múltiplas universidades, imagem do evento, e-mails, pagamento, certificado, lista de espera, login social, refresh token e publicação. Eles viram uma segunda fase.

## Como cada aula funciona

Todo dia tem seis partes:

1. **Entender:** conceito simples, antes do código.
2. **Fazer junto:** arquivos, comandos e exemplo pequeno.
3. **Pare e teste:** resultado verificável.
4. **Mude algo:** alteração curta feita pela estudante.
5. **Desafio:** tarefa parecida, mas sem solução pronta.
6. **Registro:** anotar o que entendeu, errou e quer revisar.

O nível de orientação diminui ao longo do curso:

```text
Dias 1–7   exemplos completos, explicados linha a linha
Dias 8–14  exemplos parciais e lacunas para completar
Dias 15–20 requisitos, documentação e revisão
```

## Ferramentas

```text
Frontend: React + TypeScript + Vite + React Router
Estilo: Tailwind CSS + shadcn/ui
Backend: Node.js + Express + TypeScript
Banco: SQLite + Prisma ORM
Validação: Zod
Segurança: argon2 + jose + cookie HttpOnly
Testes: Vitest + Supertest
Versionamento: Git + GitHub
```

Não usar Axios, Redux, Zustand, TanStack Query, NestJS ou React Hook Form neste primeiro curso. Elas podem ser úteis depois, mas escondem fundamentos que precisam aparecer agora.

## Estrutura que será criada aos poucos

No início:

```text
eventos-universitarios/
├── web/
├── api/
├── docs/
├── README.md
└── .gitignore
```

No final:

```text
api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── app.ts
│   ├── server.ts
│   ├── lib/prisma.ts
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── middlewares/
│   └── schemas/
└── .env

web/src/
├── components/
├── pages/
├── services/
├── types/
├── App.tsx
└── main.tsx
```

Não criar todas essas pastas no primeiro dia. A estudante verá primeiro uma solução simples e só separará arquivos quando o problema de organização aparecer.

## Endpoint e MVC, antes de começar

### Endpoint

Um endpoint é um endereço da API associado a uma ação:

```text
GET  /events       listar eventos
GET  /events/12    consultar o evento 12
POST /events       criar evento
POST /auth/login   fazer login
```

Ele sempre combina método HTTP e caminho.

### MVC e a organização real da API

MVC clássico:

```text
Model      dados
View       interface
Controller coordena uma ação
```

Nesta API Express, usaremos uma variação mais prática:

```text
Route → Controller → Service → Prisma → SQLite
```

- **Route:** identifica a URL chamada.
- **Controller:** recebe `request` e produz `response` HTTP.
- **Service:** aplica regras como “evento lotado não recebe inscrição”.
- **Prisma:** lê e salva dados.
- **SQLite:** mantém os dados no disco.

# Semana 1 — React e a interface

**Meta:** criar uma interface navegável com eventos falsos e formulário local. Não existe API nem banco ainda.

## Dia 1 — Máquina, terminal, Git e primeiro React

### Resultado esperado

Uma página React abre no navegador e o projeto possui o primeiro commit.

### Conceitos

- **terminal:** maneira de enviar comandos ao computador;
- **diretório:** pasta;
- **package.json:** arquivo que descreve dependências e comandos do projeto;
- **servidor de desenvolvimento:** programa que mostra a aplicação enquanto ela é construída;
- **Git:** histórico de mudanças;
- **commit:** fotografia nomeada de uma mudança coerente.

### Passo a passo

1. Criar uma pasta `eventos-universitarios`.
2. Abrir essa pasta no terminal.
3. Executar `git init`.
4. Criar a aplicação React com TypeScript:

   ```bash
   npm create vite@latest web -- --template react-ts
   ```

5. Entrar em `web` e executar:

   ```bash
   npm install
   npm run dev
   ```

6. Abrir a URL indicada, normalmente `http://localhost:5173`.
7. Em `web/src/App.tsx`, trocar o conteúdo inicial pelo nome do projeto.
8. Criar `README.md` na raiz com duas frases sobre o objetivo.
9. Criar `.gitignore` na raiz, ignorando `node_modules`, `.env` e futuros arquivos de banco local.
10. Fazer o primeiro commit.

### Pare e teste

- A página abre?
- Alterar um texto e salvar atualiza a página?
- `git status` mostra mudanças?
- `git log --oneline` mostra o commit?

### Mude algo

Adicionar a frase: “Encontre e organize eventos da universidade.”

### Registro

Escrever: “Qual a diferença entre a pasta `web` e a raiz do repositório?”

### Comandos de Git deste dia

Execute cada comando separadamente e leia a saída:

```bash
git status
git add .
git status
git commit -m "chore: iniciar projeto React"
git log --oneline
```

- `git status` mostra arquivos alterados e preparados
- `git add .` prepara as mudanças para o próximo commit
- `git commit` registra a mudança preparada
- `git log` mostra o histórico

### Erros comuns e como investigar

- **`npm: command not found`**: Node.js ou npm não está instalado, ou o terminal precisa ser reaberto
- **A porta já está em uso**: encerre o processo anterior ou aceite outra porta indicada pelo Vite
- **A página não atualiza**: salve o arquivo e confira se o terminal do Vite continua executando
- **Git recusa o commit**: configure nome e e-mail conforme a mensagem exibida
- **Comando executado na pasta errada**: use `pwd` e `ls` para confirmar sua localização

### Critérios de conclusão

- [ ] `npm run dev` abre a aplicação
- [ ] o texto de `App.tsx` foi alterado
- [ ] `README.md` existe na raiz
- [ ] `node_modules` não aparece no commit
- [ ] o histórico mostra o primeiro commit

### Entrega do dia

Commit sugerido: `chore: iniciar projeto React`.

## Dia 2 — Componentes e props

### Resultado esperado

Um componente reutilizável chamado `EventCard` exibe informações de um evento.

### Conceitos

Um componente é uma função que retorna parte da interface. Props são dados recebidos pelo componente.

```text
Dados do evento
      ↓
EventCard
      ↓
Cartão visível
```

### Arquivos

```text
web/src/
├── App.tsx
└── components/
    └── EventCard.tsx
```

### Exemplo: `web/src/components/EventCard.tsx`

```tsx
type EventCardProps = {
  title: string;
  location: string;
  date: string;
};

export function EventCard({ title, location, date }: EventCardProps) {
  return (
    <article>
      <h2>{title}</h2>
      <p>{location}</p>
      <p>{date}</p>
    </article>
  );
}
```

### Como ler o exemplo

```tsx
type EventCardProps = { /* propriedades */ }
```

Define as informações obrigatórias do cartão.

```tsx
export function EventCard(/* props */)
```

Cria e permite importar o componente em outro arquivo.

```tsx
{title}
```

Mostra o valor recebido na interface.

### Passo a passo

1. Criar a pasta `components` e o arquivo acima.
2. Importar `EventCard` em `App.tsx`.
3. Renderizar um cartão com título, local e data.
4. Renderizar outro cartão com informações diferentes.
5. Alterar o título de apenas um deles.

### Pare e teste

- Os dois cartões aparecem?
- O que o TypeScript informa se uma prop obrigatória for removida?
- Há erro no console do navegador?

### Desafio

Adicionar uma prop `capacity` e mostrar “40 vagas”.

### Exemplo de uso em `App.tsx`

```tsx
import { EventCard } from "./components/EventCard";

export default function App() {
  return (
    <main>
      <h1>Eventos universitários</h1>
      <EventCard
        title="Semana de Engenharia"
        location="Auditório A"
        date="15 de outubro, 19h"
      />
    </main>
  );
}
```

O `import` localiza o componente. As três props entre aspas alimentam os três parâmetros desestruturados em `EventCard`.

### Experimentos obrigatórios

1. Troque `location` por um número e leia o erro do TypeScript
2. Remova `date` e observe qual propriedade o erro menciona
3. Corrija os erros sem apagar o tipo `EventCardProps`
4. Adicione o segundo cartão sem copiar o arquivo do componente

### Erros comuns

- **`EventCard is not defined`**: o import está ausente ou usa nome diferente
- **Caminho de import incorreto**: confira a posição de `App.tsx` e da pasta `components`
- **Nada aparece**: confirme que o componente possui `return`
- **Erro de JSX**: confira fechamento de tags e parênteses

### Critérios de conclusão

- [ ] dois cartões usam o mesmo componente
- [ ] cada cartão mostra valores diferentes
- [ ] remover uma prop causa erro de tipo compreensível
- [ ] a estudante explica props sem ler o código

### Entrega do dia

Commit sugerido: `feat: criar cartão reutilizável de evento`.

## Dia 3 — Tipos, arrays e listas

### Resultado esperado

Uma lista de eventos falsos é renderizada com `map`.

### Conceitos

- **array:** lista de valores;
- **objeto:** conjunto de propriedades;
- **type:** formato esperado de um dado;
- **map:** transforma cada item de uma lista;
- **key:** identificador usado pelo React ao atualizar listas.

### Arquivos

```text
web/src/
├── components/EventCard.tsx
├── data/events.ts
├── types/event.ts
└── App.tsx
```

### Exemplo: `web/src/types/event.ts`

```ts
export type Event = {
  id: number;
  title: string;
  location: string;
  date: string;
  capacity: number;
};
```

### Exemplo: `web/src/data/events.ts`

```ts
import type { Event } from "../types/event";

export const events: Event[] = [
  {
    id: 1,
    title: "Semana de Engenharia de Software",
    location: "Auditório A",
    date: "15 de outubro, 19h",
    capacity: 80,
  },
];
```

### Exemplo: uso de `map` em uma página

```tsx
{events.map((event) => (
  <EventCard
    key={event.id}
    title={event.title}
    location={event.location}
    date={event.date}
    capacity={event.capacity}
  />
))}
```

### Passo a passo

1. Criar o tipo `Event`.
2. Criar pelo menos quatro eventos falsos.
3. Usar `map` para gerar um cartão por evento.
4. Remover a `key` temporariamente e observar o aviso do React.
5. Restaurar a `key` e explicar por que ela existe.

### Desafio

Criar um evento com zero vagas. Como a interface deveria apresentá-lo?

### O que acontece durante o `map`

Para cada item do array, React executa a função e cria um `EventCard`:

```text
events[0] → EventCard do evento 1
events[1] → EventCard do evento 2
events[2] → EventCard do evento 3
```

A `key` não aparece na tela e não é uma prop comum. React usa esse identificador para reconhecer o mesmo item depois de uma mudança na lista.

### Exercícios graduais

1. Adicione três eventos ao array sem tocar no JSX
2. Ordene manualmente os eventos no array e observe a tela
3. Crie uma propriedade `description` no tipo
4. Leia o erro nos objetos que ainda não possuem `description`
5. Complete cada objeto e mostre a descrição no cartão

### Erros comuns

- **`events.map is not a function`**: `events` não é um array no momento da execução
- **Aviso de key**: a prop `key` está ausente ou duplicada
- **Tipo e dados discordam**: uma propriedade obrigatória não existe no objeto
- **Import circular ou incorreto**: confira de qual arquivo `Event` e `events` são importados

### Critérios de conclusão

- [ ] quatro objetos obedecem ao tipo `Event`
- [ ] a tela não contém quatro cartões copiados manualmente
- [ ] não há aviso de `key` no console
- [ ] adicionar um objeto ao array adiciona um cartão à tela

### Entrega do dia

Commit sugerido: `feat: renderizar lista tipada de eventos`.

## Dia 4 — Estado e formulário local

### Resultado esperado

Um formulário adiciona eventos à lista apenas no navegador.

### Conceitos

- **estado:** dado que pode mudar enquanto a página está aberta;
- **useState:** hook que guarda estado;
- **campo controlado:** campo cujo valor vem do estado React;
- **submit:** envio de formulário;
- **re-renderização:** atualização da interface quando o estado muda.

### Antes do formulário: um contador

```tsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Cliquei {count} vezes
</button>
```

Ela deve explicar este fluxo:

```text
Clique → setCount → estado muda → React renderiza novamente → texto muda
```

### Exemplo de campo controlado

```tsx
const [title, setTitle] = useState("");

<input
  value={title}
  onChange={(event) => setTitle(event.target.value)}
  placeholder="Título do evento"
/>
```

### Passo a passo

1. Começar com apenas um campo de título.
2. Mostrar abaixo dele o texto digitado.
3. Criar botão de envio.
4. Impedir recarregamento da página no submit.
5. Adicionar o título à lista local.
6. Só então adicionar local, data e capacidade.
7. Limpar os campos somente depois de sucesso.

### Pare e teste

- Digitar altera o texto visível?
- A página recarrega ao enviar? Se sim, qual passo foi esquecido?
- Atualizar o navegador mantém o evento criado? Por quê?

### Desafio

Não permitir título vazio e mostrar erro perto do campo.

### Esqueleto do submit

Use este trecho como ponto de partida, não como solução final:

```tsx
function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  if (title.trim().length < 3) {
    setError("Informe pelo menos 3 caracteres");
    return;
  }

  setError("");
  // Adicione o novo evento ao estado da lista.
}
```

Importe `FormEvent` como tipo do React. `preventDefault()` impede o navegador de recarregar a página. O `return` encerra a função quando o título é inválido.

### Divida o estado em duas responsabilidades

```text
Estado do formulário: o que está sendo digitado
Estado da lista: eventos que aparecem na tela
```

Não use a constante importada de `data/events.ts` como se ela fosse mutável. Inicie um estado da lista com esses dados e produza um novo array ao adicionar.

### Testes manuais

1. Envie título vazio
2. Envie título com dois caracteres
3. Digite espaços antes e depois
4. Crie um evento válido
5. Crie dois eventos seguidos
6. Confirme que a lista anterior continua presente

### Erros comuns

- **Página recarrega**: `preventDefault()` está ausente
- **Lista não atualiza**: o array foi alterado diretamente em vez de criar novo estado
- **Capacidade vira texto**: `input type="number"` ainda fornece string
- **Erro some cedo demais**: limpe a mensagem somente após nova validação ou sucesso

### Critérios de conclusão

- [ ] evento inválido não entra na lista
- [ ] mensagem aparece próxima ao campo
- [ ] evento válido aparece sem recarregar
- [ ] o formulário limpa apenas após sucesso

### Entrega do dia

Commit sugerido: `feat: adicionar formulário local de eventos`.

## Dia 5 — Rotas, Tailwind e shadcn/ui

### Resultado esperado

Páginas de lista, detalhes e novo evento, com estilo básico e navegação.

### Conceitos

- **rota:** endereço que mostra uma página;
- **rota dinâmica:** endereço com parte variável, como `/events/2`;
- **Tailwind:** classes utilitárias de CSS;
- **shadcn/ui:** componentes cujo código é adicionado ao projeto.

### Passo a passo

1. Instalar React Router segundo sua documentação.
2. Criar `EventListPage`, `EventDetailsPage` e `CreateEventPage`.
3. Configurar `/`, `/events/:eventId` e `/events/new`.
4. Criar links entre as páginas.
5. Configurar Tailwind pelo guia atual para Vite.
6. Estilizar um cartão manualmente com Tailwind.
7. Inicializar shadcn/ui.
8. Adicionar somente `button`, `card` e `input`.
9. Trocar o cartão manual por `Card`.
10. Testar com largura de celular.

### Regra didática

Antes de usar shadcn, construir pelo menos um botão e um cartão manualmente. Assim ela entende o problema que a biblioteca resolve.

### Checkpoint da semana 1

Demonstrar lista, detalhes, formulário local, navegação, componentes reutilizáveis e layout básico responsivo.

### Instalação e configuração orientadas

Instale o roteador dentro de `web` conforme a documentação atual. Em seguida, crie uma estrutura de rotas explícita:

```tsx
import { BrowserRouter, Route, Routes } from "react-router";

<BrowserRouter>
  <Routes>
    <Route path="/" element={<EventListPage />} />
    <Route path="/events/new" element={<CreateEventPage />} />
    <Route path="/events/:eventId" element={<EventDetailsPage />} />
  </Routes>
</BrowserRouter>
```

Declare `/events/new` antes de raciocinar sobre o segmento dinâmico. O roteador atual resolve a melhor correspondência, mas a distinção entre segmento fixo e `:eventId` precisa estar clara.

Para Tailwind com Vite, siga a integração oficial atual. Para shadcn/ui, execute o inicializador dentro de `web` e adicione apenas os componentes necessários:

```bash
npx shadcn@latest init
npx shadcn@latest add button card input
```

### Página de detalhes: raciocínio

1. Leia `eventId` com o hook de parâmetros do roteador
2. Converta o parâmetro para número
3. Procure o evento no array
4. Mostre “Evento não encontrado” quando a busca falhar
5. Renderize os detalhes quando encontrar

### Acessibilidade mínima

- Use um único `h1` por página
- Associe cada `label` ao respectivo `input`
- Use `Link` para navegação e `button` para ações
- Mantenha foco visível
- Não use apenas cor para comunicar “lotado”

### Erros comuns

- **Tela vazia após instalar o roteador**: verifique se a aplicação está dentro de `BrowserRouter`
- **Detalhe não encontrado**: compare número com número, não string com número
- **Import com `@/` falha**: o alias precisa estar configurado no TypeScript e Vite
- **Componente shadcn não encontrado**: confirme que o comando foi executado dentro de `web`

### Critérios de conclusão

- [ ] três URLs renderizam páginas diferentes
- [ ] um cartão abre seu detalhe correto
- [ ] evento inexistente possui mensagem útil
- [ ] teclado alcança links, campos e botões
- [ ] layout funciona em 360 px de largura

### Entrega do dia

Commit sugerido: `feat: adicionar navegação e interface responsiva`.

# Semana 2 — API, HTTP e SQLite

**Meta:** criar API Express, conectar React a ela e persistir eventos em SQLite.

## Dia 6 — Primeira API e primeiro endpoint

### Resultado esperado

Uma API responde `GET /health` e `GET /events`.

### Conceitos

- **API:** programa que recebe pedidos e devolve respostas;
- **request:** pedido recebido;
- **response:** resposta enviada;
- **JSON:** formato de texto usado para trocar dados;
- **porta:** número onde o programa espera pedidos.

### Preparar a API

Na raiz do projeto:

```bash
mkdir api
cd api
npm init -y
npm install express cors zod
npm install -D typescript tsx @types/node @types/express @types/cors
```

Criar `tsconfig.json` seguindo a documentação do Express. O objetivo não é decorar todas as opções, mas saber que o TypeScript possui configuração.

### Arquivos

```text
api/src/
├── app.ts
└── server.ts
```

### Exemplo: `api/src/app.ts`

```ts
import express from "express";

const app = express();

app.use(express.json());

app.get("/health", (request, response) => {
  return response.json({ status: "ok" });
});

app.get("/events", (request, response) => {
  return response.json([
    { id: 1, title: "Semana de Engenharia" },
  ]);
});

export { app };
```

### Leitura do endpoint

```ts
app.get("/events", (request, response) => { /* resposta */ })
```

- `app`: aplicação Express;
- `.get`: aceita o método HTTP GET;
- `"/events"`: caminho da rota;
- `request`: informações recebidas;
- `response`: objeto usado para responder;
- `response.json`: envia JSON.

### Exemplo: `api/src/server.ts`

```ts
import { app } from "./app";

app.listen(3000, () => {
  console.log("API em http://localhost:3000");
});
```

### Pare e teste

```text
GET http://localhost:3000/health
GET http://localhost:3000/events
GET http://localhost:3000/nao-existe
```

### Desafio

Criar `GET /about`, retornando nome e objetivo do projeto.

### Configure os comandos da API

Adicione scripts equivalentes a estes no `package.json` da pasta `api`:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

`dev` reinicia a API quando um arquivo muda. `typecheck` verifica tipos sem gerar arquivos JavaScript.

### Entenda a separação entre `app.ts` e `server.ts`

- `app.ts` configura middlewares e rotas
- `server.ts` abre a porta

Essa separação permitirá testar `app` sem iniciar um servidor adicional em cada teste.

### Experimentos obrigatórios

1. Troque a porta de 3000 para 3333 e acesse a nova URL
2. Pare o processo com `Ctrl+C` e tente acessar `/health`
3. Remova `express.json()` e anote qual funcionalidade futura deixará de funcionar
4. Retorne status `200` explicitamente e confirme que a resposta continua igual

### Erros comuns

- **`Cannot GET /health`**: caminho, método ou arquivo executado não corresponde ao esperado
- **`EADDRINUSE`**: outra aplicação usa a porta
- **Import não resolvido**: confira extensão e configuração de módulos TypeScript
- **Processo encerra imediatamente**: leia o primeiro erro do terminal, não apenas o último

### Critérios de conclusão

- [ ] `npm run dev` inicia a API
- [ ] `/health` devolve JSON
- [ ] `/events` devolve array
- [ ] rota inexistente não derruba o processo
- [ ] a estudante explica request, response, rota e porta

### Entrega do dia

Commit sugerido: `feat: criar primeira API Express`.

## Dia 7 — Rotas, controllers e MVC na prática

### Resultado esperado

O endpoint de eventos sai de `app.ts` e passa a usar route e controller.

### Por que separar?

No Dia 6, tudo em um arquivo é bom: havia pouco código. Quando há mais endpoints, o arquivo mistura configuração, URLs e lógica. Vamos separar apenas o necessário.

### Nova estrutura

```text
api/src/
├── app.ts
├── server.ts
├── routes/
│   └── event.routes.ts
└── controllers/
    └── event.controller.ts
```

### Exemplo: `event.routes.ts`

```ts
import { Router } from "express";
import { listEvents } from "../controllers/event.controller";

const eventRouter = Router();

eventRouter.get("/", listEvents);

export { eventRouter };
```

### Exemplo: `event.controller.ts`

```ts
import type { Request, Response } from "express";

export function listEvents(request: Request, response: Response) {
  return response.json([
    { id: 1, title: "Semana de Engenharia" },
  ]);
}
```

### Ajuste em `app.ts`

```ts
import { eventRouter } from "./routes/event.routes";

app.use("/events", eventRouter);
```

Agora `eventRouter.get("/")` representa `GET /events`, porque `app.use("/events", eventRouter)` adicionou o começo da URL.

### Desafio

Criar `GET /events/:eventId` que devolva o identificador recebido. Pesquisar `request.params` antes de pedir ajuda.

### Adicione o service somente depois do controller funcionar

O service remove regras e acesso a dados do controller:

```ts
const events = [
  { id: 1, title: "Semana de Engenharia" },
];

export function findAllEvents() {
  return events;
}
```

O controller passa a coordenar HTTP:

```ts
export function listEvents(request: Request, response: Response) {
  const events = findAllEvents();
  return response.status(200).json(events);
}
```

Não crie repository neste dia. O array ainda não é um banco e duas camadas bastam para visualizar responsabilidades.

### Exemplo de parâmetro de rota

```ts
export function getEvent(request: Request, response: Response) {
  const eventId = Number(request.params.eventId);

  if (Number.isNaN(eventId)) {
    return response.status(400).json({ message: "ID inválido" });
  }

  return response.json({ eventId });
}
```

Parâmetros de URL chegam como texto. `Number()` converte, e `Number.isNaN()` detecta conversão inválida.

### Mapa de responsabilidades

```text
event.routes.ts       caminho e método HTTP
event.controller.ts   request, response e status
event.service.ts      operação e regra do domínio
app.ts                registra o conjunto de rotas
```

### Erros comuns

- **Rota sempre responde 404**: `eventRouter` não foi registrado em `app.ts`
- **`eventId` é `undefined`**: nome lido em `params` difere de `:eventId`
- **Controller executa ao iniciar**: passe a função `listEvents`, não chame `listEvents()` na rota
- **Dependência circular**: rota importa controller; controller não deve importar rota

### Critérios de conclusão

- [ ] `/events` continua funcionando após refatoração
- [ ] `/events/1` lê o parâmetro
- [ ] `/events/abc` recebe erro controlado
- [ ] a estudante sabe apontar rota, controller e service

### Entrega do dia

Commit sugerido: `refactor: separar rotas e controllers de eventos`.

## Dia 8 — POST e validação com Zod

### Resultado esperado

`POST /events` cria evento em memória e rejeita dados inválidos.

### Conceitos

- **body:** dados enviados pelo cliente;
- **POST:** método usado para criar;
- **validação:** conferir dados em execução;
- TypeScript não valida JSON recebido;
- `201`: criado com sucesso;
- `400`: pedido inválido.

### Exemplo: schema de criação

```ts
import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string().min(3),
  location: z.string().min(3),
  startsAt: z.string().datetime(),
  endsAt: z.string().datetime(),
  capacity: z.number().int().positive(),
});
```

### Evolução intencional do tipo do frontend

Na Semana 1, `date` era um texto pronto para reduzir conceitos simultâneos. A API precisa representar início e término separadamente. Atualize o tipo `Event` do frontend:

```ts
export type Event = {
  id: number;
  title: string;
  description: string;
  location: string;
  startsAt: string;
  endsAt: string;
  capacity: number;
};
```

Formate `startsAt` somente ao exibir. Não salve “15 de outubro, 19h” na API, pois esse texto não serve bem para ordenar, comparar ou trocar fuso horário.

### Fluxo

```text
Cliente envia qualquer JSON
           ↓
Zod verifica forma e regras simples
           ↓
Dados válidos entram na lógica
           ↓
Dados inválidos recebem erro
```

### Passo a passo

1. Criar `schemas/event.schema.ts`.
2. Criar array temporário no controller.
3. Criar `POST /events`.
4. Validar body antes de usar os dados.
5. Retornar `201` com evento criado.
6. Retornar erro compreensível para validação.
7. Testar requisição válida e inválida em Bruno, Insomnia, Postman ou REST Client.

### Corpo de teste

```json
{
  "title": "Oficina de React",
  "location": "Laboratório 2",
  "startsAt": "2026-10-20T19:00:00.000Z",
  "endsAt": "2026-10-20T21:00:00.000Z",
  "capacity": 30
}
```

### Desafio

Rejeitar data final anterior à inicial. Antes do código, escrever a regra em português.

### Exemplo de controller com `safeParse`

```ts
export function createEvent(request: Request, response: Response) {
  const result = createEventSchema.safeParse(request.body);

  if (!result.success) {
    return response.status(400).json({
      message: "Dados inválidos",
      issues: result.error.issues,
    });
  }

  const event = createEventService(result.data);
  return response.status(201).json(event);
}
```

`safeParse` não lança exceção para entrada inválida. Ele retorna um resultado que precisa ser verificado. Após `result.success`, TypeScript reconhece `result.data` como dado validado.

### Regra entre dois campos

O schema valida o relacionamento entre início e término com uma refinamento. Antes de pesquisar a API de Zod, escreva a condição em JavaScript:

```ts
new Date(data.endsAt).getTime() >
  new Date(data.startsAt).getTime()
```

Depois, use a documentação de `.refine()` para associar uma mensagem ao campo `endsAt`.

### Matriz de testes manuais

| Caso | Resultado esperado |
|---|---|
| todos os campos válidos | `201` e evento criado |
| título com 2 caracteres | `400` |
| capacidade zero | `400` |
| capacidade `"30"` | `400` nesta API estrita |
| data final anterior | `400` |
| JSON malformado | erro controlado, sem derrubar API |

### Erros comuns

- **`request.body` é `undefined`**: `express.json()` está ausente ou body não é JSON
- **Toda data falha**: envie formato ISO completo
- **`parse` derruba a requisição**: use `safeParse` ou trate a exceção
- **API aceita string como capacidade**: decida conscientemente entre coerção e validação estrita

### Critérios de conclusão

- [ ] criação válida retorna `201`
- [ ] resposta inválida explica os campos
- [ ] service só recebe dados validados
- [ ] data final precisa ser posterior à inicial

### Entrega do dia

Commit sugerido: `feat: validar criação de eventos com Zod`.

## Dia 9 — React consumindo Express

### Resultado esperado

O frontend lista e cria eventos usando a API em memória.

### Conceitos

- **fetch:** função do navegador que faz requisições;
- **async/await:** forma de esperar operação lenta;
- estado de carregamento, sucesso, vazio e erro;
- **CORS:** regra do navegador para comunicação entre endereços diferentes.

### Exemplo: `web/src/services/event-service.ts`

```ts
const API_URL = "http://localhost:3000";

export async function getEvents() {
  const response = await fetch(`${API_URL}/events`);

  if (!response.ok) {
    throw new Error("Não foi possível carregar os eventos");
  }

  return response.json();
}
```

### Como ler

- `fetch` envia o pedido;
- `await` aguarda a resposta;
- `response.ok` verifica sucesso HTTP;
- `response.json()` converte JSON em dados JavaScript.

### Passo a passo

1. Permitir a origem do frontend no CORS da API.
2. Criar a função de serviço acima.
3. Buscar eventos quando a página abrir.
4. Mostrar “Carregando eventos…”.
5. Mostrar erro se a API estiver desligada.
6. Mostrar estado vazio para lista vazia.
7. Enviar formulário para `POST /events`.
8. Atualizar lista após resposta de sucesso.

### Pare e teste

- Desligar API: a tela explica o problema?
- Criar evento: ele aparece?
- Atualizar a página: ele permanece? Ainda não. Por quê?

### Exemplo de carregamento na página

```tsx
const [events, setEvents] = useState<Event[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  getEvents()
    .then(setEvents)
    .catch(() => setError("Não foi possível carregar"))
    .finally(() => setIsLoading(false));
}, []);
```

O array vazio em `useEffect` indica que a busca ocorre após a primeira renderização. A requisição possui três resultados visuais: carregando, erro ou dados.

### Ordem de renderização sugerida

```tsx
if (isLoading) return <p>Carregando eventos…</p>;
if (error) return <p role="alert">{error}</p>;
if (events.length === 0) return <p>Nenhum evento encontrado.</p>;
```

Renderize a lista somente depois dessas condições.

### Envio do formulário

Crie uma função `createEvent` no mesmo service. Ela deve:

1. usar método `POST`
2. enviar header `Content-Type: application/json`
3. converter os dados com `JSON.stringify`
4. verificar `response.ok`
5. devolver o evento criado

### Erros comuns

- **Erro de CORS no navegador**: configure origem no backend; não tente corrigir no componente
- **Promise aparece na tela**: faltou `await` ou tratamento assíncrono
- **Busca repete sem parar**: dependências do `useEffect` mudam a cada renderização
- **Formulário cria, mas lista não muda**: adicione a resposta do servidor ao estado ou busque novamente
- **URL repetida em vários arquivos**: use variável de ambiente do Vite

### Critérios de conclusão

- [ ] frontend não importa mais dados falsos na página principal
- [ ] carregamento, erro e vazio são visíveis
- [ ] formulário envia JSON à API
- [ ] erro do backend não apaga o formulário

### Entrega do dia

Commit sugerido: `feat: integrar frontend à API de eventos`.

## Dia 10 — Prisma e SQLite

### Resultado esperado

Eventos continuam existindo depois de reiniciar a API.

### Conceitos

- banco relacional: dados organizados em tabelas;
- migration: histórico de mudanças das tabelas;
- ORM: ferramenta que traduz operações do programa para banco;
- SQLite: banco em arquivo local.

### Exemplo: primeiro modelo em `prisma/schema.prisma`

```prisma
model Event {
  id        Int      @id @default(autoincrement())
  title     String
  description String
  location  String
  startsAt  DateTime
  endsAt    DateTime
  capacity  Int
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Como ler

```text
model Event      representa uma tabela
id               identifica cada registro
@id              chave primária
autoincrement()  banco cria o próximo id
DateTime         data e hora
@default(now())  preenche criação automaticamente
```

### Passo a passo

1. Instalar Prisma em versão estável compatível com SQLite usando a documentação oficial.
2. Inicializar Prisma para SQLite.
3. Criar o modelo acima.
4. Gerar uma migration com nome como `create_event`.
5. Abrir Prisma Studio e observar tabela vazia.
6. Substituir array em memória por consultas Prisma de listar e criar.
7. Criar evento pela interface.
8. Reiniciar API e conferir a lista.

### Checkpoint da semana 2

Demonstrar evento criado no React, validado no Express e preservado no SQLite.

### Comandos do fluxo Prisma

Use os comandos gerados ou recomendados pelo guia oficial da versão instalada. O ciclo conceitual será:

```bash
npx prisma init --datasource-provider sqlite
npx prisma migrate dev --name create_event
npx prisma generate
npx prisma studio
```

Se a versão estável exigir um adapter para SQLite, siga o quickstart atual e centralize a criação do cliente em `src/lib/prisma.ts`. Não misture exemplos de versões diferentes.

### Exemplo de acesso ao banco

```ts
import { prisma } from "../lib/prisma";

export function findAllEvents() {
  return prisma.event.findMany({
    orderBy: { startsAt: "asc" },
  });
}
```

### Exemplo de criação

```ts
export function createEvent(data: CreateEventInput) {
  return prisma.event.create({
    data: {
      ...data,
      startsAt: new Date(data.startsAt),
      endsAt: new Date(data.endsAt),
    },
  });
}
```

As datas recebidas chegam como strings ISO. Prisma espera `Date` nos campos `DateTime`, portanto o service converte antes de salvar.

### O que é uma migration

```text
schema.prisma alterado
        ↓
prisma migrate dev
        ↓
arquivo SQL versionado
        ↓
estrutura do banco atualizada
```

Não apague migrations para esconder erros. Em ambiente de estudo sem dados importantes, recriar o banco pode ser aceitável, mas registre o que aconteceu.

### Erros comuns

- **Tabela não existe**: migration não foi aplicada ao banco usado pela API
- **Prisma Client desatualizado**: execute geração após mudar schema
- **Data rejeitada**: converta string ISO para `Date`
- **Dois bancos diferentes**: confira `DATABASE_URL` e diretório relativo
- **Muitos PrismaClient**: centralize uma instância em `lib/prisma.ts`

### Critérios de conclusão

- [ ] evento sobrevive ao reinício
- [ ] Prisma Studio mostra o mesmo registro
- [ ] migration está no Git
- [ ] arquivo `.db` não está no Git
- [ ] service usa Prisma em vez de array

### Entrega do dia

Commit sugerido: `feat: persistir eventos com Prisma e SQLite`.

# Semana 3 — Usuários, login e propriedade

**Meta:** criar contas reais, senha protegida, sessão JWT em cookie e eventos pertencentes a criadores.

## Dia 11 — Usuários, relações e inscrições no banco

### Resultado esperado

O banco tem usuários, eventos com organizador e inscrições.

### Conceitos

- chave estrangeira: aponta para registro de outra tabela;
- um-para-muitos: usuário cria vários eventos;
- muitos-para-muitos: usuário participa de muitos eventos;
- tabela associativa: `Enrollment` representa inscrição.

### Diagrama

```text
User 1 ───── N Event
  │              │
  └──── N Enrollment N ────┘
```

### Modelo Prisma de referência

```prisma
model User {
  id           Int          @id @default(autoincrement())
  name         String
  email        String       @unique
  passwordHash String
  events       Event[]
  enrollments  Enrollment[]
  createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
}

model Event {
  id          Int          @id @default(autoincrement())
  title       String
  description String
  location    String
  startsAt    DateTime
  endsAt      DateTime
  capacity    Int
  status      String       @default("ACTIVE")
  organizerId Int
  organizer   User         @relation(fields: [organizerId], references: [id])
  enrollments Enrollment[]
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @updatedAt
}

model Enrollment {
  id        Int      @id @default(autoincrement())
  userId    Int
  eventId   Int
  createdAt DateTime @default(now())
  user      User     @relation(fields: [userId], references: [id])
  event     Event    @relation(fields: [eventId], references: [id])

  @@unique([userId, eventId])
}
```

### O que é importante

```prisma
email String @unique
```

O banco impede e-mail duplicado.

```prisma
@@unique([userId, eventId])
```

O banco impede a mesma pessoa de se inscrever duas vezes no mesmo evento.

### Passo a passo

1. Desenhar as tabelas em papel.
2. Atualizar schema.
3. Criar migration.
4. Abrir Prisma Studio e conferir relações.
5. Criar seed simples com dois usuários e eventos.
6. Explicar onde fica cada chave estrangeira.

### Construa o modelo em três migrations mentais

Antes de editar o arquivo, descreva as mudanças:

1. `User` guarda identidade e credencial protegida
2. `Event` recebe `organizerId` e passa a pertencer a `User`
3. `Enrollment` conecta `User` e `Event`

Como `organizerId` será obrigatório, eventos antigos precisam de organizador. Em um banco de estudo, você pode recriar dados. Em produção, precisaria planejar migração de dados.

### Exercício com dados concretos

Desenhe estas linhas em três tabelas:

```text
User:       1, Ana
User:       2, Bruno
Event:      10, Oficina React, organizerId 1
Enrollment: userId 2, eventId 10
```

Responda:

- Quem organiza o evento 10?
- Quem participa do evento 10?
- Qual chave aponta de `Event` para `User`?
- Por que `Enrollment` possui duas chaves estrangeiras?

### Erros comuns

- **Migration exige valor para registros antigos**: o novo campo obrigatório não possui dado para linhas existentes
- **Relação ambígua**: campos de relação e chaves estrangeiras não correspondem
- **Seed salva senha em texto puro**: até dados de desenvolvimento devem usar hash ou senha claramente descartável gerada pelo mesmo fluxo
- **Inscrição duplicada entra no banco**: `@@unique` está ausente ou migration não foi aplicada

### Critérios de conclusão

- [ ] Prisma valida o schema
- [ ] migration cria três tabelas relacionadas
- [ ] seed cria dois usuários e eventos coerentes
- [ ] uma inscrição conecta um usuário a um evento
- [ ] a estudante explica `@unique`, `@relation` e `@@unique`

### Entrega do dia

Commit sugerido: `feat: modelar usuários e inscrições`.

## Dia 12 — Cadastro e hash de senha

### Resultado esperado

Usuário cria conta e nenhuma senha fica visível no banco ou na resposta.

### Conceitos

- autenticação: provar quem é a pessoa;
- hash: transformação de mão única;
- salt: valor que dificulta ataques pré-calculados;
- Argon2id: algoritmo adequado para senha;
- dado sensível: algo que não deve aparecer em resposta ou log.

### Fluxo

```text
nome + e-mail + senha
          ↓
API valida
          ↓
Argon2 gera passwordHash
          ↓
Prisma salva User
          ↓
Resposta não inclui passwordHash
```

### Exemplo central

```ts
import argon2 from "argon2";

const passwordHash = await argon2.hash(password, {
  type: argon2.argon2id,
});
```

Esse código não cria uma senha recuperável. Ele cria um hash para comparar no login.

### Passo a passo

1. Instalar `argon2`.
2. Criar schema de cadastro: nome, e-mail e senha.
3. Normalizar e-mail com `trim()` e `toLowerCase()`.
4. Verificar duplicidade.
5. Gerar hash.
6. Criar `POST /auth/register`.
7. Criar página de cadastro.
8. Testar conta válida, senha curta e e-mail duplicado.

### Pare e teste

- Prisma Studio mostra senha original? Não deveria.
- A resposta da API devolve hash? Não deveria.
- E-mail em maiúsculas cria duplicidade? Não deveria.

### Exemplo de schema de cadastro

```ts
export const registerSchema = z.object({
  name: z.string().trim().min(2),
  email: z.string().trim().email(),
  password: z.string().min(8).max(128),
});
```

### Esqueleto do service

```ts
export async function registerUser(input: RegisterInput) {
  const email = input.email.trim().toLowerCase();
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    throw new ConflictError("E-mail já cadastrado");
  }

  const passwordHash = await argon2.hash(input.password, {
    type: argon2.argon2id,
  });

  // Crie o usuário selecionando apenas campos públicos.
}
```

Complete a criação com Prisma. Use `select` para devolver apenas `id`, `name` e `email`. Não consulte o usuário inteiro para depois tentar apagar o hash.

### Divisão de responsabilidades

```text
registerSchema      formato dos dados recebidos
auth.controller     HTTP, status 201 e resposta
auth.service        normalização, duplicidade e hash
Prisma              unicidade e persistência
```

### Testes manuais

1. Cadastre `ANA@EXAMPLE.COM`
2. Tente cadastrar `ana@example.com`
3. Teste senha com 7 e 8 caracteres
4. Inspecione banco e resposta
5. Procure `password` nos logs do terminal

### Erros comuns

- **Argon2 falha ao instalar**: confira versão Node e requisitos nativos da biblioteca
- **E-mail duplicado vira erro 500**: traduza conflito esperado para `409`
- **Hash aparece na resposta**: use `select` explícito
- **Senha é normalizada**: não aplique `trim()` silencioso à senha; espaços podem fazer parte dela

### Critérios de conclusão

- [ ] cadastro válido retorna `201`
- [ ] e-mail duplicado retorna `409`
- [ ] senha nunca aparece em banco, resposta ou log
- [ ] resposta contém apenas dados públicos

### Entrega do dia

Commit sugerido: `feat: cadastrar usuários com senha protegida`.

## Dia 13 — Login, JWT e cookie HttpOnly

### Resultado esperado

Login cria uma sessão representada por JWT em cookie HttpOnly.

### Conceitos

```text
JWT = header.payload.assinatura
```

- JWT assinado não é necessariamente criptografado;
- não colocar senha no payload;
- verificar token não é apenas decodificar;
- cookie HttpOnly não é lido por JavaScript comum;
- `exp` define expiração.

### Fluxo de login

```text
React envia e-mail e senha
          ↓
API encontra usuário
          ↓
Argon2 compara senha e hash
          ↓
jose assina JWT com user id
          ↓
API devolve cookie HttpOnly
```

### Exemplo de cookie

```ts
response.cookie("session", token, {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 1000 * 60 * 60 * 2,
});
```

### Passo a passo

1. Criar `JWT_SECRET` em `.env` e seu nome em `.env.example`.
2. Criar helper de assinatura e verificação com `jose`.
3. Criar `POST /auth/login`.
4. Configurar CORS com origem exata e `credentials: true`.
5. Criar `POST /auth/logout`.
6. Criar `GET /auth/me`.
7. Testar no cliente HTTP antes de conectar ao React.

### Perguntas

- Por que não colocar senha no JWT?
- Por que não usar localStorage para token?
- Por que verificar assinatura é necessário?

### Exemplo de assinatura com `jose`

```ts
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export function createSessionToken(userId: number) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
}
```

O identificador fica em `sub`, claim padrão para o sujeito do token. Não coloque o objeto inteiro do usuário no payload.

### Exemplo de verificação

```ts
export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret, {
    algorithms: ["HS256"],
  });

  return payload;
}
```

### Esqueleto do login

```text
validar body
  ↓
normalizar e-mail
  ↓
buscar usuário
  ↓
comparar senha com argon2.verify
  ↓
criar token
  ↓
definir cookie
  ↓
responder dados públicos
```

Use a mesma mensagem para e-mail inexistente e senha incorreta, evitando revelar quais contas existem.

### Testes no cliente HTTP

- login correto recebe `Set-Cookie`
- senha errada recebe `401`
- `/auth/me` com cookie devolve usuário
- `/auth/me` sem cookie recebe `401`
- logout expira o cookie

### Erros comuns

- **`JWT_SECRET` indefinido**: valide variáveis de ambiente ao iniciar a API
- **Cookie não é armazenado**: confira CORS, credenciais e ferramenta HTTP
- **Token apenas decodificado**: sempre use `jwtVerify`
- **Logout não remove cookie**: use as mesmas opções de caminho e nome empregadas na criação

### Critérios de conclusão

- [ ] login válido cria cookie HttpOnly
- [ ] login inválido não distingue e-mail de senha
- [ ] token expira em duas horas
- [ ] `/auth/me` verifica assinatura
- [ ] logout remove sessão

### Entrega do dia

Commit sugerido: `feat: autenticar com JWT em cookie HttpOnly`.

## Dia 14 — Middleware, sessão React e proteção de rotas

### Resultado esperado

Visitantes não acessam criação de eventos; o frontend reconhece sessão após atualizar a página.

### Conceitos

- middleware: função que roda antes da rota principal;
- `401`: não autenticado;
- Context: forma simples de compartilhar sessão;
- rota protegida;
- `credentials: "include"`: permite envio de cookie no `fetch` configurado.

### Exemplo de middleware: ideia central

```ts
export async function authenticate(request, response, next) {
  const token = request.cookies.session;

  if (!token) {
    return response.status(401).json({ message: "Faça login" });
  }

  // verificar token e colocar userId em request
  return next();
}
```

`next()` diz ao Express que o middleware terminou e a próxima etapa pode continuar.

### Passo a passo

1. Configurar leitura de cookies na API.
2. Criar middleware de autenticação.
3. Proteger rota de teste, como `GET /me/events`.
4. Criar `AuthContext` simples no React.
5. Ao iniciar frontend, chamar `/auth/me` com `credentials: "include"`.
6. Criar login e cadastro.
7. Criar rota protegida para novo evento.
8. Criar botão de logout.

### Pare e teste

- Em janela anônima, rota protegida é bloqueada?
- Depois do login, atualizar mantém sessão?
- Logout remove acesso?

### Prefira `response.locals` para o primeiro middleware

Evite ampliar os tipos globais de `Request` nesta primeira versão. Depois de verificar o token, salve o id no contexto da resposta:

```ts
const payload = await verifySessionToken(token);
const userId = Number(payload.sub);

if (!Number.isInteger(userId)) {
  return response.status(401).json({ message: "Sessão inválida" });
}

response.locals.userId = userId;
return next();
```

Uma rota protegida lê `response.locals.userId`. Mais tarde, o projeto pode criar tipos próprios para esse contexto.

### Exemplo do `fetch` autenticado

```ts
export async function getCurrentUser() {
  const response = await fetch(`${API_URL}/auth/me`, {
    credentials: "include",
  });

  if (response.status === 401) return null;
  if (!response.ok) throw new Error("Falha ao verificar sessão");
  return response.json();
}
```

### Estados do contexto de autenticação

```text
checking   a aplicação ainda consulta /auth/me
anonymous  consulta terminou sem usuário
signed-in  consulta devolveu usuário
```

Não trate `checking` como visitante. Isso faria a página protegida piscar antes de descobrir a sessão.

### Erros comuns

- **Cookie existe, mas não é enviado**: falta `credentials: "include"`
- **CORS rejeita credenciais**: origem precisa ser explícita; não use `*`
- **Página protegida pisca**: renderize carregamento enquanto a sessão é verificada
- **Middleware nunca chama controller**: `next()` não foi executado após sucesso
- **Exceção de token vira 500**: traduza token inválido ou expirado para `401`

### Critérios de conclusão

- [ ] `/auth/me` determina sessão ao atualizar
- [ ] visitante vê login, não criação
- [ ] usuário autenticado vê logout
- [ ] página protegida possui estado de verificação
- [ ] cookie não é lido pelo React

### Entrega do dia

Commit sugerido: `feat: integrar sessão entre API e React`.

## Dia 15 — Criar, editar e cancelar eventos próprios

### Resultado esperado

Usuários administram apenas eventos que criaram.

### Conceitos

- autorização: decidir o que a pessoa pode fazer;
- propriedade de recurso;
- `403`: pessoa autenticada sem permissão;
- status persistido e status derivado.

### Regra essencial

```text
Esconder botão no React melhora interface.
Validar propriedade no Express protege o dado.
Precisamos dos dois.
```

### Fluxo correto

```text
Cliente envia título, local, datas e capacidade
                ↓
Middleware obtém userId do JWT
                ↓
Service usa userId como organizerId
                ↓
Prisma cria Event
```

O frontend não envia `organizerId`; ele poderia ser manipulado.

### Passo a passo

1. Proteger `POST /events`.
2. Obter usuário no middleware.
3. Usar esse usuário como organizador.
4. Criar `GET /me/events`.
5. Criar página “Meus eventos”.
6. Criar `PATCH /events/:eventId`.
7. Conferir propriedade antes de editar.
8. Criar `POST /events/:eventId/cancel`.
9. Mostrar Editar e Cancelar apenas para organizador.
10. Tentar editar evento de outra pessoa pelo cliente HTTP.

### Checkpoint da semana 3

Demonstrar duas contas: uma cria evento; a outra não consegue editá-lo ou cancelá-lo.

### Exemplo de verificação de propriedade no service

```ts
export async function updateEvent(
  eventId: number,
  userId: number,
  input: UpdateEventInput,
) {
  const event = await prisma.event.findUnique({ where: { id: eventId } });

  if (!event) throw new NotFoundError("Evento não encontrado");
  if (event.organizerId !== userId) {
    throw new ForbiddenError("Você não pode editar este evento");
  }

  return prisma.event.update({ where: { id: eventId }, data: input });
}
```

O controller obtém `userId` de `response.locals`, nunca do body. O service compara esse id com `organizerId` salvo no banco.

### Edição parcial exige validação do resultado final

Se `PATCH` altera apenas `endsAt`, a API ainda precisa comparar o novo término com o início já salvo. Construa o estado resultante antes de validar:

```text
startsAt final = input.startsAt ou event.startsAt atual
endsAt final   = input.endsAt ou event.endsAt atual
```

### Cancelamento e exclusão

Neste curso, cancelamento altera `status` para `CANCELED`. O registro continua no banco. Não implemente exclusão física de evento com inscrições.

### Matriz de autorização

| Situação | Status esperado |
|---|---:|
| visitante tenta criar | `401` |
| organizador edita | `200` |
| outro usuário edita | `403` |
| evento não existe | `404` |
| organizador cancela | `200` |
| outro usuário cancela | `403` |

### Erros comuns

- **Frontend envia organizerId**: remova esse campo do contrato de criação
- **Botão escondido é a única proteção**: teste requisição direta com outra conta
- **PATCH cria datas inválidas**: valide os valores combinados
- **Evento cancelado some**: cancelamento não é exclusão

### Critérios de conclusão

- [ ] usuário cria evento vinculado à sessão
- [ ] “Meus eventos” filtra pelo organizador
- [ ] terceiro recebe `403` ao editar ou cancelar
- [ ] evento cancelado continua consultável
- [ ] frontend esconde ações proibidas sem substituir segurança da API

### Entrega do dia

Commit sugerido: `feat: autorizar gestão dos próprios eventos`.

# Semana 4 — Inscrições, testes e apresentação

**Meta:** completar inscrições, proteger regras principais, revisar e apresentar o projeto.

## Dia 16 — Inscrições

### Resultado esperado

Usuário se inscreve, vê suas inscrições e cancela a própria inscrição.

### Conceitos

- tabela associativa;
- restrição única;
- conflito;
- quantidade de inscritos;
- dados mínimos necessários em respostas.

### Endpoints

```text
POST   /events/:eventId/enrollments
DELETE /events/:eventId/enrollments/me
GET    /me/enrollments
GET    /events/:eventId/enrollments
```

O último é exclusivo do organizador.

### Passo a passo

1. Criar service de inscrição.
2. Conferir se evento existe.
3. Conferir se está ativo e não terminou.
4. Conferir se usuário ainda não está inscrito.
5. Criar inscrição com Prisma.
6. Tratar duplicidade como conflito compreensível.
7. Criar cancelamento da própria inscrição.
8. Criar página “Minhas inscrições”.
9. Criar seção de participantes para organizador.
10. Não devolver `passwordHash` em nenhuma resposta.

### Regra do banco

```prisma
@@unique([userId, eventId])
```

Essa regra protege duplicidade até quando alguém ignora o frontend e chama a API diretamente.

### Esqueleto do service de inscrição

```ts
export async function enrollUser(eventId: number, userId: number) {
  const event = await prisma.event.findUnique({
    where: { id: eventId },
    include: { _count: { select: { enrollments: true } } },
  });

  if (!event) throw new NotFoundError("Evento não encontrado");
  // Valide status, data, capacidade e duplicidade.
  // Crie Enrollment somente depois das validações.
}
```

O `_count` obtém a quantidade de inscrições sem carregar todos os participantes.

### Ordem das regras

1. evento existe
2. evento está ativo
3. evento ainda não terminou
4. usuário não está inscrito
5. existe vaga
6. criar inscrição

### Teste manual com duas contas

1. Ana cria evento
2. Bruno se inscreve
3. Bruno tenta se inscrever outra vez
4. Ana consulta participantes
5. Bruno tenta consultar participantes
6. Bruno cancela a própria inscrição
7. Ana confirma a remoção

### Erros comuns

- **Duplicidade vira 500**: traduza a restrição única para `409`
- **Cancelamento remove inscrição alheia**: filtre simultaneamente por `userId` e `eventId`
- **Lista expõe senha**: selecione apenas campos públicos
- **Contagem carrega todos os registros**: use `_count`

### Critérios de conclusão

- [ ] inscrição válida retorna `201`
- [ ] duplicada retorna `409`
- [ ] participante cancela apenas sua inscrição
- [ ] organizador vê participantes
- [ ] terceiro recebe `403`

### Entrega do dia

Commit sugerido: `feat: adicionar inscrições em eventos`.

## Dia 17 — Capacidade e estados de evento

### Resultado esperado

Eventos lotados, cancelados e encerrados não recebem inscrição.

### Conceitos

- capacidade;
- invariante: regra que nunca deve deixar de ser verdadeira;
- status ativo e cancelado;
- encerrado calculado a partir da data;
- race condition: duas pessoas tentam a última vaga quase juntas.

### Invariante

```text
0 ≤ total de inscrições ≤ capacidade
```

### Passo a passo

1. Contar inscrições de um evento.
2. Comparar total e capacidade antes de criar inscrição.
3. Rejeitar quando não houver vagas.
4. Mostrar “X vagas restantes”.
5. Exibir “Lotado” na interface.
6. Bloquear inscrição em cancelado.
7. Considerar encerrado quando `endsAt` estiver no passado.
8. Impedir reduzir capacidade abaixo de inscritos.
9. Testar evento de capacidade 1 com dois usuários.

### Discussão avançada, sem bloqueio

```text
Usuário A conta 0 inscritos
Usuário B conta 0 inscritos
Usuário A cria inscrição
Usuário B cria inscrição
```

Esse risco se chama race condition. Ela deve compreender e registrar o problema. Resolver concorrência de forma robusta com transações fica para a evolução pós-curso; não deve impedir a entrega em 20 dias.

### Funções puras para as regras

```ts
export function hasEnded(endsAt: Date, now = new Date()) {
  return endsAt.getTime() <= now.getTime();
}

export function remainingSeats(capacity: number, enrolled: number) {
  return Math.max(capacity - enrolled, 0);
}
```

O parâmetro `now` permite testar tempo sem esperar o relógio. `Math.max` impede vagas negativas na interface caso existam dados inconsistentes.

### Prioridade do status exibido

```text
status salvo = CANCELED  → Cancelado
endsAt passou            → Encerrado
inscritos = capacidade   → Lotado
caso contrário           → Disponível
```

Um evento cancelado e passado aparece como cancelado, pois a ação do organizador explica melhor seu estado.

### Valide a capacidade na edição

Antes de atualizar `capacity`, conte inscrições. Rejeite valor menor que a contagem. Um valor igual é permitido e deixa o evento lotado.

### Erros comuns

- **Compara datas como texto**: converta para `Date` ou timestamp
- **Evento termina agora e aceita inscrição**: defina o uso de `<=`
- **Vagas negativas**: centralize o cálculo
- **Capacidade igual ao total é rejeitada**: somente valor menor deve falhar
- **Concorrência é ignorada**: registre a limitação no README

### Critérios de conclusão

- [ ] vagas nunca aparecem negativas
- [ ] lotado, cancelado e encerrado bloqueiam inscrição
- [ ] capacidade menor que inscritos é rejeitada
- [ ] funções de data e vagas possuem testes
- [ ] limitação concorrente está documentada

### Entrega do dia

Commit sugerido: `feat: controlar vagas e estado dos eventos`.

## Dia 18 — Testes automatizados

### Resultado esperado

Uma suíte pequena protege regras de maior risco.

### Conceitos

- teste unitário: função isolada;
- teste de integração: partes trabalhando juntas;
- cenário feliz e cenário negativo;
- arrange, act, assert: preparar, agir, verificar.

### Primeiro exemplo simples

```ts
import { describe, expect, it } from "vitest";

describe("vagas restantes", () => {
  it("retorna zero quando evento está cheio", () => {
    const remaining = 10 - 10;

    expect(remaining).toBe(0);
  });
});
```

O exemplo é pequeno para ensinar a estrutura:

```text
Preparar → executar → verificar
```

### Testes obrigatórios

- cadastro válido;
- e-mail duplicado;
- login com senha errada;
- rota protegida sem sessão;
- usuário A edita evento de usuário B;
- inscrição duplicada;
- inscrição em evento lotado;
- inscrição em evento cancelado;
- redução de capacidade inválida.

### Passo a passo

1. Instalar Vitest e Supertest.
2. Criar banco exclusivo para testes.
3. Criar helpers para usuário e evento.
4. Escrever teste que falha.
5. Corrigir ou implementar regra.
6. Rodar toda suíte.

### Regra de ouro

Testar comportamento observável, não detalhes internos: “retorna 403” é melhor do que “chamou função X”.

### Evolua do exemplo para código real

O primeiro exemplo ensina sintaxe. O teste útil importa a função de produção:

```ts
import { describe, expect, it } from "vitest";
import { remainingSeats } from "./event-rules";

describe("remainingSeats", () => {
  it("returns zero when event is full", () => {
    expect(remainingSeats(10, 10)).toBe(0);
  });

  it("never returns a negative value", () => {
    expect(remainingSeats(10, 12)).toBe(0);
  });
});
```

### Primeiro endpoint com Supertest

```ts
import request from "supertest";
import { expect, it } from "vitest";
import { app } from "../src/app";

it("returns API health", async () => {
  const response = await request(app).get("/health");

  expect(response.status).toBe(200);
  expect(response.body).toEqual({ status: "ok" });
});
```

Separar `app.ts` de `server.ts` permite testar a aplicação sem abrir a porta 3000.

### Banco exclusivo para testes

Configure uma URL SQLite separada e limpe seu estado entre cenários. Nunca aponte testes destrutivos para o banco de desenvolvimento.

### Ciclo de trabalho

```text
vermelho   escreva teste e confirme falha
verde      faça a menor mudança para passar
refatorar  melhore o código mantendo o teste verde
```

### Erros comuns

- **Teste passa sem proteger a regra**: quebre a regra e confirme a falha
- **Testes dependem da ordem**: prepare dados em cada teste
- **Banco de desenvolvimento é apagado**: separe `DATABASE_URL`
- **Login perde cookie**: use agente persistente do Supertest
- **Vitest não verifica tipos**: execute também typecheck

### Critérios de conclusão

- [ ] funções de vagas e datas têm testes
- [ ] `/health` possui teste de integração
- [ ] regras críticas têm cenários negativos
- [ ] testes funcionam em qualquer ordem
- [ ] banco de desenvolvimento permanece intacto

### Entrega do dia

Commit sugerido: `test: proteger regras críticas da API`.

## Dia 19 — Qualidade, segurança e README

### Resultado esperado

O projeto pode ser instalado por outra pessoa e não expõe segredos óbvios.

### Passo a passo

1. Rodar typecheck, lint, testes e build.
2. Corrigir erros relevantes.
3. Conferir `.env` fora do Git.
4. Criar `.env.example` sem segredo real.
5. Conferir que hash e token não aparecem em resposta ou log.
6. Conferir CORS com origem específica, não `*` quando usa cookies.
7. Revisar carregamento, erro, vazio e sucesso no frontend.
8. Escrever README completo.
9. Atualizar diagrama de arquitetura e banco.
10. Instalar do zero seguindo apenas README.

### README mínimo

```text
O que é o projeto
Tecnologias
Pré-requisitos
Instalação
Variáveis de ambiente
Banco e migrations
Como testar
Funcionalidades
Limitações e próximos passos
```

### Scripts esperados

Cada pacote deve oferecer comandos fáceis de encontrar:

```text
npm run dev        desenvolvimento
npm run typecheck  verificação TypeScript
npm run test       testes
npm run build      build de produção
npm run lint       análise estática, quando configurada
```

### Checklist de segurança

- [ ] `.env` está ignorado
- [ ] `.env.example` não possui segredo real
- [ ] senha usa Argon2id
- [ ] respostas não incluem `passwordHash`
- [ ] JWT expira
- [ ] cookie é HttpOnly
- [ ] CORS aceita uma origem conhecida
- [ ] API verifica propriedade do evento
- [ ] bodies passam por validação
- [ ] erros não devolvem stack trace

### Teste de instalação limpa

1. obtenha o repositório em outra pasta
2. instale dependências em `web` e `api`
3. crie `.env` a partir do exemplo
4. aplique migrations
5. execute seed, se documentado
6. inicie API e frontend
7. complete cadastro, login e criação de evento

Qualquer passo que dependa de instrução verbal representa uma lacuna no README.

### Erros comuns

- **Build falha enquanto dev funciona**: leia erros de tipo e imports
- **README depende de memória**: execute os comandos escritos
- **Segredo entrou no histórico**: rotacione o segredo e peça ajuda antes de reescrever Git
- **Ajuste visual consome o dia**: priorize fluxo, clareza e segurança

### Critérios de conclusão

- [ ] typecheck, testes e build passam
- [ ] instalação limpa funciona
- [ ] README não depende de instruções verbais
- [ ] checklist de segurança foi revisado
- [ ] limitações estão explícitas

### Entrega do dia

Commit sugerido: `docs: preparar projeto para demonstração`.

## Dia 20 — Demonstração e retrospectiva

### Resultado esperado

Uma apresentação de 10 minutos e uma visão clara dos próximos passos.

### Roteiro da demonstração

1. Mostrar listagem de eventos.
2. Criar conta e fazer login.
3. Criar evento.
4. Mostrar “Meus eventos”.
5. Entrar com uma segunda conta.
6. Inscrever-se no evento.
7. Mostrar vagas e participantes.
8. Tentar ação proibida: edição por terceiro ou inscrição duplicada.
9. Mostrar teste da regra.
10. Desenhar o fluxo React → API → Banco.

### Perguntas finais

- O que acontece após clicar em “Criar evento”?
- Por que React não acessa SQLite diretamente?
- O que é endpoint?
- Qual diferença entre `401` e `403`?
- Qual diferença entre autenticação e autorização?
- Por que senha não é texto puro?
- O que JWT prova e o que ele não esconde?
- Onde fica a regra de não duplicar inscrição?
- Qual foi o erro mais difícil e como ele foi investigado?

### Retrospectiva

```text
O que eu sabia antes:

O que agora consigo fazer sem ajuda:

O que ainda está confuso:

Meu erro mais instrutivo:

Uma decisão que mudaria:

Próxima tecnologia que quero estudar:
```

### Ensaio técnico

Faça o primeiro ensaio com cronômetro. Não interrompa para corrigir código. Registre os pontos em que a explicação ficou confusa e corrija apenas bloqueios que afetam a demonstração.

### Rubrica de avaliação

| Dimensão | Evidência esperada |
|---|---|
| React | explica componente, prop, estado e rota |
| HTTP | explica endpoint, método, body e status |
| Arquitetura | localiza route, controller, service e Prisma |
| Banco | explica chave primária, estrangeira e inscrição |
| Segurança | diferencia hash, JWT, autenticação e autorização |
| Testes | mostra um teste falhando ao quebrar a regra |
| Autonomia | descreve como investigou um erro real |

### Plano de recuperação

Se alguma funcionalidade não estiver pronta, preserve um fluxo vertical funcionando. Use esta prioridade:

1. listar eventos
2. cadastrar e autenticar
3. criar evento autenticado
4. inscrever-se
5. bloquear duplicidade e lotação
6. editar, cancelar e listar participantes

Não simule uma funcionalidade quebrada. Declare a limitação e mostre o fluxo que funciona.

### Critérios de conclusão

- [ ] demonstração dura até 10 minutos
- [ ] duas contas de demonstração estão preparadas
- [ ] a estudante explica um fluxo completo sem ler
- [ ] uma ação proibida é demonstrada
- [ ] um teste automatizado é mostrado
- [ ] retrospectiva está preenchida

### Entrega final

Tag ou release sugerida: `v1.0.0-course`.

# Regras do MVP

## Endpoints finais

```text
POST   /auth/register
POST   /auth/login
POST   /auth/logout
GET    /auth/me

GET    /events
GET    /events/:eventId
POST   /events
PATCH  /events/:eventId
POST   /events/:eventId/cancel
GET    /me/events

POST   /events/:eventId/enrollments
DELETE /events/:eventId/enrollments/me
GET    /events/:eventId/enrollments
GET    /me/enrollments
```

## Regras que não podem falhar

- senha não é salva nem devolvida em texto puro;
- visitante não cria evento nem inscrição;
- usuário só altera os próprios eventos;
- evento cancelado ou encerrado não recebe inscrição;
- inscrição duplicada é proibida;
- evento lotado não recebe inscrição;
- capacidade não reduz abaixo de inscritos;
- segredo JWT não vai para Git;
- interface trata carregamento, erro e lista vazia.

## Referências

- [React Learn](https://react.dev/learn)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Vite](https://vite.dev/guide/)
- [React Router](https://reactrouter.com/start/declarative/routing)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui para Vite](https://ui.shadcn.com/docs/installation/vite)
- [Express](https://expressjs.com/en/starter/installing/)
- [Prisma + SQLite](https://docs.prisma.io/docs/prisma-orm/quickstart/sqlite)
- [Zod](https://zod.dev/)
- [jose](https://github.com/panva/jose)
- [OWASP Password Storage](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html)
- [Vitest](https://vitest.dev/guide/)
- [Supertest](https://github.com/ladjs/supertest)

## Definição de sucesso

O projeto estará pronto quando os fluxos do MVP funcionarem e a estudante conseguir explicar seu funcionamento. O resultado mais importante não é o site: é a capacidade de dividir um problema, pesquisar, construir uma primeira versão, testar, ler erros e melhorar a solução.
