import { useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";
function Charts(data) {
  const { moneyList } = data;
  const data1 = [
  ];
  // const COLORS = ()=>{
  //   const randomColor = Math.floor(Math.random()*16777215).toString(16);
  //   return `#${randomColor}`
  // }
  const COLORS=["#f2991e","#7c088a","#a589a4","#6ed56e","#18ee36","#3ab116","#2cd8ec","#967630"  ]
  moneyList.map((id) => {
    let findEl=undefined;
    if (!Boolean(data1.find((el) => el.importance === id.importance))) {
      return data1.push({ name: id.name, value: id.value,importance:id.importance});
    }
    const indexNumber=data1.find((el, index) => {
        if(el.importance===id.importance){
         return   findEl=index
        }
    })
    data1[findEl].value=data1[findEl].value+id.value;
  });
  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`PV ${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={18}
          textAnchor={textAnchor}
          fill="#999"
        >
          {`(Rate ${(percent * 100).toFixed(2)}%)`}
        </text>
      </g>
    );
  };

  const [state, setState] = useState(0);

  const onPieEnter = (_, index) => {
    setState(index);
  };
  
  return (
    // <ResponsiveContainer width="100%" height="100%">
    <PieChart width={800} height={600}>
      <Pie
        activeIndex={state}
        activeShape={renderActiveShape}
        data={data1}
        cx="50%"
        cy="50%"
        innerRadius={100}
        outerRadius={200}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      >{data1.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}</Pie>
    </PieChart>
    //    </ResponsiveContainer>
  );
}

export default Charts;
