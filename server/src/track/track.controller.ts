import { Controller, Get } from '@nestjs/common';

@Controller('/tracks')
export class TrackController {
  create() {
    return 'create';
  }
  @Get()
  getAll() {
    return 'get all tracks';
  }
  getOne() {
    return 'getOne';
  }
  delete() {
    return 'delete';
  }
}
