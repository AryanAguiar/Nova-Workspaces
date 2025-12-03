import { allowedNodeEnvironmentFlags } from "process";

export const authorize = (user : any, ...allowedRoles: string[]) => {
    if (!allowedRoles.includes(user.role)) {
        throw new Error("Forbidden");
    }
}