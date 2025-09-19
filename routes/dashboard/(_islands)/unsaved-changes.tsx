import { useEffect } from "preact/hooks";
import { useSignal } from "@preact/signals";

function UnsavedChanges() {
  const hasUnsavedChanges = useSignal(false);

  useEffect(() => {
    const form = document.getElementById("add-location-form")!;

    // Handle form input changes
    const handleInputChange = () => {
      hasUnsavedChanges.value = true;
    };

    // Handle beforeunload event
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges.value) {
        e.preventDefault();
      }
    };

    // Handle form submission
    const handleFormSubmit = () => {
      hasUnsavedChanges.value = false;
    };

    // Add event listeners
    form.addEventListener("input", handleInputChange);
    form.addEventListener("change", handleInputChange);
    form.addEventListener("submit", handleFormSubmit);
    globalThis.addEventListener("beforeunload", handleBeforeUnload);

    // Cleanup
    return () => {
      form.removeEventListener("input", handleInputChange);
      form.removeEventListener("change", handleInputChange);
      form.removeEventListener("submit", handleFormSubmit);
      globalThis.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const links = document.querySelectorAll("a");
    const cancelLocationButton = document.getElementById(
      "cancel-location-button",
    )!;

    const items = [...links, cancelLocationButton];

    items.forEach((item) => {
      if (hasUnsavedChanges.value) {
        item.setAttribute("f-client-nav", "false");
      } else {
        item.setAttribute("f-client-nav", "true");
      }
    });
  }, [hasUnsavedChanges.value]);

  return null;
}

export default UnsavedChanges;
