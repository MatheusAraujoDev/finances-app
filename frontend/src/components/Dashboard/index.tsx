
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout, Card, DonutChart, Title } from "@tremor/react";
import numberToCurrency from "src/utils/numberToCurrency";

interface ITransaction {
  id: string
  amount: number
  description: string
  category: string
  date: string
  userId: string
}

interface IDashboardProps {
  transactions: ITransaction[];
}

interface ICategoryArray {
  amount: number
  category: string
}

const valueFormatter = (number: number) =>
  `R$ ${numberToCurrency(number)}`;

export default function Dashboard({ transactions }: IDashboardProps) {
  
  const transactionsByCategory = transactions.map(item => {
    return {
      category: item.category.toLocaleLowerCase(),
      amount: item.amount,
    }
  })
  
  const sumAmountsByCategory = transactionsByCategory.reduce((acc: any, transaction) => {
    const { category, amount } = transaction;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += amount;
    return acc;
  }, {});
  
  const finalGraphArray: ICategoryArray[] = Object.keys(sumAmountsByCategory).map(category => {
    return {
      category,
      amount: sumAmountsByCategory[category]
    };
  });

  return (
    <div className="flex flex-col items-center justify-center pt-16">
      <Card className="max-w-lg">
      <Title>Despesas por categoria</Title>
        <DonutChart
          className="mt-6"
          data={finalGraphArray}
          category="amount"
          index="category"
          showTooltip
          valueFormatter={valueFormatter}
          colors={["violet", "amber", "indigo", "rose", "cyan", "slate"]}
        />

      {
        transactions.length > 0 && (
          <>
            <Title>Algumas curiosidades e dicas de Controle Financeiro</Title>
            <Callout
              className="mt-4"
              title="Voce sabia que o segundo semestre de 2022 iniciou com índice de 78% das famílias endividadas ? Já a proporção de consumidores com contas ou dívidas atrasadas, os inadimplentes, chegou ao maior patamar em 12 anos: 29%."
              icon={ExclamationIcon}
            />
            <Callout
              className="mt-4"
              title="A maioria das pessoas ficam presas em um círculo vicioso em que trabalham apenas para pagar suas contas. Se tiver oportunidade busque guardar parte de seu salário todos os meses, é recomendado que você guarde ao menos 10% dele"
              icon={CheckCircleIcon}
              color="teal"
            />
          </>
        )
      }

      </Card>
    </div>
  )
}
