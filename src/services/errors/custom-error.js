export class CustomError {
    static createError({ errorEnum = { code: 500, name: "Error" }, cause, message }) {
        const error = new Error(message, { cause });
        error.name = errorEnum.name;
        error.code = errorEnum.code;
        throw error;
    }
}