import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// IndusBank routes
app.get('/', (req, res) => {
  res.status(200).json({
    bank: 'IndusBank',
    message: 'Welcome to IndusBank Online Banking Portal API',
    status: 'ONLINE'
  });
});

app.get('/api/rates', (req, res) => {
  res.status(200).json({
    savings: '4.0%',
    fixedDeposit: '7.1%',
    homeLoan: '8.5%'
  });
});

// Avoid listening automatically if we are running in a test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`IndusBank Application running on port ${PORT}`);
  });
}

export default app;
