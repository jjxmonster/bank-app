import React, { FunctionComponent } from 'react';

import { Line } from 'react-chartjs-2';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';

const data = {
   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
   datasets: [
      {
         label: 'Balance',
         data: [3490, 5420, 6000, 3252, 4414, 6215],
         fill: true,
         backgroundColor: '#6C63FF',
         borderColor: '#53556842',
      },
   ],
};

interface BalanceChartProps {}

const BalanceChart: FunctionComponent<BalanceChartProps> = () => {
   Chart.register(CategoryScale);
   return (
      <div>
         <Line data={data} />
      </div>
   );
};

export default BalanceChart;
