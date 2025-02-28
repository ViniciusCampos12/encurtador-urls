# Encurtador de URL

![Screenshot](https://github.com/user-attachments/assets/b53dd8f2-9698-4fa6-b126-703c4ecae5cb)

## Requisitos  

- Docker e Docker Compose instalados  
- Git

## ⚠️ Configuração do Arquivo `.env`  

Antes de iniciar a aplicação, copie todo o conteúdo do arquivo `.env.example` e cole em um novo arquivo chamado `.env`.  

🚨 **Atenção:** **Jamais** suba o arquivo `.env` para produção ou repositórios públicos. Isso é uma **prática incorreta** que pode expor dados sensíveis.  
Neste caso, o arquivo `.env.example` é disponibilizado apenas para fins de configuração local, onde não há riscos.  


### Passo a passo para executar a aplicação  

1. **Clone o repositório:**  

   ```sh
   git clone https://github.com/ViniciusCampos12/encurtador-urls.git
   ```

2. **Suba os containers da aplicação e do banco de dados:**  

   ```sh
   docker-compose up -d
   ```

3. **Acesse o terminal do container:**  

   ```sh
   docker exec -it api sh
   ```

4. **Execute as migrações do banco de dados:**  

   ```sh
   npx prisma migrate deploy && npx prisma generate
   ```

5. **Compile e inicie a aplicação:**  

   ```sh
   npm run build && npm run start:prod
   ```

Após concluir esses passos, a aplicação estará disponível em:  
👉 **[http://localhost:3333](http://localhost:3333)**  

---

# 📌 Documentação da API - Encurtador de URLs  

## 🔹 Introdução  
Esta API permite gerenciar usuários e URLs encurtadas. Algumas rotas requerem autenticação via **Bearer Token** no cabeçalho da requisição.  

---

## 🧑‍💻 **Usuários**  

### 📌 Criar Usuário  
**Endpoint:**  
```http
POST /api/users/register
```  
**Corpo da Requisição (JSON):**  
```json
{
    "name": "vinicius",
    "email": "email@example.com",
    "password": "123456"
}
```
**Descrição:** Registra um novo usuário no sistema.  

---

### 🔑 Login do Usuário  
**Endpoint:**  
```http
POST /api/users/login
```  
**Corpo da Requisição (x-www-form-urlencoded):**  
- `email`: email@example.com  
- `password`: 123456  

**Descrição:** Realiza login e retorna um **token JWT** para autenticação.  

---

### 📄 Listar URLs Encurtadas (Requer Autenticação)  
**Endpoint:**  
```http
GET /api/users/shortned-urls/list
```  
**Descrição:** Retorna a lista de URLs encurtadas do usuário autenticado.  
✅ **OBS:** Passar o **Bearer Token** no cabeçalho da requisição.  

---

### ✏️ Editar URL Encurtada (Requer Autenticação)  
**Endpoint:**  
```http
PUT /api/users/shortned-urls/{id}/edit
```  
**Corpo da Requisição (x-www-form-urlencoded):**  
- `originalEndpoint`: Nova URL original  

**Descrição:** Atualiza a URL original de um link encurtado.  
✅ **OBS:** Passar o **Bearer Token** no cabeçalho da requisição.  

---

### ❌ Deletar URL Encurtada (Requer Autenticação)  
**Endpoint:**  
```http
DELETE /api/users/shortned-urls/{id}/delete
```  
**Descrição:** Remove uma URL encurtada do sistema.  
✅ **OBS:** Passar o **Bearer Token** no cabeçalho da requisição.  

---

## 🔗 **URLs Encurtadas**  

### 🔽 Criar uma URL Encurtada (Autenticação Opcional)  
**Endpoint:**  
```http
POST /api/shortned-urls/shorten
```  
**Corpo da Requisição (x-www-form-urlencoded):**  
- `originalEndpoint`: URL que será encurtada  

**Descrição:** Gera um link encurtado para uma URL informada.  
✅ **OBS:** O envio do **Bearer Token** no cabeçalho da requisição é opcional. Se fornecido, ele será validado e deve ser um token válido. Caso contrário, o usuário ainda poderá encurtar a URL sem necessidade de autenticação.

---

## ⚡ Considerações  
- Todos os endpoints protegidos exigem **autenticação via Bearer Token**.    
- Utilize ferramentas como **Postman** ou **cURL** para testar os endpoints.  

🚀 **API pronta para encurtar suas URLs com segurança!**


## 🛠️ Pontos de Melhoria  

### 🔹 Implementação do NGINX como Load Balancer  
A integração do NGINX como balanceador de carga pode **melhorar a performance** da aplicação e **aumentar a segurança**, distribuindo as requisições de forma eficiente entre os servidores.  

### 🔹 Batch para Monitoramento de Cliques  
Ao manipular um campo numérico no banco de dados (como a contagem de cliques), é essencial garantir que as operações sejam **atômicas** — ou seja, cada transação deve ser concluída integralmente ou não ocorrer. A adoção de processamento em **batch** ajudaria a evitar inconsistências e problemas de concorrência, garantindo maior integridade dos dados.

### 🔹 Separação de Pastas por Domínio  
Em aplicações grandes, é essencial organizar os arquivos de acordo com suas **responsabilidades dentro de cada domínio**. Seguindo os princípios do **Clean Architecture** e **DDD (Domain-Driven Design)**, cada domínio deve ter sua própria pasta contendo seus respectivos arquivos, garantindo maior modularidade, escalabilidade e facilidade de manutenção do código.

