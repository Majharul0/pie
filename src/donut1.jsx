import { Pie, measureTextWidth } from '@ant-design/plots';
 
export default function DemoPie(){
  function renderStatistic(containerWidth, text, fontSize,fontWeight) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, fontSize);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${fontSize}px; font-weight:${fontWeight}; line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const data = [
    {
      type: 'Critical',
      value: 60,
    },
    {
      type: 'Warning',
      value: 25,
    },
    {
      type: 'problem',
      value: 10,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    legend:false,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.64,
    color:['#FF5959','#FF974D','#6C83FF'],
    meta: {
      value: {
        formatter: (v) => `${v}`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
        fontSize:0
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: 10,
        customHtml: (container, view, datum, data) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? ` ${datum.value}` : ` ${data.reduce((r, d) => r + d.value, 0)}`;
          return renderStatistic(d, text,45,600);
        },
      },
      content: {
        offsetY: 12,
        customHtml: (container, view, datum,) => {
          const { width } = container.getBoundingClientRect();
          const text =  datum ? datum.type : 'Total';
          return renderStatistic(width, text,14,500);
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-selected',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };
  return <Pie {...config} />;
}

