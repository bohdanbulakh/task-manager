import { Test } from '@nestjs/testing';
import { PrismaService } from '../../../database/prisma.service';
import { AuthService } from '../auth.service';
import { faker } from '@faker-js/faker';
import { User } from '@prisma/client';
import { AppModule } from '../../../app.module';


describe('AuthService', () => {
  let prisma: PrismaService;
  let authService: AuthService;
  let testUser: User;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    prisma = module.get(PrismaService);
    authService = module.get(AuthService);

    testUser = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        password: faker.internet.password(),
        name: faker.person.firstName(),
      },
    });
  });

  describe('getTokens', () => {
    it('should return tokens pair and create new session in database', async () => {
      const result = await authService.getTokens(testUser);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();

      const session = await prisma.session.findUnique({
        where: {
          token: result.refreshToken,
          userId: testUser.id,
        },
      });

      expect(session).toBeDefined();
    });
  });
});
