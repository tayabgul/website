const bcrypt = require('bcryptjs');

const hashedPassword = '$2a$10$q9eiyJlpb7YOGnJIJXOmKe6g9BNp9zMWkjE8kBomdsrmUY93kR8fi';
const passwordToTest = 'password123'; // Replace this with the password you want to test

bcrypt.compare(passwordToTest, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error('Error comparing passwords:', err);
  } else {
    console.log('Password comparison result:', isMatch);
  }
});