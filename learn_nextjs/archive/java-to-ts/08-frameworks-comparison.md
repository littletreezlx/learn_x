# Spring Boot与Next.js框架对比

本文档对比Spring Boot和Next.js的架构理念、功能特性和使用模式，帮助Java开发者理解两者的异同并快速适应Next.js开发。

## 架构理念对比

| 特性 | Spring Boot | Next.js |
|------|-------------|---------|
| **架构模式** | 三层架构（表示层、业务层、数据访问层） | React组件树 + API Routes |
| **开发范式** | 面向对象、依赖注入 | 函数式、组件化、hooks |
| **状态管理** | 无状态应用服务器，状态存储在数据库 | 客户端状态+服务端状态分离 |
| **请求处理** | Servlet处理HTTP请求，同步或异步 | 服务端组件、API Routes处理请求 |
| **部署模型** | 传统应用服务器部署，打包为WAR/JAR | 静态生成+边缘函数、Serverless |

## 核心概念映射

### 应用入口

**Spring Boot**:
```java
@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }
}
```

**Next.js**:
```typescript
// next.config.js - 配置文件
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;

// 入口由框架隐式管理，无需显式定义main函数
```

### 路由处理

**Spring Boot**:
```java
@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    
    // 构造函数注入
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.findById(id);
        return ResponseEntity.ok(user);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO userDTO) {
        User user = userService.create(userDTO);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }
}
```

**Next.js**:
```typescript
// 页面路由 - app/users/[id]/page.tsx
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  return (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

// API路由 - app/api/users/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const users = await getUsers();
  return NextResponse.json(users);
}

export async function POST(request: NextRequest) {
  const userData = await request.json();
  const newUser = await createUser(userData);
  return NextResponse.json(newUser, { status: 201 });
}
```

### 数据访问层

**Spring Boot**:
```java
// 实体类
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    // Getters, setters, etc.
}

// 数据访问接口
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByNameContaining(String name);
    
    Optional<User> findByEmail(String email);
    
    @Query("SELECT u FROM User u WHERE u.lastLoginDate > :date")
    List<User> findRecentlyActiveUsers(@Param("date") LocalDateTime date);
}
```

**Next.js** (使用Prisma ORM):
```typescript
// Prisma模型定义 - prisma/schema.prisma
model User {
  id      Int     @id @default(autoincrement())
  name    String
  email   String  @unique
  posts   Post[]
}

model Post {
  id        Int     @id @default(autoincrement())
  title     String
  content   String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
}

// 数据访问代码 - lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

// 查询示例 - lib/users.ts
import prisma from './prisma';

export async function getUser(id: string) {
  return prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: { posts: true }
  });
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function createUser(data: { name: string; email: string }) {
  return prisma.user.create({ data });
}
```

### 业务逻辑层

**Spring Boot**:
```java
// 服务接口
public interface UserService {
    User findById(Long id);
    List<User> findAll();
    User create(UserDTO userDTO);
    User update(Long id, UserDTO userDTO);
    void delete(Long id);
}

// 服务实现
@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    // 构造函数注入
    public UserServiceImpl(UserRepository userRepository, 
                           PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public User findById(Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }
    
    @Override
    public User create(UserDTO userDTO) {
        // 业务逻辑
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new BusinessException("Email already registered");
        }
        
        User user = new User();
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        
        return userRepository.save(user);
    }
    
    // 其他方法实现...
}
```

**Next.js**:
```typescript
// 服务逻辑 - lib/services/userService.ts
import prisma from '../prisma';
import { hashPassword } from '../auth';
import { User, UserCreateInput } from '../types';

export class UserNotFoundException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UserNotFoundException';
  }
}

export async function findUserById(id: string): Promise<User> {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) }
  });
  
  if (!user) {
    throw new UserNotFoundException(`User with ID ${id} not found`);
  }
  
  return user;
}

export async function createUser(data: UserCreateInput): Promise<User> {
  // 业务逻辑
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email }
  });
  
  if (existingUser) {
    throw new Error('Email already registered');
  }
  
  const hashedPassword = await hashPassword(data.password);
  
  return prisma.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  });
}
```

