// importando components do bootstrap
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

// Importando o hook useState para monitorar a mudança das variáveis
import { useState, useEffect } from "react";

//Importação do navigate pra transitar entre páginas
import { useNavigate} from "react-router-dom";

// Url da api
const url = "http://localhost:5000/usuarios"

const Login = () => {
  //Resetar localstorage
  localStorage.removeItem("userName")
  localStorage.removeItem("email")
  
  //Variáveis pra guardar as informações digitadas pelo usuário
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  //Variáveis para o alerta
  const [alertClass, setAlertClass] = useState("mb-3 d-none");
  const [alertMensagem, setAlertMensagem] = useState("");
  const [alertVariant, setAlertVariant] = useState("danger");

  //Lista com usuarios
  const [usuarios, setUsuarios] = useState([])

  //UseEffect pra puxar os dados da api
  useEffect(()=>{
    async function fetchData(){
      try{
          const req = await fetch(url)
          const users = await req.json()
          console.log(users)
          setUsuarios(users)
      }
      catch(erro){
        console.log(erro.message)
      }
    }
    fetchData()
  }, [])

  // Criando o navigate
  const navigate = useNavigate()

  // Função pra guardar na memória do navegador as informações do usuário
  const gravarLocalStorage = (usuario) =>{
    localStorage.setItem("userName", usuario.nome)
    localStorage.setItem("email", usuario.email)
  }

  //Função pra tratar os dados de login
  const handleLogin = async (e) => {
    //Previne a página de ser recarregada
    e.preventDefault();

    // Verifica se há aquele usuário digitados na lista 
    const userToFind = usuarios.find(
      (user)=>user.email == email
    )
    if (email != "") {
      if (senha != "") {
        if(userToFind != undefined && userToFind.senha == senha){
          gravarLocalStorage(userToFind)
          setAlertClass("mb-3 mt-2");
          setAlertVariant("success")
          setAlertMensagem("Login efetuado com sucesso");
          alert("Login efetuado com sucesso")
          navigate("/home")
        }
        else{
          setAlertClass("mb-3 mt-2");
          setAlertMensagem("Usuário ou senha inválidos");
        }
      } 
      else {
        setAlertClass("mb-3 mt-2");
        setAlertMensagem("O campo senha não pode ser vazio");
      }
    } 
    else {
      setAlertClass("mb-3 mt-2");
      setAlertMensagem("O campo email não pode ser vazio");
    }
  };
  return (
    <div>
      <Container
        style={{ height: "100vh" }}
        className="justify-content-center align-content-center"
      >
        {/* Icone de login */}
        <span
          style={{ fontSize: "200px", color: "white" }}
          className="material-symbols-outlined"
        >
          pets
        </span>
        <Form style={{ width: "75%", margin: "auto" }} onSubmit={handleLogin}>
          {/* Caixinha de email */}
          <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3"
          >
            <Form.Control
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </FloatingLabel>

          {/* Caixinha de senha */}
          <FloatingLabel controlId="floatingPassword" label="Senha">
            <Form.Control
              type="password"
              placeholder="Password"
              value={senha}
              onChange={(e) => {
                setSenha(e.target.value);
              }}
            />
          </FloatingLabel>

          {/* Alerta caso haja erro */}
          <Alert variant={alertVariant} className={alertClass}>
            {alertMensagem}
          </Alert>

          {/* Botao pra enviar o formulário */}
          <Button variant="light" type="submit" className="mt-4" size="lg">
            Login
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
