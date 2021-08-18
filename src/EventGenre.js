import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const EventGenre = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => { setData(() => getData()); }, [events]);


  const getData = () => {
    const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'AngularJS', 'Angular'];
    let data = genres.map((genre) => {
     const value = events.filter(event => event.summary.split(' ').includes(genre)).length
     return { name: genre, value }
    })
    return data;
  }

  return (
    <ResponsiveContainer height={400} width="40%">
      <PieChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          labelLine={false}
          outerRadius={80}
          fill="#505194"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default EventGenre;