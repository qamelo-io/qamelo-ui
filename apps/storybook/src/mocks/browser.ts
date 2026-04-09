import { setupWorker } from "msw/browser";
import {
  authHandlers,
  userHandlers,
  packageHandlers,
  monitoringHandlers,
} from "./handlers";

export const worker = setupWorker(
  ...authHandlers,
  ...userHandlers,
  ...packageHandlers,
  ...monitoringHandlers,
);
