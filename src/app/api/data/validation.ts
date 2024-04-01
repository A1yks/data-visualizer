import Joi from 'joi';
import { AddDataReq, GetDataReq, UpdateDataReq } from './types';

const keySchema = Joi.string().min(1);
const stringRecordPatternSchema = Joi.object().pattern(keySchema, Joi.string().allow(''));

export const getDataSchema = Joi.object<GetDataReq>({
    type: Joi.string().required(),
    limit: Joi.number().integer().min(1),
    offset: Joi.number().integer().min(0),
}).pattern(keySchema, Joi.string());

export const updateDataSchema = Joi.object<UpdateDataReq>().keys({
    id: Joi.string().required(),
    data: stringRecordPatternSchema.required(),
});

export const addDataSchema = Joi.object<AddDataReq>({
    type: Joi.string().required(),
    data: Joi.object().pattern(keySchema, Joi.any()).required(),
});
