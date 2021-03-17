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
  chart: {
    height: 380,
    width: "100%",
    animations: {
      initialAnimation: {
        enabled: false,
      },
    },
  },
  xaxis: {
    type: "datetime",
  },
};

const LineanChart = ({ ...rest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [series, setSeries] = useState([]);

  const authContext = useAuthContext();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await axios.get("http://ideadeploy.space/test/graph.json", {
          headers: { Authorization: `Bearer ${authContext.userToken}` },
        });
        setIsLoading(false);
        setSeries(
          res.data.list.map((el) => {
            return {
              name: el.title,
              data: el.data.map((data) => {
                return {
                  x: data[0],
                  y: data[1],
                };
              }),
            };
          })
        );
      } catch (error) {
        if (error.status === 403) {
          return <Redirect to="/" />;
        }
        setIsError(true);
      }
    }
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader className={classes.LineanLoader} />;
  }

  if (isError) {
    return (
      <ErrorMessage message="Something went wrong, please reload the page" />
    );
  }

  return (
    <ChartWrapper {...rest}>
      <Chart options={STATIC_CHART_OPTIONS} series={series} />
    </ChartWrapper>
  );
};

export default LineanChart;
