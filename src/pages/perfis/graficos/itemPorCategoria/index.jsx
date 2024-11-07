import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./styles.scss";

export default function ItemPorCategoriaGrafico({ dados }) {
  // Agrupando itens por categoria e contando a quantidade de cada categoria
  const data = dados?.reduce((acc, item) => {
    const categoriaIndex = acc.findIndex(
      (cat) => cat.nome === item.categoria.nome
    );

    if (categoriaIndex > -1) {
      // Se a categoria já existe, incrementa o total de itens
      acc[categoriaIndex].totalItem += 1;
    } else {
      // Se a categoria não existe, cria um novo registro com contador 1
      acc.push({
        nome: item.categoria.nome,
        totalItem: 1,
      });
    }

    return acc;
  }, []);

  // Mapeia para o formato necessário para o gráfico
  const chartData = data?.map((categoria) => ({
    name: categoria.nome,
    value: categoria.totalItem,
  }));

  return (
    <div className="grafico-item-por-categoria-container">
      <h3>Itens por categoria</h3>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart width={400} height={250} margin={{ bottom: 40 }}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
          />

          <Legend
            layout="vertical"
            align="left"
            verticalAlign="top"
            className="custom-legend"
          />

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
