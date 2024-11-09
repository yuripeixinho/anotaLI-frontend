import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import "./styles.scss";

export default function ItemPorCategoriaGrafico({ dados }) {
  // Processamento dos dados para agrupá-los por categoria
  const data = dados?.reduce((acc, item) => {
    const categoriaIndex = acc.findIndex(
      (cat) => cat.nome === item.categoria.nome
    );

    if (categoriaIndex > -1) {
      acc[categoriaIndex].totalItem += 1;
    } else {
      acc.push({
        nome: item.categoria.nome,
        totalItem: 1,
      });
    }

    return acc;
  }, []);

  // Preparando os dados para o gráfico
  const chartData = data?.map((categoria) => ({
    name: categoria.nome,
    value: categoria.totalItem,
  }));

  // Definindo a paleta de cores
  const COLORS = [
    "#74bade", // Azul principal
    "#9bc9d6", // Azul claro
    "#6a98b4", // Azul escuro
    "#82ca9d", // Verde suave
    "#ffbc5c", // Amarelo suave
    "#ffd580", // Laranja claro
  ];

  return (
    <div className="grafico-item-por-categoria-container">
      <h3>Itens por categoria</h3>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart width={400} height={250}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={chartData}
            cx="50%"
            cy="40%"
            outerRadius="86%"
          >
            {/* Aplicando as cores com o loop */}
            {chartData?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]} // Aplicando a cor correspondente
              />
            ))}
          </Pie>

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
