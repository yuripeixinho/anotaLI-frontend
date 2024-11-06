import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./styles.scss";

export default function ItemPorFeiraGrafico({ dados }) {
  const data = dados?.reduce((acc, item) => {
    // Encontrar o índice do feiraNome no acumulador
    const feiraIndex = acc.findIndex((f) => f.feiraNome === item.feiraNome);

    if (feiraIndex > -1) {
      // Se o feiraNome já existe no acumulador, apenas incrementa o totalItem
      acc[feiraIndex].totalItem += 1;
    } else {
      // Se o feiraNome não existe, cria um novo registro com contador 1
      acc.push({
        feiraNome: item.feiraNome,
        totalItem: 1,
      });
    }

    return acc;
  }, []);

  // Mapeia para o formato necessário para o gráfico
  const chartData = data?.map((feira) => ({
    name: `${feira.feiraNome}`, // Pode ajustar o nome conforme necessário
    value: feira.totalItem,
  }));

  return (
    <div className="graficohome2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
