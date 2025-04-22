const express = require('express');
const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('Express server is running');
});

app.get('/admin', (req, res) => {
  res.send('This would be the admin panel');
});

app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
}); 