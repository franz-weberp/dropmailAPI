
# Dropmail.me Challenge - Franz Weber Pimentel (DEMO: https://deft-chimera-9b851b.netlify.app/)
>  This is a challenge by [Coodesh](https://coodesh.com/)
## Briefing
Sites e serviços online geralmente exigem um endereço de e-mail válido para registrar, acessar ou receber conteúdo protegido, etc. No entanto, o problema é que alguns desses sites podem usar nossos endereços de e-mail para enviar mensagens indesejadas. As pessoas não querem se preocupar mais com spam, propagandas no email, hackers e ataques de robôs.
Uma boa maneira de lidar com isso é usar um endereço de e-mail temporário se você não tiver certeza de que este site é absolutamente confiável e confiável. Dessa forma, você pode manter seus e-mails longe de spam e proteger sua privacidade. Sua tarefa para esse case será desenvolver uma aplicação que consuma uma API de email temporário para que os usuários possam utilizar serviços sem expor seu email real, seguindo os requisitos propostos neste desafio.
## Instalar
```sh
npm install
npm run build && npm run dev
```
> Caso necessario click em: [https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo) para habilitar o proxy

## Stack
1. VueJS + Vite
2. Boostrap
3. Docker
4. API: https://dropmail.me/api/
5. Proxy: [https://cors-anywhere.herokuapp.com](https://cors-anywhere.herokuapp.com)

Para obter os dados, utilizaremos a API do DropMail. Observe que a comunicação é realizada utilizando [GraphQL](https://graphql.org/), enviando todas as requisições para o endereço https://dropmail.me/api/graphql/MY_TOKEN (HTTP).
> Nota: Utilizando o [https://cors-anywhere.herokuapp.com](https://cors-anywhere.herokuapp.com) devido a problema com o cors
## Tarefas
- :ballot_box_with_check: **Obrigatório 1 -** Você deverá atender aos seguintes casos de uso:
- :ballot_box_with_check: **1.1** Como usuário, posso gerar um endereço de email temporário;
- :ballot_box_with_check: **1.2**- Como usuário, posso copiar o endereço de email gerado;
- :ballot_box_with_check: **1.3**- Como usuário, posso visualizar a caixa de entrada deste email;

- :ballot_box_with_check: **Obrigatório 2 -** Para capturar a chegada de novos emails, você deve verificar a caixa de mensagens a cada 15 segundos.

- :ballot_box_with_check: **Obrigatório 3 -** Adicione um novo botão chamado "Receber notificações". Este botão irá ativar a notificações na área de trabalho quando chegar um novo email, caso a tab não esteja em foco.
- :ballot_box_with_check: **3.1** - Caso o usuário não aceite, o botão deve permitir que, se clicado, abra novamente a mensagem para liberar este recurso do navegador.

- :ballot_box_with_check: **Obrigatório 4 -** Seguir a base do [mockup](assets/desktop.png) (estilização ao seu critério)
- :ballot_box_with_check: **Obrigatório 5 -** Salve os dados de acesso ao email no localstorage ou sessionstorage, para que a conta não seja perdida ao atualizar a página. Caso o email tenha expirado, é necessário remover esse registro do storage.
## Extras
Além do desafio proposto temos alguns diferenciais:
- **Diferencial 1 -** Escrever Unit Tests ou E2E Test. Escolher a melhor abordagem e biblioteca;
- :ballot_box_with_check: **Diferencial 2 -** Configurar Docker no Projeto para facilitar o Deploy da equipe de DevOps;
- :ballot_box_with_check: **Diferencial 3 -** Publique o projeto em alguma plataforma, como por exemplo a [Vercel](https://vercel.com/), [Netlify](https://www.netlify.com/) ou outra de sua preferência.

## Tela para Desktop
![Desktop Dark](https://lab.coodesh.com/fweberpimentel/dropmail-franz/-/raw/main/src/assets/demo/dark-desktop-demo.png)
![Desktop Light](https://lab.coodesh.com/fweberpimentel/dropmail-franz/-/raw/main/src/assets/demo/light-desktop-demo.png)
## Tela para Mobile
![Mobile Dark](https://lab.coodesh.com/fweberpimentel/dropmail-franz/-/raw/main/src/assets/demo/dark-mobile-demo.png)
![Mobile Light](https://lab.coodesh.com/fweberpimentel/dropmail-franz/-/raw/main/src/assets/demo/light-mobile-demo.png)

## API
Para obter os dados, utilizaremos a API do DropMail. Observe que a comunicação é realizada utilizando GraphQL, enviando todas as requisições para o endereço https://dropmail.me/api/graphql/MY_TOKEN (HTTP).
> Nota: Utilizando o https://cors-anywhere.herokuapp.com devido a problema com o cors