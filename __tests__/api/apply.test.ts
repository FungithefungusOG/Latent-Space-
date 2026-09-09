/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { POST } from '@/app/api/apply/route';
import { prismaMock } from '../../jest.setup';

describe('POST /api/apply', () => {
  it('returns 400 if required fields are missing', async () => {
    const req = new NextRequest('http://localhost/api/apply', {
      method: 'POST',
      body: JSON.stringify({ name: 'Test' }),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(400);
    expect(json.error).toBe('All fields are required.');
  });

  it('returns 201 on successful database insertion', async () => {
    const mockData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      aiUsage: 'builder',
      why: 'Because AI is cool',
    };

    // Mock Prisma returning a created record
    prismaMock.waitlistApplication.create.mockResolvedValue({
      id: 'clk123',
      ...mockData,
      createdAt: new Date(),
    });

    const req = new NextRequest('http://localhost/api/apply', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(201);
    expect(json.success).toBe(true);
    expect(json.id).toBe('clk123');
    expect(prismaMock.waitlistApplication.create).toHaveBeenCalledWith({
      data: mockData,
    });
  });

  it('returns 409 when Prisma throws a Unique Constraint error', async () => {
    const mockData = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '1234567890',
      linkedinUrl: 'https://linkedin.com/in/johndoe',
      aiUsage: 'builder',
      why: 'Because AI is cool',
    };

    // Create a mock error with the exact message expected in the route
    const mockError = new Error('Unique constraint failed');
    prismaMock.waitlistApplication.create.mockRejectedValue(mockError);

    const req = new NextRequest('http://localhost/api/apply', {
      method: 'POST',
      body: JSON.stringify(mockData),
    });

    const res = await POST(req);
    const json = await res.json();

    expect(res.status).toBe(409);
    expect(json.error).toBe('This email has already applied.');
  });
});