## 数据校验

**Spring Boot**:
```java
// DTO类
public class UserDTO {
    @NotBlank(message = "Name is required")
    private String name;
    
    @Email(message = "Email should be valid")
    @NotBlank(message = "Email is required")
    private String email;
    
    @Size(min = 6, message = "Password must be at least 6 characters")
    private String password;
    
    // Getters, setters, etc.
}

// 控制器中使用校验
@PostMapping
public ResponseEntity<User> createUser(@Valid @RequestBody UserDTO userDTO) {
    User user = userService.create(userDTO);
    return new ResponseEntity<>(user, HttpStatus.CREATED);
}
```

**Next.js** (使用Zod库):
```typescript
// 验证schema - lib/validations/user.ts
import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Email should be valid" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

export type UserCreateInput = z.infer<typeof userSchema>;

// API路由中使用验证
import { userSchema } from '@/lib/validations/user';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // 验证输入数据
    const validatedData = userSchema.parse(data);
    
    // 处理通过验证的数据
    const newUser = await createUser(validatedData);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // 处理验证错误
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

## 认证与授权

**Spring Boot** (Spring Security):
```java
@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    
    private final UserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;
    
    // 注入依赖
    public SecurityConfig(UserDetailsService userDetailsService,
                          JwtTokenProvider jwtTokenProvider) {
        this.userDetailsService = userDetailsService;
        this.jwtTokenProvider = jwtTokenProvider;
    }
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .authorizeRequests()
                .antMatchers("/api/auth/**").permitAll()
                .antMatchers("/api/users/**").hasRole("ADMIN")
                .anyRequest().authenticated()
            .and()
            .apply(new JwtConfigurer(jwtTokenProvider));
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder());
    }
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
```

**Next.js** (NextAuth.js):
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '@/lib/auth';
import prisma from '@/lib/prisma';

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        
        if (!user) {
          throw new Error('No user found');
        }
        
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        
        if (!isValid) {
          throw new Error('Invalid password');
        }
        
        return { id: user.id, name: user.name, email: user.email };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
});

export { handler as GET, handler as POST };

// 使用中间件保护路由
// middleware.ts
import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAdmin = token?.role === 'ADMIN';
    
    if (req.nextUrl.pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/auth/unauthorized', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
);

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
};
```

## 环境配置管理

**Spring Boot**:
```yaml
# application.properties 或 application.yml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/myapp
    username: ${DB_USER}
    password: ${DB_PASSWORD}
  jpa:
    hibernate:
      ddl-auto: update
  
server:
  port: 8080
  
jwt:
  secret: ${JWT_SECRET}
  expiration: 86400000  # 1天的毫秒数
```

**Next.js**:
```
# .env.local
DATABASE_URL="postgresql://user:password@localhost:5432/myapp"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# 在代码中访问
process.env.DATABASE_URL
```

## 总结：思维模式转变

### 服务端到全栈思维

1. **Spring Boot**: 严格的后端服务，专注于API和业务逻辑，前后端分离
2. **Next.js**: 全栈框架，服务端组件和客户端组件混合，统一项目

### 请求处理流程对比

1. **Spring Boot**: 
   - 请求 → Servlet → Filter → Controller → Service → Repository → 数据库
   - 数据库 → Repository → Service → Controller → 响应

2. **Next.js**: 
   - 页面请求 → 服务端组件获取数据 → 渲染HTML → 客户端激活React组件
   - API请求 → Route Handler → 服务层 → 数据库访问 → 响应JSON

### Java开发者适应Next.js的建议

1. **拥抱函数式思维**：习惯使用函数而非类来组织代码
2. **理解React组件模型**：区分服务端组件和客户端组件
3. **适应TypeScript的类型系统**：习惯结构类型而非名义类型
4. **掌握异步编程模式**：熟悉Promise和async/await
5. **适应声明式UI开发**：习惯JSX和组件化开发 