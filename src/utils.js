export function getChunks(array = [], size = 0) {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
}

const REPLACE_NAME_STRING = `[[NAME]+]`;
const nameRegexp = new RegExp(REPLACE_NAME_STRING, "g");

export const swapName = (str, name = "") => {
  if (name) {
    return str.replace(nameRegexp, name);
  }

  // console.error("No name passed: ", str);

  return str;
};

// scroll to the top of the content (used on change of url and button clicks before route changes
// - (gets rid of janky animation when route changes, user is at the bottom of the page and the page reduces in size, forcing the user up)
export const scrollToTop = () => {
  const container = document.getElementsByTagName("html");

  if (container[0] && container[0].clientWidth <= 647) {
    container[0].scrollTo({ top: 0, behavior: "smooth" });
  }
};

export function createPopupImage(img, width = 200, height = 200, alt = "") {
  return `<div class="popup-img-container">
    <img src=${img} alt=${alt} width=${width} height=${height} />
    <button aria-label="Open image popup" class="popup-image-btn">
      <img src="./expand-icon.png" alt="" />
    </button>
  </div>`;
}