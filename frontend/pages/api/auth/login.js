// Mock API endpoint for production
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, password } = req.body;

  // Mock authentication - in production, replace with real backend
  if (email && password) {
    const mockUser = {
      id: '1',
      name: 'Demo User',
      email: email,
      streak: 0,
      xpPoints: 0
    };

    const mockToken = 'mock_jwt_token_' + Date.now();

    res.status(200).json({
      token: mockToken,
      user: mockUser
    });
  } else {
    res.status(400).json({ message: 'Email and password are required' });
  }
}
