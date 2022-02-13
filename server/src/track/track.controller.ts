import { Controller, Get } from '@nestjs/common';

@Controller('/tracks')
export class TrackController {
  create() {}
  @Get()
  getAll() {
    return 'get all tracks';
  }
  getOne() {}
  delete() {}
}
