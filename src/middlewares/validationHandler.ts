import { Request, Response, NextFunction } from 'express';
import { validationResult, ValidationChain } from 'express-validator';
import { STATUS_CODES } from '../utils/statusCodes';

export const validate = (validations: ValidationChain[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(STATUS_CODES.BAD_REQUEST)
                .json({ errors: errors.array() });
        }
        next();
    };
};
