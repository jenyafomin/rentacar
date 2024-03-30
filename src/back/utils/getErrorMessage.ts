import { Prisma } from "@prisma/client";

export function getErrorMessage(e: any): string {
    const prismaError = handlePrsimaError(e);
    if (prismaError) return prismaError;
    if (e instanceof Error) return e.message;
    return "Internal Server Error";
}


function handlePrsimaError(e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return e.message
    }
    if (e instanceof Prisma.PrismaClientUnknownRequestError) {
        return e.message
    }
    return;
}