import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const CardProduto = (props) => {
  // Funcao pra deletar um produto
  const handleDelete = async (e) => {
    const req = await fetch(`http://localhost:5000/produtos/${props.id}`, 
    {
      method:"DELETE"
    });
    const res = await req.json()
    console.log(res)
    alert(`Produto ${res.nome} removido`)
  };

  return (
    <div>
      <Card style={{ width: "16rem", height: "30rem" }}>
        {/* Imagem do Card */}
        <Card.Img variant="top" src={props.imagemUrl} height="200px" />

        <Card.Body>
          {/* Título do card com nome do animal */}
          <Card.Title>{props.nome}</Card.Title>
          {/* Subtitulo no card com vacinação do animal */}
          <Card.Subtitle className="mb-2 text-muted">
            Vacinação: {props.vacinacao}
          </Card.Subtitle>
          <Card.Text>
            <b> Descrição: </b> <br></br> {props.descricao}
          </Card.Text>
          <Card.Text>
            <b> Categoria: </b> <br></br> {props.categoria}
          </Card.Text>

          <Card.Link href={`/produto/editar/${props.id}`}>
            <Button variant="warning">Editar</Button>
          </Card.Link>

          <Card.Link href="/home">
            <Button variant="danger" type="button" onClick={handleDelete}>
              Excluir
            </Button>
          </Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CardProduto;
