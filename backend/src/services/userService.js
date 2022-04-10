const bcrypt = require('bcrypt');
const generateToken = require('../auth/generateToken');

const User = require('../models/userModel');

const getPasswdHash = (passwd) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(passwd, salt);
};

const comparePasswdHash = (reqPasswd, dbPasswd) => {
  return bcrypt.compareSync(reqPasswd, dbPasswd);
};

// ====================== //

const save = async (newUser) => {
  const result = await User.find({ email: newUser.email });
  if (result.length > 0) throw new Error('Email já cadastrado');

  newUser.password = getPasswdHash(newUser.password);
  return await User.save(newUser);
};

const session = async (credentials) => {
  return User.find({
    email: credentials.email,
  }).then(([session]) => {
    if (!session || !comparePasswdHash(credentials.password, session.password))
      throw new Error('Usuário ou senha incorreto');

    const { password: _, ...userData } = session;

    userData.token = generateToken(userData);
    return userData;
  });
};

module.exports = {
  save,
  session,
};
