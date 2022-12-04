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
  sapUrl: string;
  sapApiToken: string;
  baseUrl: string;
  project: string;
  release: string;

}

@Injectable()
export class AppService {

 
  private movies: Movie[] = [
    { id: 1, name: 'Star Wars: The Force Awakens', year: 2015 },
    { id: 2, name: 'Star Wars: The Last Jedi', year: 2017 },
    { id: 3, name: 'Star Wars: The Rise of Skywalker', year: 2019 },
  ];


  private envStatus: Envs[] = [
    {
      production: environment.production,
      dbUrl: environment.dbUrl,
      port: environment.port,
      dbUsername: environment.dbUsername,
      dbPassword: environment.dbPassword,
      dbName: environment.dbName,
      synchronize: environment.synchronize,
      sapUrl: environment.sapUrl,
      sapApiToken: environment.sapApiToken,
      baseUrl: environment.baseUrl,
      project: environment.project,
      release: environment.release,
    }
  ]
  getMovies(): Movie[] {
    return this.movies;
  }

  getenvStatus(): Envs[] {
    return this.envStatus;
  }


}
