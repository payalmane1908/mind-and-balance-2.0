// Mock API endpoint for production
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  // Mock authentication - in production, replace with real backend
  if (name && email && password) {
    const mockUser = {
      id: '1',
      name: name,
      email: email,
      streak: 0,
      xpPoints: 0
    };

    const mockToken = 'mock_jwt_token_' + Date.now();

    res.status(201).json({
      token: mockToken,
      user: mockUser
    });
  } else {
    res.status(400).json({ message: 'Name, email and password are required' });
  }
}
