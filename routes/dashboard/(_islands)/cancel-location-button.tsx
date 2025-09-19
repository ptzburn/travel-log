import { TbArrowLeft } from "@preact-icons/tb";
import { isLoading } from "@/utils.ts";

function CancelLocationButton() {
  return (
    <button
      id="cancel-location-button"
      disabled={isLoading}
      type="button"
      class="btn btn-outline"
      onClick={() => {
        globalThis.history.back();
      }}
    >
      <TbArrowLeft size={24} />
      Cancel
    </button>
  );
}

export default CancelLocationButton;
