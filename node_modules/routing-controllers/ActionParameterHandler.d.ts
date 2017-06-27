import { Action } from "./Action";
import { Driver } from "./driver/Driver";
import { ParamMetadata } from "./metadata/ParamMetadata";
/**
 * Handles action parameter.
 */
export declare class ActionParameterHandler {
    private driver;
    constructor(driver: Driver);
    /**
     * Handles action parameter.
     */
    handle(action: Action, param: ParamMetadata): Promise<any> | any;
    /**
     * Handles non-promise value.
     */
    protected handleValue(value: any, action: Action, param: ParamMetadata): Promise<any> | any;
    /**
     * Normalizes parameter value.
     */
    protected normalizeParamValue(value: any, param: ParamMetadata): Promise<any> | any;
    /**
     * Parses string value into a JSON object.
     */
    protected parseValue(value: any, paramMetadata: ParamMetadata): any;
    /**
     * Perform class-transformation if enabled.
     */
    protected transformValue(value: any, paramMetadata: ParamMetadata): any;
    /**
     * Perform class-validation if enabled.
     */
    protected validateValue(value: any, paramMetadata: ParamMetadata): Promise<any> | any;
}
