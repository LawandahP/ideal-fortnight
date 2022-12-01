import React, { useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { NgPageContainer } from '../display/elements';
import { readPaymentsAction } from '../../screens/payments/actions';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Chart.js Line Chart',
//     },
//   },
// };

// const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Late Payments',
//       data: [900, 700, 78, 890],
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

export function LineChart() {
    const dispatch = useDispatch()
    const readPayments = useSelector((state) => state.readPayments);
    const { loading, error, payments, count } = readPayments;

    const readProperties = useSelector(state => state.readProperties)
    const { loading: readLoading, error: readError, success: readSuccess, properties } = readProperties

    useEffect(() => {
        dispatch(readPaymentsAction(true))
    }, [])

    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
        parsing: {
          xAxisKey: 'id',
          yAxisKey: 'nested.value'
        },
      };
      
    const labels = ['January'];
      
    const data = {
        labels: properties?.map((property) => (property?.name)),
        datasets: [
          {
            label: 'Late Payments',
            data: payments?.map((payment, i) => (payment?.amount_paid)),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
          {
            label: 'Dataset 2',
            data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      }

    return <NgPageContainer>
                <Line options={options} data={data} />
            </NgPageContainer>
}
