export const resultOptionBuilder = (resultData) => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {
    data: ["Usuários Concluintes", "Respostas Certas", "Respostas Erradas"],
  },
  toolbox: {
    show: true,
    orient: "vertical",
    left: "left",
    top: "center",
    feature: {
      mark: { show: true },
      dataView: { show: true, readOnly: true },
      magicType: { show: true, type: ["line", "bar"] },
      saveAsImage: { show: true },
    },
  },
  xAxis: [
    {
      type: "category",
      axisTick: { show: false },
      data: resultData?.map((data) => data.title),
    },
  ],
  yAxis: [
    {
      type: "value",
    },
  ],
  series: [
    {
      name: "Usuários Concluintes",
      type: "bar",
      barGap: 0,
      data: resultData?.map((data) => data.usersCount),
    },
    {
      name: "Respostas Certas",
      type: "bar",
      data: resultData?.map((data) => data.rightResponsesCount),
    },
    {
      name: "Respostas Erradas",
      type: "bar",
      data: resultData?.map((data) => data.wrongResponsesCount),
    },
  ],
});

export const feedbackOptionBuilder = (feedbackData) => ({
  tooltip: {
    trigger: "item",
    formatter: "{b} : {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Positivos", "Negativos"],
  },
  series: [
    {
      name: "Notas",
      type: "pie",
      animationDuration: 5000,
      data: [
        {
          value: feedbackData?.filter((data) => data.liked).length,
          name: "Positivo",
        },
        {
          value: feedbackData?.filter((data) => !data.liked).length,
          name: "Negativo",
        },
      ],
      color: ["#837fff", "#f99393"],
    },
  ],
});
