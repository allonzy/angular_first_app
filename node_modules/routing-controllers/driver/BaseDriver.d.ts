import { ValidatorOptions } from "class-validator";
import { ClassTransformOptions } from "class-transformer";
import { CurrentUserChecker } from "../CurrentUserChecker";
import { AuthorizationChecker } from "../AuthorizationChecker";
/**
 * Base driver functionality for all other drivers.
 */
export declare class BaseDriver {
    /**
     * Indicates if class-transformer should be used or not.
     */
    useClassTransformer: boolean;
    /**
     * Indicates if class-validator should be used or not.
     */
    enableValidation: boolean;
    /**
     * Global class transformer options passed to class-transformer during classToPlain operation.
     * This operation is being executed when server returns response to user.
     */
    classToPlainTransformOptions: ClassTransformOptions;
    /**
     * Global class-validator options passed during validate operation.
     */
    validationOptions: ValidatorOptions;
    /**
     * Global class transformer options passed to class-transformer during plainToClass operation.
     * This operation is being executed when parsing user parameters.
     */
    plainToClassTransformOptions: ClassTransformOptions;
    /**
     * Indicates if default routing-controllers error handler should be used or not.
     */
    isDefaultErrorHandlingEnabled: boolean;
    /**
     * Indicates if routing-controllers should operate in development mode.
     */
    developmentMode: boolean;
    /**
     * Global application prefix.
     */
    routePrefix: string;
    /**
     * Indicates if cors are enabled.
     * This requires installation of additional module (cors for express and kcors for koa).
     */
    cors?: boolean | Object;
    /**
     * Map of error overrides.
     */
    errorOverridingMap: {
        [key: string]: any;
    };
    /**
     * Special function used to check user authorization roles per request.
     * Must return true or promise with boolean true resolved for authorization to succeed.
     */
    authorizationChecker?: AuthorizationChecker;
    /**
     * Special function used to get currently authorized user.
     */
    currentUserChecker?: CurrentUserChecker;
    protected processJsonError(error: any): any;
    protected processTextError(error: any): any;
    protected merge(obj1: any, obj2: any): any;
}
