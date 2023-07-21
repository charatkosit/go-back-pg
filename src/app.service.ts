/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { environment } from './environments/environment';


export interface Movie {
  id: number;
  name: string;
  year: number;
}

export interface Envs {
  production: boolean;
  dbUrl: string;
  port: number;
  dbUsername: string;
  dbPassword: string;
  dbName: string;
  synchronize: boolean;
  sapApiToken: string;
  baseUrl: string;
  project: string;
  release: string;

}

@Injectable()
export class AppService {

  private envStatus: Envs[] = [
    {
      production: environment.production,
      dbUrl: environment.dbUrl,
      port: environment.port,
      dbUsername: environment.dbUsername,
      dbPassword: environment.dbPassword,
      dbName: environment.dbName,
      synchronize: environment.synchronize,
      sapApiToken: environment.sapApiToken,
      baseUrl: environment.baseUrl,
      project: environment.project,
      release: environment.release,
    }
  ]

  getenvStatus(): Envs[] {
    return this.envStatus;
  }


}
