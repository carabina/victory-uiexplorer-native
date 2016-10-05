import React, { Component } from "react";
import { View } from "react-native";
import { VictoryPie } from "victory-native";
import ChartControls from "./chart-controls";
import ToggleControl from "./toggle-control";
import SliderControl from "./slider-control";
import { defaultPropMap } from "../utils/props";
import { colorScales } from "../utils/colors";
import { styles } from "../utils/styles";

const endAngles = ["-180", "-135", "-90"];
const startAngles = ["90", "135", "180"];

export default class VictoryPieExample extends Component {
  static displayName = "VictoryPieExample";

  constructor(props) {
    super(props);

    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleDatasetChange = this.handleDatasetChange.bind(this);
    this.handleInnerRadiusChange = this.handleInnerRadiusChange.bind(this);
    this.handleEndAngleChange = this.handleEndAngleChange.bind(this);
    this.handlePadAngleChange = this.handlePadAngleChange.bind(this);
    this.handleStartAngleChange = this.handleStartAngleChange.bind(this);

    this.state = {
      innerRadius: 0,
      padAngle: 0,
      selectedColorIndex: 0,
      selectedDatasetIndex: 0,
      selectedEndAngleIndex: 0,
      selectedStartAngleIndex: 2,
    };
  }

  render() {
    const {
      innerRadius,
      padAngle,
      selectedColorIndex,
      selectedDatasetIndex,
      selectedEndAngleIndex,
      selectedStartAngleIndex,
    } = this.state;
    const props = defaultPropMap.VictoryPie;
    const { data, ...other } = props;

    return (
      <View style={styles.container}>
        <View style={styles.chartWrapper}>
          <VictoryPie
            {...other}
            animate={{ duration: 400 }}
            colorScale={colorScales[selectedColorIndex]}
            data={data[selectedDatasetIndex]}
            innerRadius={innerRadius}
            startAngle={parseInt(startAngles[selectedStartAngleIndex])}
            endAngle={parseInt(endAngles[selectedEndAngleIndex])}
            padAngle={padAngle}
          />
        </View>
        <ChartControls>
          <ToggleControl
            onChange={this.handleDatasetChange}
            selectedIndex={selectedDatasetIndex}
            title="data"
          />
          <ToggleControl
            onChange={this.handleColorChange}
            selectedIndex={selectedColorIndex}
            title="colorScale"
            values={["Blue Gray", "Bright", "Yellow"]}
          />
          <SliderControl
            onChange={this.handleInnerRadiusChange}
            title="innerRadius"
          />
          <ToggleControl
            onChange={this.handleStartAngleChange}
            selectedIndex={selectedStartAngleIndex}
            title="startAngle"
            values={startAngles}
          />
          <ToggleControl
            onChange={this.handleEndAngleChange}
            selectedIndex={selectedEndAngleIndex}
            title="endAngle"
            values={endAngles}
          />
          <SliderControl
            min={0}
            max={10}
            onChange={this.handlePadAngleChange}
            title="padAngle"
          />
        </ChartControls>
      </View>
    );
  }

  handleColorChange(ev) {
    this.setState({ selectedColorIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleDatasetChange(ev) {
    this.setState({ selectedDatasetIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleEndAngleChange(ev) {
    this.setState({ selectedEndAngleIndex: ev.nativeEvent.selectedSegmentIndex });
  }

  handleInnerRadiusChange(innerRadius) {
    this.setState({ innerRadius });
  }

  handlePadAngleChange(padAngle) {
    this.setState({ padAngle });
  }

  handleStartAngleChange(ev) {
    this.setState({ selectedStartAngleIndex: ev.nativeEvent.selectedSegmentIndex });
  }
}
