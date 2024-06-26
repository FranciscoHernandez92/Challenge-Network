import { type PrismaClient } from '@prisma/client';
import { UserSqlRepository } from './users.repo';
import { HttpError } from '../../middlewares/errors.middlewares';
import { type UserCreateDto } from '../../entities/users.entities';

const mockPrisma = {
  user: {
    findMany: jest.fn().mockResolvedValue([]),
    findUnique: jest.fn().mockResolvedValue({}),
    create: jest.fn().mockResolvedValue({}),
    update: jest.fn().mockResolvedValue({}),
    delete: jest.fn().mockResolvedValue({}),
  },
} as unknown as PrismaClient;

describe('Given a instance of the class UserSqlRepository', () => {
  const repo = new UserSqlRepository(mockPrisma);
  test('then it should be a instance of the class ', () => {
    expect(repo).toBeInstanceOf(UserSqlRepository);
  });
  describe('When we use the method readAll', () => {
    test('Then it should call prisma.findMany', async () => {
      const result = await repo.readAll();
      expect(mockPrisma.user.findMany).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });

  describe('When we use the method readById with a valid ID', () => {
    test('Then it should call prisma.findUnique', async () => {
      const result = await repo.readById('1');
      expect(mockPrisma.user.findUnique).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('When we use the method readById with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.readById('1')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'User 1 not found')
      );
    });
  });
  describe('When we use the method create', () => {
    test('Then it should call prisma.create', async () => {
      const data = {} as unknown as UserCreateDto;
      const result = await repo.create(data);

      expect(result).toEqual({});
      expect(mockPrisma.user.create).toHaveBeenCalled();
    });
  });
  describe('When we use the method update with a valid ID', () => {
    test('Then it should call prisma.update', async () => {
      const result = await repo.update('1', {
        name: 'title',
        birthDate: new Date(1996, 0, 1),
        email: 'email@email.com',
        password: 'password',
      });
      expect(mockPrisma.user.update).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('When we use the method update with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.update('1', {} as UserCreateDto)).rejects.toThrow(
        new HttpError(404, 'Not Found', 'User 1 not found')
      );
    });
  });
  describe('When we use the method delete with valid id', () => {
    test('Then it should call prisma.delete', async () => {
      const result = await repo.delete('1');
      expect(mockPrisma.user.delete).toHaveBeenCalled();
      expect(result).toEqual({});
    });
  });

  describe('When we use the method delete with an invalid id', () => {
    test('Then it should throw an error', async () => {
      (mockPrisma.user.findUnique as jest.Mock).mockResolvedValueOnce(null);
      await expect(repo.delete('1')).rejects.toThrow(
        new HttpError(404, 'Not Found', 'User 1 not found')
      );
    });
  });
});
