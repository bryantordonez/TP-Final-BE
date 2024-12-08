import Joi from 'joi';

const transactionSchema = Joi.object({
  mount: Joi.number().precision(2).positive().required(),
  store: Joi.string().max(50).required(),
  date: Joi.string().pattern(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}$/).required(),
  status: Joi.string().valid('pending', 'approved', 'declined', null).default('pending').optional()
});

export { transactionSchema }