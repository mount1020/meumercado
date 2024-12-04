// importando components do bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBarra = () => {
  const usuarioNome = localStorage.getItem("userName")
    return (
    <div>
      <Navbar expand="lg" bg="warning" data-bs-theme="dark">
        <Container>
          {/* Icone  */}
          <span
            className="material-symbols-outlined"
            style={{ fontSize: "40px", color: "white" }}
          >
            <span class="material-symbols-outlined">
             settings_accessibility
               </span>
          </span>
          {/* Texto logo */}
          <Navbar.Brand href="/home">ong</Navbar.Brand>

          <Navbar.Toggle aria-controls="minha-nav" />
          <Navbar.Collapse id="minha-nav">
            {/* Paginas */}
            <Nav className="me-auto">
              <Nav.Link href="/home" className="active">animais</Nav.Link>
              <Nav.Link href="/produto/cadastrar">Cadastro</Nav.Link>
            </Nav>
            {/* Sair */}
            <Nav className="justify-content-end">

            <span className="material-symbols-outlined"
            >
              sound_detection_dog_barking
                    </span>
              <Navbar.Text style={{color:"white"}}>
                Usuário: {usuarioNome} |
              </Navbar.Text>
              <Nav.Link href="/login">Sair</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default NavBarra;
