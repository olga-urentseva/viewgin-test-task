import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

import Chart from "react-apexcharts";
import { useAuthContext } from "../../../contexts/AuthContext";
import Loader from "../../../atoms/Loader";
import ErrorMessage from "../../../atoms/ErrorMessage";

import classes from "./style.css";
import { Redirect } from "react-router";
import ChartWrapper from "../ChartWrapper";

const STATIC_CHART_OPTIONS = {
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: "100%",
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};

const DonutChart = ({ ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [chartData, setChartData] = useState(null);

  const authContext = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://ideadeploy.space/test/donut.json", {
          headers: { Authorization: `Bearer ${authContext.userToken}` },
        });
        setChartData(
          res.data.list.reduce(
            (acc, el) => ({
              series: [...acc.series, parseInt(el.views)],
              labels: [...acc.labels, el.title],
            }),
            {
              series: [],
              labels: [],
            }
          )
        );
      } catch (error) {
        if (error.status === 403) {
          return <Redirect to="/" />;
        }
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader className={classes.DonutLoader} />;
  }

  if (isError) {
    return (
      <ErrorMessage message="Something went wrong, please reload the page" />
    );
  }
  return (
    <ChartWrapper {...rest}>
      <Chart
        type="donut"
        options={{ ...STATIC_CHART_OPTIONS, labels: chartData.labels }}
        series={chartData.series}
      />
    </ChartWrapper>
  );
};

export default DonutChart;
