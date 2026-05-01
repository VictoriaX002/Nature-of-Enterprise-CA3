import Link from 'next/link';
import { fallbackCanteenMenu } from '@/app/lib/canteen-data';
import {
  HighContrastToggleButton,
  LargeTextMain,
  LargeTextProvider,
  LargeTextToggleButton,
} from '@/app/ui/large-text-mode';

type PurchaseFrequencyRow = {
  id: string;
  day: string;
  mealPeriod: string;
  itemName: string;
  priceLabel: string;
  weeklyPurchases: number[];
};

type RegressionRow = {
  id: string;
  itemName: string;
  slope: number;
  forecastWeek7: number;
  testMae: number;
  recommendedOrderQty: number;
};

const weekLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'] as const;

function getRandomPurchaseCount() {
  return Math.floor(Math.random() * 21);
}

function buildPurchaseFrequencyDataset(): PurchaseFrequencyRow[] {
  return fallbackCanteenMenu.map((item) => ({
    id: item.id,
    day: item.day,
    mealPeriod: item.mealPeriod,
    itemName: item.name,
    priceLabel: item.priceLabel,
    weeklyPurchases: Array.from({ length: 6 }, getRandomPurchaseCount),
  }));
}

function fitLinearRegression(weeklyPurchases: number[], startWeek = 1) {
  const n = weeklyPurchases.length;
  const xValues = Array.from({ length: n }, (_, index) => startWeek + index);
  const yValues = weeklyPurchases;

  const xMean = xValues.reduce((sum, value) => sum + value, 0) / n;
  const yMean = yValues.reduce((sum, value) => sum + value, 0) / n;

  const numerator = xValues.reduce((sum, x, index) => sum + (x - xMean) * (yValues[index] - yMean), 0);
  const denominator = xValues.reduce((sum, x) => sum + (x - xMean) ** 2, 0);

  const slope = denominator === 0 ? 0 : numerator / denominator;
  const intercept = yMean - slope * xMean;

  return { slope, intercept };
}

function predictWithModel(slope: number, intercept: number, weekNumber: number): number {
  return Math.max(0, Math.min(20, slope * weekNumber + intercept));
}

function trainTestSplitTimeSeries(weeklyPurchases: number[], trainRatio = 0.67) {
  const n = weeklyPurchases.length;
  const splitIndex = Math.max(2, Math.min(n - 1, Math.floor(n * trainRatio)));
  return {
    train: weeklyPurchases.slice(0, splitIndex),
    test: weeklyPurchases.slice(splitIndex),
  };
}

/** Mean absolute error on the test split (matches basic_regression.py evaluate_train_test_split). */
function evaluateTrainTestSplit(weeklyPurchases: number[]): number {
  const { train, test } = trainTestSplitTimeSeries(weeklyPurchases);
  const trainWeeks = train.length;
  const { slope, intercept } = fitLinearRegression(train, 1);
  const predictions = test.map((_, index) =>
    predictWithModel(slope, intercept, trainWeeks + index + 1)
  );
  if (predictions.length === 0) {
    return 0;
  }
  const absoluteErrors = test.map((actual, index) => Math.abs(actual - predictions[index]!));
  return absoluteErrors.reduce((sum, value) => sum + value, 0) / absoluteErrors.length;
}

function runBasicRegression(weeklyPurchases: number[]) {
  const n = weeklyPurchases.length;
  const { slope, intercept } = fitLinearRegression(weeklyPurchases, 1);
  const week7Forecast = slope * (n + 1) + intercept;

  return { slope, week7Forecast };
}

function buildRegressionDataset(data: PurchaseFrequencyRow[]): RegressionRow[] {
  return data.map((row) => {
    const regression = runBasicRegression(row.weeklyPurchases);
    const boundedForecast = Math.max(0, Math.min(20, regression.week7Forecast));
    const recommendedOrderQty = Math.max(1, Math.round(boundedForecast));
    const testMae = evaluateTrainTestSplit(row.weeklyPurchases);

    return {
      id: row.id,
      itemName: row.itemName,
      slope: regression.slope,
      forecastWeek7: boundedForecast,
      testMae,
      recommendedOrderQty,
    };
  });
}

