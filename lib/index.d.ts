import express from "express";
export declare const validate: (secret: string) => (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void> | undefined;
