# TodoApp
Você pode ler a documentação do projeto aqui no README ou em [PDF](https://github.com/AngeloArtur/todoApp/blob/main/documentation/Documentation.pdf)
## Introdução
Este projeto é uma aplicação de lista de tarefas que implementa as operações básicas de Create, Read, Update e Delete (CRUD). O objetivo principal é permitir que os usuários gerenciem suas tarefas categorizando-as em diferentes estados de progresso.

## Funcionalidades
Na tela principal o usuário irá observar três templates onde ficam as tarefas, sendo elas: to-do, in-progress, done, em cada uma delas é possível realizar as quatro operações

Além disso existem validações para o cadastro das tarefas, são elas: Preencher todos os input, colocar como data mínima o dia atual, qualquer data antes não será possível criar a tarefa, assim mostrando uma mensagem de erro.

Para operações de exclusão e atualização de tarefas, basta clicar nos três pontos no canto superior direito da tarefa. Isso abrirá uma caixa de diálogo com informações sobre a tarefa relevante e a opção de excluir e modificar seu valor (delete e update). A atualização possui as mesmas validações da criação da tarefa e a exclusão de uma tarefa requer a confirmação de que o usuário realmente deseja excluir a tarefa.

O projeto utiliza o firebase como um serviço back-end para persistir as informações então, independente do navegador ou dispositivo que execute a aplicação, os dados inseridos permanecerão lá.

## Requisitos
Para baixar o projeto e rodar ele localmente é necessário fazer primeiramente o clone do projeto na pasta que desejar e copiar o código abaixo.

```bash
git clone https://github.com/AngeloArtur/todoApp.git
```


Como o projeto foi criado utilizando o Angular (v17) também será necessária a sua instalação

```bash
npm install -g @angular/cli
```

Após baixar o Angular para verificar se ele foi instalado corretamente será necessário ir no terminal e verificar com essa linha de comando

```bash
ng version
```

Depois da verificação será necessário descompactar o projeto que foi baixado será preciso fazer a instalação dos node_modules

```bash
npm install
```
 
Finalizada essa etapa o projeto já está pronto para ser executado localmente no seu dispositivo, basta que execute este comando

```bash
ng s --open
```

Isso irá garantir que o seu projeto seja iniciado e já abra automaticamente no seu navegador, porém caso não abra basta ir até o http://localhost:4200/ assim você poderá testar completamente a aplicação

## Mais detalhes
O projeto utilizou como base na construção essa UX do [figma](https://www.figma.com/design/EByh5RA16ZvVxPXMxOAWWa/To-do-list-dashboard-(Freebie)-(Community)?node-id=1-592&t=zVIKH9i7OOhNCdcB-0).
</br>
O vídeo de apresentação dela pode ser visto [aqui](https://youtu.be/1VJ0wQU5gLM)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
