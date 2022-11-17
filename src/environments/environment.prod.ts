/* eslint-disable prettier/prettier */
export const environment = {
  production: true,
  dbUrl: "%dbUrl%",
  port:   3308,
  dbUsername:"%dbUsername%",
  dbPassword: "%dbPassword%",
  dbName: "%dbName%",
  synchronize: "%synchronize%",
  sapUrl: "%sapUrl%",
  sapApiToken:"%sapApiToken%",
  baseUrl: "",
  project: "Build %stage%:%timestamp%",
  release: "%release%",
};
