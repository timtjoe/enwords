import { createGenerator } from "./generator";
export type { Size } from "./tokens";

// Instantiate the closure once inside the package
export const enword = createGenerator();

// Support both: import enword from "enword" AND import { enword } from "enword"
export default enword;