export default function CanteenMachineLearningPage() {
  const purchaseFrequencyData = buildPurchaseFrequencyDataset();
  const regressionData = buildRegressionDataset(purchaseFrequencyData);
  const chartMax = Math.max(...regressionData.map((row) => row.recommendedOrderQty), 1);
  const chartHeight = 280;
  const chartWidth = 960;
  const marginLeft = 64;
  const marginRight = 24;
  const marginTop = 24;
  const marginBottom = 72;
  const plotWidth = chartWidth - marginLeft - marginRight;
  const plotHeight = chartHeight - marginTop - marginBottom;
  const yTickMax = Math.max(20, chartMax);
  const yTicks = [0, 5, 10, 15, 20].filter((tick) => tick <= yTickMax);

  const chartPoints = regressionData.map((row, index) => {
    const x =
      marginLeft +
      (regressionData.length === 1 ? plotWidth / 2 : (index / (regressionData.length - 1)) * plotWidth);
    const y = marginTop + (1 - row.recommendedOrderQty / yTickMax) * plotHeight;
    return { ...row, x, y };
  });
  const polylinePoints = chartPoints.map((point) => `${point.x},${point.y}`).join(' ');

  return (
    <LargeTextProvider>
      <LargeTextMain className="min-h-screen bg-blue-900 px-4 py-6 md:px-8 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="rounded-2xl bg-white p-5 shadow-lg">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">Canteen Machine Learning Data</h1>
          <p className="mt-2 max-w-3xl text-slate-700">
            Fictional training-style dataset showing how many times each menu item was bought over the
            last 6 weeks (range: 0 to 20 per week).
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <LargeTextToggleButton />
            <HighContrastToggleButton />
            <Link
              href="/canteen"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-100"
            >
              Canteen
            </Link>
            <Link
              href="/"
              className="rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-800 transition-colors hover:bg-slate-100"
            >
              Back to home
            </Link>
          </div>
        </header>

      <section className="rounded-2xl bg-white p-4 shadow-lg md:p-6">
        <h2 className="text-xl font-semibold text-slate-900">Purchase Frequency Table</h2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Fictional canteen purchase frequency data for each menu item
            </caption>
            <thead className="bg-blue-50">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Day
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Meal Period
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Menu Item
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Price
                </th>
                {weekLabels.map((weekLabel) => (
                  <th key={weekLabel} scope="col" className="px-3 py-2 font-semibold text-slate-900">
                    {weekLabel}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {purchaseFrequencyData.map((row) => (
                <tr key={row.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-3 py-3 text-slate-700">{row.day}</td>
                  <td className="px-3 py-3 text-slate-700">{row.mealPeriod}</td>
                  <td className="px-3 py-3 font-medium text-slate-900">{row.itemName}</td>
                  <td className="px-3 py-3 text-slate-700">{row.priceLabel}</td>
                  {row.weeklyPurchases.map((count, index) => (
                    <td key={`${row.id}-week-${index + 1}`} className="px-3 py-3 text-slate-700">
                      {count}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-lg md:p-6">
        <h2 className="text-xl font-semibold text-slate-900">Basic Regression Forecast</h2>
        <p className="mt-2 text-sm text-slate-700">
          Forecasted week 7 demand based on weeks 1-6. Test MAE is mean absolute error on the held-out
          weeks after fitting on the first ~67% of the series (same logic as{' '}
          <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">basic_regression.py</code>).
          Recommended order quantity always has a minimum of 1 item.
        </p>
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">
              Basic regression predictions and recommended order quantities for each menu item
            </caption>
            <thead className="bg-blue-50">
              <tr>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Menu Item
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Trend Slope
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Forecast (Week 7)
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Test MAE
                </th>
                <th scope="col" className="px-3 py-2 font-semibold text-slate-900">
                  Recommended Order Quantity
                </th>
              </tr>
            </thead>
            <tbody>
              {regressionData.map((row) => (
                <tr key={row.id} className="border-t border-slate-200 hover:bg-slate-50">
                  <td className="px-3 py-3 font-medium text-slate-900">{row.itemName}</td>
                  <td className="px-3 py-3 text-slate-700">{row.slope.toFixed(2)}</td>
                  <td className="px-3 py-3 text-slate-700">{row.forecastWeek7.toFixed(2)}</td>
                  <td className="px-3 py-3 text-slate-700">{row.testMae.toFixed(3)}</td>
                  <td className="px-3 py-3 text-slate-700">{row.recommendedOrderQty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-2xl bg-white p-4 shadow-lg md:p-6">
        <h2 className="text-xl font-semibold text-slate-900">Regression Forecast Graph</h2>
        <p className="mt-2 text-sm text-slate-700">
          Line graph of recommended order quantity by item (derived from week 7 forecast).
        </p>

        <figure className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <figcaption className="mb-3 text-sm text-slate-700">
            Quantity on the y-axis and menu items on the x-axis.
          </figcaption>
          <div className="overflow-x-auto">
            <svg
              viewBox={`0 0 ${chartWidth} ${chartHeight}`}
              className="h-auto min-w-[760px] w-full"
              role="img"
              aria-label="Line graph of recommended order quantities for menu items"
            >
              {yTicks.map((tick) => {
                const y = marginTop + (1 - tick / yTickMax) * plotHeight;
                return (
                  <g key={`y-tick-${tick}`}>
                    <line x1={marginLeft} y1={y} x2={chartWidth - marginRight} y2={y} stroke="#e2e8f0" />
                    <text x={marginLeft - 10} y={y + 4} textAnchor="end" fontSize="12" fill="#475569">
                      {tick}
                    </text>
                  </g>
                );
              })}

              <line
                x1={marginLeft}
                y1={marginTop + plotHeight}
                x2={chartWidth - marginRight}
                y2={marginTop + plotHeight}
                stroke="#334155"
              />
              <line
                x1={marginLeft}
                y1={marginTop}
                x2={marginLeft}
                y2={marginTop + plotHeight}
                stroke="#334155"
              />

              <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={polylinePoints} />

              {chartPoints.map((point) => (
                <g key={`point-${point.id}`}>
                  <circle cx={point.x} cy={point.y} r="4" fill="#1d4ed8" />
                  <text x={point.x} y={point.y - 10} textAnchor="middle" fontSize="11" fill="#1e293b">
                    {point.recommendedOrderQty}
                  </text>
                  <text x={point.x} y={chartHeight - marginBottom + 18} textAnchor="middle" fontSize="11" fill="#334155">
                    {point.itemName}
                  </text>
                </g>
              ))}

              <text x={marginLeft - 46} y={marginTop + plotHeight / 2} transform={`rotate(-90 ${marginLeft - 46} ${marginTop + plotHeight / 2})`} fontSize="12" fill="#0f172a">
                Quantity
              </text>
              <text x={marginLeft + plotWidth / 2} y={chartHeight - 10} textAnchor="middle" fontSize="12" fill="#0f172a">
                Menu Items
              </text>
            </svg>
          </div>
        </figure>
      </section>
      </div>
      </LargeTextMain>
    </LargeTextProvider>
  );
}
