import React from "react";
import { useEffect, useState } from "react";

import axios from "axios";

import Chart from "react-apexcharts";
import { useAuthContext } from "../contexts/AuthContext";
import Loader from "../Loader";

const options = {
  chart: {
    height: 380,
    width: "100%",
    type: "area",
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

const LineanChart = () => {
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
        console.log(error);
      }
    }
    fetchData();
  }, []);

  console.log(series);

  return (
    <div>
      {isLoading ? <Loader /> : <Chart options={options} series={series} />}
    </div>
  );
};

export default LineanChart;
