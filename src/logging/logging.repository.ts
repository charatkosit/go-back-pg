/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LoggingRepository {
  private readonly logger: Logger = new Logger('LoggingRepository');

  logInfo(message: string) {
    this.logger.log(message);
  }

  logError(error: Error, context?: string) {
    this.logger.error(error.message, error.stack, context);
  }

  logWarning(message: string, context?: string) {
    this.logger.warn(message, context);
  }

  logDebug(message: string, context?: string) {
    this.logger.debug(message, context);
  }
}