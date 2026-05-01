"""
Basic regression over fictional canteen purchase history.

Usage:
  python app/canteenmachinelearning/basic_regression.py
"""

from __future__ import annotations

import json
from pathlib import Path
from typing import Dict, List, TypedDict


class PurchaseRow(TypedDict):
    id: str
    itemName: str
    weeklyPurchases: List[int]


def load_dataset(dataset_path: Path) -> List[PurchaseRow]:
    with dataset_path.open("r", encoding="utf-8") as file:
        rows = json.load(file)
    return rows


def total_bought(weekly_counts: List[int]) -> int:
    return sum(weekly_counts)


def fit_linear_regression(weekly_counts: List[int], start_week: int = 1) -> Dict[str, float]:
    """
    Simple y = m*x + c regression using least squares.
    x = week number [1..N], y = purchases that week.
    Returns slope and intercept for the fitted window.
    """
    n = len(weekly_counts)
    x_values = [start_week + index for index in range(n)]
    y_values = weekly_counts

    x_mean = sum(x_values) / n
    y_mean = sum(y_values) / n

    numerator = sum((x - x_mean) * (y - y_mean) for x, y in zip(x_values, y_values))
    denominator = sum((x - x_mean) ** 2 for x in x_values)

    slope = 0.0 if denominator == 0 else numerator / denominator
    intercept = y_mean - (slope * x_mean)

    return {"slope": slope, "intercept": intercept}


def predict_with_model(slope: float, intercept: float, week_number: int) -> float:
    return max(0.0, min(20.0, (slope * week_number) + intercept))


def train_test_split_time_series(weekly_counts: List[int], train_ratio: float = 0.67) -> Dict[str, List[int]]:
    split_index = max(2, min(len(weekly_counts) - 1, int(len(weekly_counts) * train_ratio)))
    return {
        "train": weekly_counts[:split_index],
        "test": weekly_counts[split_index:],
    }


def evaluate_train_test_split(weekly_counts: List[int]) -> Dict[str, float]:
    split = train_test_split_time_series(weekly_counts)
    train_counts = split["train"]
    test_counts = split["test"]
    train_weeks = len(train_counts)

    model = fit_linear_regression(train_counts, start_week=1)
    predictions = [
        predict_with_model(model["slope"], model["intercept"], train_weeks + index + 1)
        for index in range(len(test_counts))
    ]
    absolute_errors = [abs(actual - predicted) for actual, predicted in zip(test_counts, predictions)]
    mae = sum(absolute_errors) / len(absolute_errors)

    return {
        "slope": model["slope"],
        "intercept": model["intercept"],
        "mae": mae,
        "train_weeks": float(train_weeks),
    }


def linear_regression_forecast_next_week(weekly_counts: List[int]) -> Dict[str, float]:
    model = fit_linear_regression(weekly_counts, start_week=1)
    next_week_x = len(weekly_counts) + 1
    week_7_forecast = predict_with_model(model["slope"], model["intercept"], next_week_x)
    return {"slope": model["slope"], "intercept": model["intercept"], "week_7_forecast": week_7_forecast}


def summarize(rows: List[PurchaseRow]) -> None:
    ranked_rows = sorted(rows, key=lambda row: total_bought(row["weeklyPurchases"]), reverse=True)
    most_bought = ranked_rows[0]
    least_bought = ranked_rows[-1]

    print("\nCanteen Purchase Regression Summary")
    print("-" * 40)
    print(f"Most bought item : {most_bought['itemName']} (total={total_bought(most_bought['weeklyPurchases'])})")
    print(f"Least bought item: {least_bought['itemName']} (total={total_bought(least_bought['weeklyPurchases'])})")

    for label, row in (("Most bought", most_bought), ("Least bought", least_bought)):
        result = linear_regression_forecast_next_week(row["weeklyPurchases"])
        split_eval = evaluate_train_test_split(row["weeklyPurchases"])
        print(f"\n{label} item regression:")
        print(f"  Weekly purchases   : {row['weeklyPurchases']}")
        print(f"  Train/Test split   : {int(split_eval['train_weeks'])}/{len(row['weeklyPurchases']) - int(split_eval['train_weeks'])}")
        print(f"  Test MAE           : {split_eval['mae']:.3f}")
        print(f"  Trend (slope)      : {result['slope']:.3f}")
        print(f"  Intercept          : {result['intercept']:.3f}")
        print(f"  Forecast (week 7)  : {result['week_7_forecast']:.2f}")


def main() -> None:
    dataset_path = Path(__file__).with_name("purchase_history.json")
    rows = load_dataset(dataset_path)
    summarize(rows)


if __name__ == "__main__":
    main()
