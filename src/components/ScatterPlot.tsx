import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Point } from '../types/Point';

interface ScatterPlotProps {
  data: Point[];
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  onPointClick: (point: Point) => void;
}

export function ScatterPlot({
  data,
  width = 600,
  height = 400,
  margin = { top: 20, right: 20, bottom: 40, left: 40 },
  onPointClick,
}: ScatterPlotProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current);

    // Calculate dimensions
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    // Create scales
    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.x) || 0])
      .range([0, innerWidth])
      .nice();

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.y) || 0])
      .range([innerHeight, 0])
      .nice();

    // Create container group
    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Add axes
    g.append('g')
      .attr('transform', `translate(0,${innerHeight})`)
      .call(d3.axisBottom(xScale))
      .attr('class', 'text-gray-600');

    g.append('g')
      .call(d3.axisLeft(yScale))
      .attr('class', 'text-gray-600');

    // Add points
    g.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => xScale(d.x))
      .attr('cy', d => yScale(d.y))
      .attr('r', 6)
      .attr('class', 'fill-primary-500 stroke-white stroke-2 cursor-pointer transition-all duration-200 hover:fill-primary-600')
      .on('click', (event, d) => onPointClick(d));

    // Add labels
    g.selectAll('text.point-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'point-label text-sm fill-gray-600')
      .attr('x', d => xScale(d.x) + 8)
      .attr('y', d => yScale(d.y) + 4)
      .text(d => d.label);

  }, [data, width, height, margin, onPointClick]);

  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      className="bg-white rounded-lg shadow-lg"
    />
  );
}