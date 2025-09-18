import { FastifyReply, FastifyRequest } from "fastify";

export const handleSuccess = <T>(reply: FastifyReply, json: T, successCode: number = 200): FastifyReply => {
    return reply.code(successCode).send(json);
}

export class ErrorResponse extends Error {
    statusCode: number;
    constructor(errorMessage: string, errorCode: number = 400, error: any = null) {
        if (error) {
            console.error(error);
        }
        super(errorMessage);
        this.name = "ErrorResponse";
        this.statusCode = errorCode;
    }
}

export function handleError(request: FastifyRequest, reply: FastifyReply, error: any, defaultErrorMessage: string = "Internal Error", defaultErrorCode: number = 500): FastifyReply {

    if (error instanceof Error) {
        console.error(`(InternalError) ${error.name}: ${error.message}`);
    } else {
        // display error object
        console.error(error);
    }

    if (error instanceof ErrorResponse) {

        // For validation error message and error translation in i18n
        const errorMessage = error.message;

        return reply.code(error.statusCode).send({
            message: errorMessage,
            error: "ErrorResponse",
            statusCode: error.statusCode,
        });
    } else if (error.code === 'FST_JWT_EXPIRED') {
        return reply.code(401).send({
            message: "Authorization token expired",
            error: "JWTExpired",
            statusCode: 401,
        });
    } else if (error.code === 'FST_JWT_INVALID') {
        return reply.code(401).send({
            message: "Authorization token is invalid: The token is malformed.",
            error: "JWTInvalid",
            statusCode: 401,
        });
    } else if (error.message === 'no result') {
        return reply.code(404).send({
            message: "Not Found",
            error: "ErrorResponse (4041)",
            statusCode: 404,
        });
    } else if (error.code && error.code == 23503) {
        // Error Code (23503) foreign_key_violation. Ref: https://www.postgresql.org/docs/16/errcodes-appendix.html
        return reply.code(400).send({
            message: "Invalid Reference",
            error: "ErrorResponse (23503)",
            statusCode: 400,
        });
    } else if (error.code && error.code == 23505) {
        // Error Code (23505) unique_violation. Ref: https://www.postgresql.org/docs/16/errcodes-appendix.html
        return reply.code(400).send({
            message: "Duplicated Record",
            error: "ErrorResponse (23505)",
            statusCode: 400,
        });
    } else {
        console.error(`(InternalError / Detail Hidden) ${error.code}: ${error.message}`);
        return reply.code(defaultErrorCode).send({
            message: defaultErrorMessage,
            error: "InternalError",
            statusCode: defaultErrorCode,
        });
    }
}
