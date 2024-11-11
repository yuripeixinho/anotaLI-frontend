import "./styles.scss";
import noContent from "../../../assets/vector/noContent.jpg"


export default function StatusSemDados({ msg }) {
  return (
    <div className="container-mensagem-sem-dados">
      <img src={noContent} alt={msg} width={250} />

      <span>{msg}</span>
    </div>
  );
}
