const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
   host: "smtp.gmail.com",
   port: 465,
   secure: true,
   auth: {
      user: "appfidelidade1@gmail.com",
      pass: "appfidelidade@2020"
   }
});
const enviarEmail = (email, senha) => {
   transporter.sendMail({
      from: 'appfidelidade1@gmail.com',
      to: email,
      subject: 'Cadastro App Fidelidade',
      html: `<table align="center" bgcolor="#EFEFEF" border="0" cellpadding="0" cellspacing="0" style="border-collapse:collapse" width="600">
        <tbody>
           <tr>
              <td>
                 <div style="background-color:#ffffff;color:#4b4b4b;margin:0 30px;padding:20px;border-radius:10px;font-size:13px">
                    <p>Acesse o sistema app fidelidade com as credenciais abaixo</p>
                    <p>Login: ${email}</p>
                    <p>Senha: ${senha}</p>
                 </div>
              </td>
           </tr>
        </tbody>
     </table>`
   }, (error, info) => {
      if (error) {
         console.log(error);
      }
   });
}
module.exports = { enviarEmail }