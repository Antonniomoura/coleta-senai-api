import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(request: Request, response: Response) {
    const items = await knex('items').select('*');

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        image_url: `${process.env.NODE_ENV === 'development'
          ? process.env.URL_SERVER_DEV : process.env.URL_SERVER}uploads/${item.image}`,
      };
    });

    return response.json(serializedItems);
  }
}

export default ItemsController;
