interface ErrorInterface extends Error {
    status?: string;
    statusCode?: number;
}

export default ErrorInterface;
