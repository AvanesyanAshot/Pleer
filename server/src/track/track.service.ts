import { Injectable } from '@nestjs/common';

@Injectable()
export class TrackService {
  async create() {
    return 'create';
  }
  async getAll() {
    return 'get all tracks';
  }
  async getOne() {
    return 'getOne';
  }
  async delete() {
    return 'delete';
  }
}
