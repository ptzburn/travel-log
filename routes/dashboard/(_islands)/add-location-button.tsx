import { TbCirclePlusFilled } from "@preact-icons/tb";
import { isLoading } from "@/utils.ts";
import { useEffect } from "preact/hooks";

function AddLocationButton() {
  useEffect(() => {
    const form = document.getElementById("add-location-form")!;

    const handleSubmit = () => {
      isLoading.value = true;
    };

    form.addEventListener("submit", handleSubmit);

    return () => {
      form.removeEventListener("submit", handleSubmit);
    };
  }, []);

  return (
    <button
      type="submit"
      class="btn btn-primary"
      disabled={isLoading}
    >
      Add
      {isLoading.value
        ? <span class="loading loading-spinner loading-sm" />
        : <TbCirclePlusFilled size={24} />}
    </button>
  );
}

export default AddLocationButton;
