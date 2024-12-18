import jwt from 'jsonwebtoken'
import Error from 'next/error'

const SECRET = process.env.JWT_SECRET

function generateToken(user) {
  return jwt.sign({ name: user.name, email: user.email }, SECRET)
}

export function readToken(token) {
  try {
    return jwt.verify(token, SECRET)
  } catch (err) {
    throw new Error('token invalido')
  }
}
 
export function  cadastro(body) {
  

  const token =  generateToken(body)
  
  

  return token
}

export function login(token) {
  const tokenJson =JSON.parse(token)
  const loginJson = JSON.parse(tokenJson.login)

  
  
    if (!tokenJson.token) {
      throw new Error('Token não fornecido');
    }
  
    try {
      // Decodifica o payload do JWT (sem validar)
      const decoded = jwt.decode(tokenJson.token);
      console.log('Payload do token:', decoded);
  
      // (Opcional) Valida o token com a chave secreta
      const secretKey = process.env.JWT_SECRET;
      const verified = jwt.verify(tokenJson.token, secretKey);
      console.log('Token validado:', verified);
      console.log();
     
    return verified;
    
    } catch (error) {
      console.error('Erro ao processar o token:', error.message);
      throw new Error('Token inválido');
    }
  }

