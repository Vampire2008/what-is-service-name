export default class NotFoundError extends Error {
    constructor(path: string) {
        super(`Not found: ${path}`);
        this.name = "NotFoundError";
    }
}
