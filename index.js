const data = [
  {
    label: 'A',
    value: {
      one: 20,
      two: 40
    }
  },
  {
    label: 'B',
    value: {
      one: 30,
      two: 50
    }
  },
  {
    label: 'C',
    value: {
      one: 10,
      two: 60
    }
  },
  {
    label: 'D',
    value: {
      one: 40,
      two: 20
    }
  },
  {
    label: 'E',
    value: {
      one: 50,
      two: 30
    }
  }
];

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = 500 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

const x = d3.scaleBand()
  .range([0, width])
  .padding(0.1);

const y = d3.scaleLinear()
  .range([height, 0]);

const svg = d3.select("#chart")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

const colorScale = d3.scaleOrdinal()
  .range(["steelblue", "orange"]);

x.domain(data.map(d => d.label));
y.domain([0, d3.max(data, d => d.value.one + d.value.two)]);

svg.selectAll(".bar")
  .data(data)
  .enter().append("rect")
  .attr("class", "bar")
  .attr("x", d => x(d.label))
  .attr("width", x.bandwidth())
  .attr("y", d => y(d.value.one + d.value.two))
  .attr("height", d => height - y(d.value.one + d.value.two))
  .style("fill", d => colorScale(d.value.one > d.value.two ? "one" : "two"))
  .on("mouseover", handleMouseOver)
  .on("mouseout", handleMouseOut);

const tooltip = d3.select("#chart")
  .append("div")
  .attr("class", "tooltip");

function handleMouseOver(event, d) {
  d3.select(this).attr("fill", "orange");

  tooltip
    .style("left", (event.pageX + 10) + "px")
    .style("top", (event.pageY + 10) + "px")
    .html(`Value One: ${d.value.one}<br>Value Two: ${d.value.two}`)
    .classed("show", true);
}

function handleMouseOut(event, d) {
  d3.select(this).attr("fill", d => colorScale(d.value.one > d.value.two ? "one" : "two"));

  tooltip.classed("show", false);
}
