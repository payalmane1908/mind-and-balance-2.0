// Mock API endpoint for production
export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Mock user profile - in production, replace with real backend
  const mockUser = {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    streak: 5,
    xpPoints: 150
  };

  res.status(200).json(mockUser);
}
