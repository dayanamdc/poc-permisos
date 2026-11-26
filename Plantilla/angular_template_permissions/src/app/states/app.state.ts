import {
  RouterReducerState,
  SerializedRouterStateSnapshot,
} from "@ngrx/router-store";

export interface AppState {
  router: RouterReducerState<SerializedRouterStateSnapshot>;
}
