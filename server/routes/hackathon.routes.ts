import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
  res.json({ message: 'Hackathon routes working!' });
});

export default router;