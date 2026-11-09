import { SpaceCanvas } from "./SpaceCanvas";

/**
 * The room the page sits in (DESIGN.md §2). The CSS layers are the still version: what shows before the shader
 * starts, without WebGL and without JavaScript. The shader canvas fades in over them once the page has loaded.
 */
export function DigitalEnvironment() {
  return (
    <div className="env" aria-hidden="true">
      <div className="env-wall" />
      <div className="env-floor" />
      <SpaceCanvas />
    </div>
  );
}
