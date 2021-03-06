'use strict';

const Homey = require('homey');
const ZwaveDevice = require('homey-meshdriver').ZwaveDevice;

class Wallplug_WR01ZV2 extends ZwaveDevice {
  onMeshInit() {
    // this.enableDebug();
    // this.printNode();
    this.registerCapability('onoff', 'SWITCH_BINARY');
	this.registerCapability('meter_power', 'METER');
    this.registerCapability('measure_power', 'METER');
	this.registerCapability('measure_current', 'METER');
    this.registerCapability('measure_voltage', 'METER');

	// define FlowCardAction to reset meter_power
		let WR01ZV2_reset_meter_run_listener = async(args) => {
			let result = await args.device.node.CommandClass.COMMAND_CLASS_METER.METER_RESET({})
			if (result !== 'TRANSMIT_COMPLETE_OK') throw new Error(result);
		};

		let actionWR01ZV2_reset_meter = new Homey.FlowCardAction('WR01ZV2_reset_meter');
		actionWR01ZV2_reset_meter
			.register()
			.registerRunListener(WR01ZV2_reset_meter_run_listener);	
  }
}
module.exports = Wallplug_WR01ZV2;
