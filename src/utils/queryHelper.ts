import { Request } from 'express';
import { Model, SortOrder } from 'mongoose';

interface QueryParams {
    page?: number;
    limit?: number;
    filter?: any;
    sortBy?: string;
}

export const queryHelper = async (
    req: Request,
    model: Model<any>,
    defaultFilter: any = {},
) => {
    const {
        page = 1,
        limit = 10,
        sortBy,
        ...filters
    } = req.query as unknown as QueryParams;

    // Ensure page and limit are numbers
    const pageNumber = Number(page) || 1;
    const limitNumber = Number(limit) || 10;

    // Combine defaultFilter and filters from query
    const filter = { ...defaultFilter, ...filters };

    // Parse sortBy to the correct type
    let sortOption: string | { [key: string]: SortOrder } | undefined =
        undefined;
    if (typeof sortBy === 'string') {
        sortOption = sortBy;
    }

    // Fetch results from the database
    const results = await model
        .find(filter)
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .sort(sortOption ? sortOption : 'createdAt');

    // Count total documents matching the filter
    const total = await model.countDocuments(filter);

    return {
        data: results,
        pagination: {
            total,
            page: pageNumber,
            limit: limitNumber,
            pages: Math.ceil(total / limitNumber),
        },
    };
};
