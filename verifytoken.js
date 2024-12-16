const jwt = require('jsonwebtoken');

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NTU0YzBiZDk3ZmQ1Y2VlNjRjNWY4MCIsImlhdCI6MTczMzY0MzUzNywiZXhwIjoxNzMzNjQ3MTM3fQ.-XsjQybMjDHiLMjVl5txmp_deJmlZOznApi_1xvr5uA";
const secret = "MySuperSecureSecretKey1234567890!";

try {
  const decoded = jwt.verify(token, secret);
  console.log("Token is valid:", decoded);
} catch (error) {
  console.error("Token is invalid:", error.message);
}
