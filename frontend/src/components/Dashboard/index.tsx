
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/solid";
import { Callout, Card, DonutChart, Title } from "@tremor/react";
import { useTranslation } from "react-i18next";
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

export default function Dashboard({ transactions }: IDashboardProps) {
  const { t } = useTranslation();

  const valueFormatter = (number: number) =>
  `${t("currency")} ${numberToCurrency(number)}`;

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
      <Title>{t("dashboard.title")}</Title>
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
            <Title>{t("dashboard.tipsTitle")}</Title>
            <Callout
              className="mt-4"
              title={t("dashboard.tip1")}
              icon={ExclamationIcon}
            />
            <Callout
              className="mt-4"
              title={t("dashboard.tip2")}
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
