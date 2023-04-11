const { getUser, updateUser, isAdmin, updatePass } = require("../data/systemUser");
const { createAuth, checkToken } = require("../lib/auth");
const { sendMail } = require("../lib/mail");


const createReset = async (pgConn, mail) => {
  let user = await getUser(pgConn, { mail })
  if (!user) throw 'E-mail informado não existe.';
  
  delete user.password;


  await sendMail(
    mail,
    'Recuperação de Senha',
    `
      <html>
      <body style="max-width: 100vw;
        min-height: 100vh;
        font-family: 'Poppins', sans-serif;">
        <p style="margin: 0; font-size: 18px; font-weight: 500;">Esqueceu sua senha?</p>
        <p style="margin: 0; font-size: 17px;">Recebemos uma solicitação para redefinir a senha da sua conta.</p>
        <br>
        <p style="margin: 0; font-size: 17px;">Para redefinir sua senha, clique no botão abaixo.</p>
        <br>
        <span style="background: #1976d2;
          padding: 10px;
          border-radius: 5px;
          box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;">
          <a style="color: #fff;
          text-decoration: none;
          font-size: 17px;" 
          href='http://lais.tarponprata.com.br/confirmpassword?token=${await createAuth({ user }, true, '1h')}'>
            Redefinir senha
          </a>
        </span>
      </body>
    `
  );

}

const confirmReset = async (pgConn, token, password) => {
  let payload = await checkToken(token);
  await updatePass(pgConn, password, payload.user.id );
}

const resetPasswordLogged = async (pgConn, userLogged, oldPassword, password, userId) => {

  if (userLogged.id == userId && !oldPassword) 
    throw 'Para trocar a senha do usuário logado é obrigatório o preenchimento da senha anterior';
  
  if (!(await isAdmin(pgConn, userLogged.id))) 
    throw 'Usuário logado não é administrador';

  if (oldPassword && !(await getUser(pgConn, {password: oldPassword, id: userId}, false))) 
    throw 'Senha anterior inválida';
  
  await updatePass(pgConn, password, userId);
}


module.exports = { createReset, confirmReset, resetPasswordLogged}