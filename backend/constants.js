
import { SERVER_PORT } from "./settings.js";

export const IS_AUTH={
    TOKEN_NOT_FOUND:'token is not found',
    CATCH_ERROR:'isAuth error',
}
export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  OK: 200
};

export const ERROR_MESSAGES = {
  NO_TOKEN_PROVIDED: "No token provided",
  TOKEN_NOT_FOUND: 'token is not found',
  INVALID_GOOGLE_TOKEN: "Invalid Google token",
  USER_UPDATE_FAILED: "User update failed",
  USER_CREATION_FAILED: "User creation failed",
  LOGIN_FAILED: "Login failed",
  USER_NOT_FOUND: "User not found",
  INVALID_TOKEN: "Invalid token",
  USER_NOT_FOUND:'User Not Found',
  CURRENT_USER_ERROR:'CURRENT USER ERROR',
};

export const DB = {
    'DB_CONNECTED_MESSAGE': `🌼  DATABASE IS CONNECTED  🌼`,
    'DB_CONNECTION_ERROR_MESSAGE':`🥶  DATABASE IS NOT CONNECTED  🥶 `
}

export const SERVER_START_MESSAGE = `
☕ Starting your shift...
  
   _____________________________
  |  _________________________  |
  | |                         | |
  | |   [ SERVER IS LIVE ]    | |
  | |      PORT:  ${SERVER_PORT}        | |
  | |_________________________| |
  |            ___              |
  |___________|___|_____________|
     |                       |
     |          [ ]          |
  _______________________________
  
  🖥️  MONITOR:  http://localhost:${SERVER_PORT}
  ⌨️  TYPING:   Middleware initialized...
  ✨  VIBE:     Productive`;