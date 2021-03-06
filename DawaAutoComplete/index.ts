import {IInputs, IOutputs} from "./generated/ManifestTypes";
import { Dawa } from "./ReactComponent/Dawa";
import React = require("react");
import ReactDOM = require("react-dom");
import { IdawaProps } from "./Interfaces/interface";

export class DawaAutoComplete implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private localNotifyOutputChanged: () => void;
	private _container: HTMLDivElement;
	private _context: ComponentFramework.Context<IInputs>;
	private _city: string;
	private _zip: string;
	private _address: string;
	private _number: string;
	private _streetNumber: string;
	private _streetName: string;
	private _fullAddress: string;
	private _x: number;
	private _y: number;

	private changeAddress(add:string, zip:string, city:string, nr:string, full:string,x:number,y:number) {
		this._address = add;
		this._city = city;
		this._zip = zip;
		this._number = nr;
		this._streetName = add;
		this._streetNumber = nr;
		this._fullAddress = full;
		this._x = x;
		this._y = y;
		this.localNotifyOutputChanged();
	}
	/**
	 * Empty constructor.
	 */
	constructor()
	{

	}

	/**
	 * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
	 * Data-set values are not initialized here, use updateView.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
	 * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
	 * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
	 * @param container If a control is marked control-type='standard', it will receive an empty div element within which it can render its content.
	 */
	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement)
	{
		this._container = container;
		this._context = context;
		this.localNotifyOutputChanged = notifyOutputChanged;

		let props: IdawaProps = {
			changeAddress: this.changeAddress.bind(this),
			context: this._context
		}
		
		ReactDOM.render(
			React.createElement(
				Dawa,
				props
			),
			this._container
		)
	}


	/**
	 * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
	 * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
	 */
	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		
	}

	/** 
	 * It is called by the framework prior to a control receiving new data. 
	 * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as “bound” or “output”
	 */
	public getOutputs(): IOutputs
	{
		return {
			City: this._city,
			address: `${this._address} ${this._number}`,
			zipcode: this._zip,
			fullAddress: this._fullAddress,
			streetNumber: this._streetNumber,
			streetName: this._streetName,
			x: this._x,
			y: this._y
		};
	}

	/** 
	 * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
	 * i.e. cancelling any pending remote calls, removing listeners, etc.
	 */
	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this._container);
	}
}