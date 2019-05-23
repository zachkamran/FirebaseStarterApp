import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';
import {auth} from "../firebase";
import firebase from "../firebase/firebase";

const data = [
  { name: 'Mon', optimalPrice: 2200, demand: 3400 },
  { name: 'Tue', optimalPrice: 1280, demand: 2398 },
  { name: 'Wed', optimalPrice: 5000, demand: 4300 },
  { name: 'Thu', optimalPrice: 4780, demand: 2908 },
  { name: 'Fri', optimalPrice: 5890, demand: 4800 },
  { name: 'Sat', optimalPrice: 4390, demand: 3800 },
  { name: 'Sun', optimalPrice: 4490, demand: 4300 },
];

let avoData = [];

firebase.firestore().collection('weekly-prices').orderBy("date", "asc").limit(220).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const tempObj = {
          id: doc.id,
          date: doc.data().date,
          price: doc.data().price
        };
        avoData.push(tempObj);
      });
    })
    .catch((error) => console.log(`An error occurred: ${error}`));

function SimpleLineChart() {
  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={avoData.length === 0 ? data : avoData}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {/*<Line type="monotone" dataKey="optimalPrice" stroke="#82ca9d" />*/}
        <Line type="monotone" dataKey="price" stroke="#82ca9d" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default SimpleLineChart;
