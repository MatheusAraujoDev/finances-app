
import { Card, DonutChart, Title } from "@tremor/react";
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
    <div className="flex flex-col items-center justify-center pt-24">

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
      </Card>
    </div>
  )
}
