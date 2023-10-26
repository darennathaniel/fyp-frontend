import { increment } from "../reducers/counter";
import { useAppDispatch } from "./useAppDispatch";

export function useIncrement() {
  const dispatch = useAppDispatch();
  const incrementHelper = () => {
    dispatch(increment());
  };
  return incrementHelper;
}
