# Documentação de Padrões de Nomenclatura e Boas Práticas em Projetos NestJS

## 1. **Nomes de Variáveis**

### 1.1. **Variáveis locais**

- Use o formato `camelCase`.
- Nomes devem ser descritivos, mas concisos.
- Evite abreviações, a menos que sejam amplamente reconhecidas.

**Exemplo:**

```typescript
const userId = 123;
const productName = 'Produto';
```

### 1.2. **Constantes globais**

- Use `UPPER_CASE` com palavras separadas por `_`.

**Exemplo:**

```typescript
const MAX_USERS = 100;
const API_URL = 'https://api.exemplo.com';
```

### 1.3. **Parâmetros de Função**

- Use `camelCase`.

**Exemplo:**

```typescript
function createUser(userName: string, userEmail: string) {
  // lógica
}
```

## 2. **Nomes de Classes e Interfaces**

- Use o formato `PascalCase`.
- Nomes de classes devem ser substantivos.
- Interfaces devem começar com a letra `I`.

**Exemplo:**

```typescript
export class UserService {}
export interface IUser {
  id: number;
  name: string;
}
```

## 3. **Nomes de Métodos e Funções**

- Use `camelCase`.
- Métodos devem começar com um verbo para indicar ação.

**Exemplo:**

```typescript
getUserById(id: number): User {}
createNewUser(user: IUser): void {}
```

## 4. **Nomes de Arquivos**

- Use o formato `kebab-case`.
- Arquivos de módulos devem terminar com `.module.ts`.
- Arquivos de serviços devem terminar com `.service.ts`.
- Arquivos de controladores devem terminar com `.controller.ts`.
- Outros arquivos devem refletir seu propósito e contexto.

**Exemplo:**

```
user.module.ts
user.service.ts
user.controller.ts
user.entity.ts
```

## 5. **Nomes de Diretórios**

- Use o formato `kebab-case`.
- Estruture o projeto de forma modular.

**Exemplo:**

```
src/
  auth/
    auth.module.ts
    auth.service.ts
    auth.controller.ts
  user/
    user.module.ts
    user.service.ts
    user.controller.ts
```

## 6. **Commits**

### 6.1. **Formato do Commit**

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(scope): mensagem
```

- **tipos:**
  - `feat`: Nova funcionalidade.
  - `fix`: Correção de bug.
  - `docs`: Alterações na documentação.
  - `style`: Mudanças de estilo (formatação, etc.).
  - `refactor`: Refatoração de código sem mudança de funcionalidade.
  - `test`: Adição ou atualização de testes.
  - `chore`: Alterações em configurações ou dependências.

**Exemplo:**

```
feat(user): adicionar funcionalidade de login
fix(auth): corrigir validação de tokens
```

### 6.2. **Boas práticas de commits**

- Commits devem ser pequenos e objetivos.
- A mensagem deve descrever o que foi feito e por quê (se necessário).

**Exemplo:**

```
fix(user): corrigir erro de validação ao criar usuário

A validação do campo "email" estava permitindo valores duplicados.
```

## 7. **Padrões de Código**

- Siga as práticas recomendadas do **TypeScript** e **NestJS**.
- Utilize **ESLint** para padronizar o código.
- Utilize **Prettier** para formatação automática.

**Configuração sugerida do ESLint:**

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ]
}
```

**Configuração sugerida do Prettier:**

```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all"
}
```

## 8. **Outras Convenções**

### 8.1. **Injeção de Dependências**

- Use o decorador `@Injectable()` em serviços.

**Exemplo:**

```typescript
@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
}
```

### 8.2. **Tratamento de Erros**

- Utilize filtros de exceção personalizados para erros comuns.

**Exemplo:**

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      message: exception.message,
    });
  }
}
```

### 8.3. **Validação**

- Utilize o **class-validator** para validar DTOs.

**Exemplo:**

```typescript
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;
}
```

### 8.4. **Testes**

- Escreva testes unitários para serviços e controladores.
- Nomeie arquivos de teste com `.spec.ts`.

**Exemplo:**

```
user.service.spec.ts
user.controller.spec.ts
```

---

Seguindo esses padrões, você terá um código mais organizado, fácil de manter e colaborativo. Boa codificação!
